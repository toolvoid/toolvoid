import { NextResponse } from 'next/server';
import { auth } from '../../../auth';
import { getQuota, incrementQuota } from '../../../lib/quotaStore';
import { tryAcquire, release } from '../../../lib/concurrentStore';
import { checkRPM } from '../../../lib/rpmLimiter';

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
  const k1 = process.env.GEMINI_KEY_1;
  const k2 = process.env.GEMINI_KEY_2;
  if (!k1 && !k2) return null;
  if (!k1) return { key: k2, which: 2 };
  if (!k2) return { key: k1, which: 1 };
  if (keyStore.key1_count < 900) return { key: k1, which: 1 };
  if (keyStore.key2_count < 900) return { key: k2, which: 2 };
  return null;
}

function bumpKey(which) { if (which === 1) keyStore.key1_count++; else keyStore.key2_count++; }

async function callGemini(apiKey, topic, platform, category, count, attempt = 1) {
  const perGroup  = Math.floor(count / 3);
  const remainder = count - perGroup * 3;

  const prompt = `You are a social media hashtag expert.
Generate exactly ${count} hashtags for a ${platform} post about: ${topic}
Category: ${category}

Rules:
- Mix popular, medium, and niche hashtags
- Platform-specific style
- No banned or spammy hashtags
- Relevant and specific only

Return ONLY this exact JSON, nothing else:
{
  "high_volume": [${perGroup + remainder} hashtags as plain strings without # symbol],
  "medium": [${perGroup} hashtags as plain strings without # symbol],
  "niche": [${perGroup} hashtags as plain strings without # symbol]
}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1000 },
        }),
      }
    );
    clearTimeout(timer);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Gemini error ${res.status}`);
    }

    const data  = await res.json();
    const raw   = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();

    let parsed;
    try { parsed = JSON.parse(clean); } catch {
      if (attempt < 2) { await new Promise(r => setTimeout(r, 1000)); return callGemini(apiKey, topic, platform, category, count, 2); }
      throw new Error('Invalid AI response, please try again');
    }

    if (!parsed.high_volume || !parsed.medium || !parsed.niche) throw new Error('Unexpected response format from AI');

    const addHash = arr => (arr || []).map(t => t.startsWith('#') ? t : `#${t}`);
    return { high_volume: addHash(parsed.high_volume), medium: addHash(parsed.medium), niche: addHash(parsed.niche) };

  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError' && attempt < 2) { await new Promise(r => setTimeout(r, 2000)); return callGemini(apiKey, topic, platform, category, count, 2); }
    throw err;
  }
}

export async function POST(req) {
  const tool = 'hashtag-generator';
  let slotId = null;
  try {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: 'Sign in with Google to use this tool', requiresAuth: true }, { status: 401 });
    }

    const body = await req.json();
    const { topic, platform, category, count = 30 } = body;

    if (!topic?.trim()) return NextResponse.json({ error: 'Please enter a topic first' }, { status: 400 });
    if (topic.trim().length > 200) return NextResponse.json({ error: 'Topic must be under 200 characters' }, { status: 400 });

    // ── RPM check ──
    const rpm = checkRPM(tool);
    if (!rpm.allowed) return NextResponse.json({ error: 'Too many requests, please wait a moment and try again.' }, { status: 429 });

    const quotaStatus = await getQuota(email, tool);
    if (quotaStatus.remaining <= 0) {
      return NextResponse.json({ error: 'rate_limit', quota: quotaStatus, remaining: 0, reset: quotaStatus.reset }, { status: 429 });
    }

    const slot = tryAcquire(tool);
    if (!slot.allowed) {
      return NextResponse.json({ error: 'Server is busy right now. Please try again in a moment.', code: 'SERVER_BUSY' }, { status: 503 });
    }
    slotId = slot.id;

    const activeKey = getActiveKey();
    if (!activeKey) return NextResponse.json({ error: 'Service busy, try in a few minutes' }, { status: 503 });

    const hashtags = await callGemini(activeKey.key, topic.trim(), platform || 'Instagram', category || 'General', Number(count) || 30);

    bumpKey(activeKey.which);
    const quota = await incrementQuota(email, tool);

    return NextResponse.json({ success: true, hashtags, remaining: quota.remaining, reset: quota.reset, quota });

  } catch (err) {
    console.error('[generate-hashtags]', err);
    if (err.name === 'TypeError' || err.message?.includes('fetch')) return NextResponse.json({ error: 'Connection failed, please retry' }, { status: 502 });
    return NextResponse.json({ error: err.message || 'Something went wrong' }, { status: 500 });
  } finally {
    if (slotId) release(tool, slotId);
  }
}