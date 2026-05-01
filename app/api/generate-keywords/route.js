import { NextResponse } from 'next/server';
import { auth } from '../../../auth';
import { getQuota, incrementQuota } from '../../../lib/quotaStore';
import { tryAcquire, release } from '../../../lib/concurrentStore';

// ─── Key Rotation ─────────────────────────────────────────────────────────────
function getTodayPT() {
  return new Date().toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' });
}

let keyStore = { key1_count: 0, key2_count: 0, reset_date: getTodayPT() };

function resetIfNewDay() {
  const today = getTodayPT();
  if (keyStore.reset_date !== today) keyStore = { key1_count: 0, key2_count: 0, reset_date: today };
}
function getActiveKey() {
  resetIfNewDay();
  const k1 = process.env.GROQ_KEY_KEYWORDS_1, k2 = process.env.GROQ_KEY_KEYWORDS_2;
  if (!k1 && !k2) return null;
  if (!k1) return { key: k2, which: 2 };
  if (!k2) return { key: k1, which: 1 };
  if (keyStore.key1_count < 900) return { key: k1, which: 1 };
  if (keyStore.key2_count < 900) return { key: k2, which: 2 };
  return null;
}
function bumpKey(which) { if (which === 1) keyStore.key1_count++; else keyStore.key2_count++; }

// ─── Groq API Call ────────────────────────────────────────────────────────────
async function callGroq(apiKey, topic, contentType, audience, country, seed, attempt = 1) {
  const seedPart = seed ? `Seed keyword: ${seed}` : '';

  const prompt = `You are an expert SEO keyword researcher.
Generate keywords for ${contentType} about: ${topic}
Target audience: ${audience}
Target country: ${country}
${seedPart}

Return ONLY this exact JSON, nothing else. No markdown, no explanation:
{
  "short_tail": [
    {"keyword": "example keyword", "volume": "High", "difficulty": "Easy", "intent": "Informational"}
  ],
  "long_tail": [
    {"keyword": "long tail example keyword phrase", "volume": "Medium", "difficulty": "Easy", "intent": "Commercial"}
  ],
  "lsi_keywords": [
    {"keyword": "related lsi term", "volume": "Medium", "difficulty": "Medium", "intent": "Informational"}
  ],
  "questions": [
    {"keyword": "how to example question", "volume": "Medium", "difficulty": "Easy", "intent": "Informational"}
  ],
  "related_topics": ["related niche 1", "related niche 2", "related niche 3", "related niche 4", "related niche 5"]
}

Rules:
- short_tail: exactly 5 keywords (1-2 words)
- long_tail: exactly 10 keywords (3-6 words, specific)
- lsi_keywords: exactly 10 semantically related terms
- questions: exactly 5 question-format keywords
- related_topics: exactly 5 related niche suggestions
- volume must be: High, Medium, or Low
- difficulty must be: Easy, Medium, or Hard
- intent must be: Informational, Commercial, or Transactional
- All keywords must be relevant to ${country} market`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });
    clearTimeout(timer);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Groq error ${res.status}`);
    }

    const data = await res.json();
    const raw  = data?.choices?.[0]?.message?.content || '';
    const clean = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();

    let parsed;
    try { parsed = JSON.parse(clean); }
    catch {
      if (attempt < 2) {
        await new Promise(r => setTimeout(r, 1000));
        return callGroq(apiKey, topic, contentType, audience, country, seed, 2);
      }
      throw new Error('Invalid AI response, please try again');
    }

    // Validate structure
    if (!parsed.short_tail || !parsed.long_tail || !parsed.lsi_keywords || !parsed.questions) {
      throw new Error('Unexpected response format, please try again');
    }

    return parsed;
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError' && attempt < 2) {
      await new Promise(r => setTimeout(r, 3000));
      return callGroq(apiKey, topic, contentType, audience, country, seed, 2);
    }
    throw err;
  }
}

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function POST(req) {
  const tool = 'keyword-generator';
  let slotId = null;
  try {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: 'Sign in with Google to use this tool', requiresAuth: true }, { status: 401 });
    }

    const body = await req.json();
    const { topic, contentType, audience, country, seed } = body;

    if (!topic?.trim()) return NextResponse.json({ error: 'Please enter a topic first' }, { status: 400 });
    if (topic.trim().length > 200) return NextResponse.json({ error: 'Topic must be under 200 characters' }, { status: 400 });

    const quotaStatus = getQuota(email, tool);
    if (quotaStatus.remaining <= 0) {
      return NextResponse.json({ error: 'rate_limit', quota: quotaStatus, remaining: 0, reset: quotaStatus.reset }, { status: 429 });
    }

    const slot = tryAcquire(tool);
    if (!slot.allowed) {
      return NextResponse.json({
        error: 'Server is busy right now. Please try again in a moment.',
        code: 'SERVER_BUSY',
      }, { status: 503 });
    }
    slotId = slot.id;

    const activeKey = getActiveKey();
    if (!activeKey) {
      const keysExist = process.env.GROQ_KEY_KEYWORDS_1 || process.env.GROQ_KEY_KEYWORDS_2;
      if (!keysExist) return NextResponse.json({ error: 'API key not configured — add GROQ_KEY_KEYWORDS_1 to .env.local' }, { status: 503 });
      return NextResponse.json({ error: 'Service busy, try in a few minutes' }, { status: 503 });
    }

    const keywords = await callGroq(
      activeKey.key,
      topic.trim(),
      contentType || 'Blog Post',
      audience    || 'General Public',
      country     || 'India',
      seed?.trim() || ''
    );

    bumpKey(activeKey.which);
    const quota = incrementQuota(email, tool);

    return NextResponse.json({ success: true, keywords, remaining: quota.remaining, reset: quota.reset, quota });

  } catch (err) {
    console.error('[generate-keywords]', err);
    if (err.name === 'TypeError' || err.message?.includes('fetch')) {
      return NextResponse.json({ error: 'Connection failed, please retry' }, { status: 502 });
    }
    return NextResponse.json({ error: err.message || 'Something went wrong' }, { status: 500 });
  } finally {
    if (slotId) release(tool, slotId);
  }
}
