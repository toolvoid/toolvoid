import { NextResponse } from 'next/server';
import { auth } from '../../../auth';
import { getQuota, incrementQuota } from '../../../lib/quotaStore';
import { tryAcquire, release } from '../../../lib/concurrentStore';

/* ─── Concurrent Image Generation Limit ─────────────────────────────── */
let activeImageGens = 0;
const MAX_CONCURRENT_IMAGES = 5;

/* ─── Usage Tracking ─────────────────────────────────────────────────── */
let usage = {
  flash: 0, lite: 0, groq1: 0, groq2: 0,
  emergency_slots: 0,
  date: new Date().toDateString(),
};

const LIMITS = {
  flash: 250, lite: 1000, groq1: 1000, groq2: 1000,
};
const THRESHOLD = 0.9;

function resetIfNewDay() {
  const today = new Date().toDateString();
  if (usage.date !== today) {
    usage = { flash: 0, lite: 0, groq1: 0, groq2: 0, emergency_slots: 0, date: today };
  }
}

/* ─── HF Key Rotation ────────────────────────────────────────────────── */
const HF_KEYS = [
  process.env.HF_API_KEY,
  process.env.HF_API_KEY_1,
  process.env.HF_API_KEY_2,
  process.env.HF_API_KEY_3,
  process.env.HF_API_KEY_4,
  process.env.HF_API_KEY_5,
  process.env.HF_API_KEY_6,
  process.env.HF_API_KEY_7,
  process.env.HF_API_KEY_8,
].filter(key => typeof key === 'string' && key.startsWith('hf_') && key !== 'hf_xxx');

let hfKeyIndex = 0;
function getNextHFKey() {
  if (!HF_KEYS.length) return null;
  const key = HF_KEYS[hfKeyIndex % HF_KEYS.length];
  hfKeyIndex++;
  return key;
}

const GEMINI_IMAGE_KEYS = [
  process.env.GEMINI_IMAGE_KEY_1,
  process.env.GEMINI_IMAGE_KEY_2,
].filter(Boolean);

let geminiImageKeyIndex = 0;
function getNextGeminiImageKey() {
  if (!GEMINI_IMAGE_KEYS.length) return null;
  const key = GEMINI_IMAGE_KEYS[geminiImageKeyIndex % GEMINI_IMAGE_KEYS.length];
  geminiImageKeyIndex++;
  return key;
}

/* ─── Text Key Selector ──────────────────────────────────────────────── */
function getActiveKey(isPremium) {
  resetIfNewDay();
  if (isPremium) {
    if (usage.emergency_slots >= 20) return { error: 'Emergency slots full' };
    usage.emergency_slots++;
    const key = process.env.EMERGENCY_FLASH_KEY || process.env.EMERGENCY_LITE_KEY;
    if (!key) return { error: 'Emergency keys not configured' };
    return { type: 'emergency', key, isGemini: true, model: 'gemini-2.5-flash' };
  }
  if (usage.flash < LIMITS.flash * THRESHOLD && process.env.GEMINI_FLASH_KEY)
    return { type: 'flash', key: process.env.GEMINI_FLASH_KEY, isGemini: true, model: 'gemini-2.5-flash' };
  if (usage.lite < LIMITS.lite * THRESHOLD && process.env.GEMINI_LITE_KEY)
    return { type: 'lite', key: process.env.GEMINI_LITE_KEY, isGemini: true, model: 'gemini-2.5-flash-lite' };
  if (usage.groq1 < LIMITS.groq1 * THRESHOLD && process.env.GROQ_KEY_STORY_1)
    return { type: 'groq1', key: process.env.GROQ_KEY_STORY_1, isGemini: false, model: 'llama-3.3-70b-versatile' };
  if (usage.groq2 < LIMITS.groq2 * THRESHOLD && process.env.GROQ_KEY_STORY_2)
    return { type: 'groq2', key: process.env.GROQ_KEY_STORY_2, isGemini: false, model: 'llama-3.3-70b-versatile' };
  return { error: 'All API limits reached for today' };
}

/* ─── Text API Callers ───────────────────────────────────────────────── */
async function callGemini(key, model, systemPrompt, userPrompt, maxTokens) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(30000),
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
      generationConfig: { temperature: 0.9, maxOutputTokens: maxTokens, topP: 0.95 },
    }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini error: ${response.status}`);
  }
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callGroq(key, model, systemPrompt, userPrompt, maxTokens) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(30000),
    body: JSON.stringify({
      model, temperature: 0.9, max_tokens: maxTokens,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Groq error: ${response.status}`);
  }
  const data = await response.json();
  return data?.choices?.[0]?.message?.content || '';
}

/* ─── Sleep helper ───────────────────────────────────────────────────── */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* ─── Pollinations Image (Primary - Free, No Key) ────────────────────── */
async function callPollinationsImage(prompt, ratio = '1:1') {
  const dimensions = {
    '1:1':  { width: 1024, height: 1024 },
    '16:9': { width: 1280, height: 720  },
    '9:16': { width: 720,  height: 1280 },
    '4:3':  { width: 1024, height: 768  },
  };
  const { width, height } = dimensions[ratio] || dimensions['1:1'];
  const encodedPrompt = encodeURIComponent(prompt);
  let lastError = 'Pollinations failed';

  for (let attempt = 1; attempt <= 3; attempt++) {
    const seed = Math.floor(Math.random() * 1_000_000_000);
    const url  = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true&enhance=true&seed=${seed}`;

    console.debug(`[Pollinations] generating image... attempt=${attempt}`);

    try {
      const response = await fetch(url, {
        headers: {
          'Accept':     'image/*',
          'User-Agent': 'toolsite-imagegen/1.0',
        },
        signal: AbortSignal.timeout(60000),
        cache:  'no-store',
      });

      // 429: wait and retry
      if (response.status === 429) {
        if (attempt < 3) {
          const delay = attempt * 2000 + Math.random() * 1000; // 2s → 4s
          console.log(`[Pollinations] 429 rate-limited — retrying in ${Math.round(delay)}ms`);
          await sleep(delay);
          continue;
        }
        lastError = 'Pollinations rate limit reached, please try again in a moment';
        break;
      }

      if (!response.ok) {
        lastError = `Pollinations error: ${response.status}`;
        continue;
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.startsWith('image/')) {
        const text = await response.text().catch(() => '');
        lastError  = text
          ? `Pollinations returned non-image response: ${text.slice(0, 160)}`
          : 'Pollinations returned a non-image response';
        continue;
      }

      const blob   = await response.blob();
      const buffer = await blob.arrayBuffer();
      return { base64: Buffer.from(buffer).toString('base64'), source: 'pollinations' };

    } catch (err) {
      lastError = err?.name === 'TimeoutError'
        ? 'Pollinations request timed out'
        : (err?.message || 'Pollinations request failed');

      if (attempt < 3) await sleep(attempt * 1500);
    }
  }

  throw new Error(lastError);
}

async function callGeminiImagen(prompt, ratio = '1:1') {
  const model = process.env.GEMINI_IMAGE_MODEL || 'imagen-4.0-generate-001';
  const keyCount = GEMINI_IMAGE_KEYS.length;
  let lastError = 'Gemini image generation failed';

  for (let attempt = 0; attempt < keyCount; attempt++) {
    const key = getNextGeminiImageKey();
    if (!key) break;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': key,
        },
        signal: AbortSignal.timeout(60000),
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: ['1:1', '4:3', '16:9', '9:16'].includes(ratio) ? ratio : '1:1',
            personGeneration: 'allow_adult',
          },
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        lastError = err?.error?.message || `Gemini Imagen error: ${response.status}`;
        continue;
      }

      const data = await response.json();
      const base64 =
        data?.predictions?.[0]?.bytesBase64Encoded ||
        data?.predictions?.[0]?.image?.bytesBase64Encoded ||
        data?.generatedImages?.[0]?.image?.imageBytes;

      if (!base64) {
        lastError = 'Gemini Imagen returned an empty image';
        continue;
      }

      return { base64, source: model };
    } catch (err) {
      lastError = err?.name === 'TimeoutError'
        ? 'Gemini Imagen request timed out'
        : (err?.message || 'Gemini Imagen request failed');
    }
  }

  throw new Error(lastError);
}

/* ─── Main Image Generator ───────────────────────────────────────────── */
async function generateImage(prompt, ratio) {
  try {
    return await callPollinationsImage(prompt, ratio);
  } catch (pollinationsError) {
    console.warn('[Image Gen] Pollinations failed, trying Gemini Imagen fallback:', pollinationsError.message);
    if (!GEMINI_IMAGE_KEYS.length) throw pollinationsError;
    return await callGeminiImagen(prompt, ratio);
  }
}

/* ─── Helpers ────────────────────────────────────────────────────────── */
function extractTitle(story, genre) {
  const lines = story.split('\n').filter(l => l.trim());
  const firstLine = lines[0]?.trim();
  if (firstLine && firstLine.length < 80 && !firstLine.endsWith('.') && firstLine.split(' ').length < 10) {
    return { title: firstLine, story: lines.slice(1).join('\n').trim() };
  }
  return { title: `A ${genre || 'Short'} Story`, story };
}

const SYSTEM_PROMPT = `You are a professional creative writer and master storyteller. 
Write engaging, cinematic stories with vivid descriptions, compelling characters, and captivating plots.
Always fully complete the story — never cut off mid-sentence or leave it unfinished.
Start with a creative title on the first line (no "Title:" prefix), then a blank line, then the story.
Make every word count. Use sensory details. Show don't tell. Create emotional resonance.
If asked to write in Hindi or Hinglish, write naturally in that language using Devanagari or Roman script accordingly.`;

/* ─── Route Handler ──────────────────────────────────────────────────── */
export async function POST(request) {
  let slotId = null;
  let slotTool = null;
  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: 'Invalid request body' }, { status: 400 }); }

  const { prompt, length } = body;
  const isEnhance = Boolean(body.enhanceOnly);

  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ error: 'Sign in with Google to use this tool', requiresAuth: true }, { status: 401 });
  }

  const isImageGen = Boolean(body.style || body.ratio || body.mood || body.negPrompt || body.variation || isEnhance);
  const tool = isImageGen ? 'image-generator' : 'story-generator';

  if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });

  // ── Enhance prompt ────────────────────────────────────────────────────
  if (isEnhance) {
    const enhancementPrompt = `Rewrite the following description into a more vivid, detailed image generation prompt. Keep the same concept and style, make it easier for an AI image model to imagine, and do not add anything unrelated.\n\nDescription: ${prompt}`;
    const keyInfo = getActiveKey(false);
    if (keyInfo.error) return NextResponse.json({ error: keyInfo.error }, { status: 429 });
    try {
      const enhanced = keyInfo.isGemini
        ? await callGemini(keyInfo.key, keyInfo.model, SYSTEM_PROMPT, enhancementPrompt, 200)
        : await callGroq(keyInfo.key, keyInfo.model, SYSTEM_PROMPT, enhancementPrompt, 200);
      return NextResponse.json({ enhanced: enhanced.trim() });
    } catch (err) {
      return NextResponse.json({ error: err.message || 'Prompt enhancement failed' }, { status: 500 });
    }
  }

  // ── Quota check ───────────────────────────────────────────────────────
  let quotaStatus = null;
  if (isImageGen) {
    quotaStatus = getQuota(email, tool);
    if (quotaStatus.remaining <= 0) {
      return NextResponse.json({ error: 'rate_limit', quota: quotaStatus, remaining: 0, reset: quotaStatus.reset }, { status: 429 });
    }
  }

  const maxTokens = { short: 600, medium: 1200, long: 2000 }[length] || 1200;

  try {
    // ── Image Generation ───────────────────────────────────────────────
    if (isImageGen) {
      const slot = tryAcquire(tool);
      if (!slot.allowed) {
        return NextResponse.json({
          error: 'Server is busy right now. Please try again in a moment.',
          code: 'SERVER_BUSY',
        }, { status: 503 });
      }
      slotId = slot.id;
      slotTool = tool;

      activeImageGens++;
      console.debug(`[Image Gen] active=${activeImageGens}/${MAX_CONCURRENT_IMAGES}`);

      try {
        const promptText = [
          prompt.trim(),
          body.style    && `Style: ${body.style}`,
          body.mood     && `Mood: ${body.mood}`,
          body.negPrompt && `Exclude: ${body.negPrompt}`,
          body.variation && body.variationSeed ? `Variation seed: ${body.variationSeed}` : undefined,
        ].filter(Boolean).join(', ');

        const { base64, source } = await generateImage(promptText, body.ratio);
        if (!base64) throw new Error('Empty image response');

        const quota = incrementQuota(email, tool);
        return NextResponse.json({
          imageBase64: base64,
          generator:   source === 'pollinations' ? 'pollinations' : 'gemini-imagen',
          model:       source,
          remaining:   quota.remaining,
          reset:       quota.reset,
          quota,
        });

      } finally {
        activeImageGens--;
        if (slotId) {
          release(slotTool, slotId);
          slotId = null;
          slotTool = null;
        }
        console.debug(`[Image Gen] released, active=${activeImageGens}`);
      }
    }

    // ── Story Generation ───────────────────────────────────────────────
    quotaStatus = getQuota(email, tool);
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
    slotTool = tool;

    const keyInfo = getActiveKey(false);
    if (keyInfo.error) return NextResponse.json({ error: keyInfo.error }, { status: 429 });

    let rawText;
    if (keyInfo.isGemini) {
      rawText = await callGemini(keyInfo.key, keyInfo.model, SYSTEM_PROMPT, prompt, maxTokens);
    } else {
      rawText = await callGroq(keyInfo.key, keyInfo.model, SYSTEM_PROMPT, prompt, maxTokens);
    }

    if (usage[keyInfo.type] !== undefined) usage[keyInfo.type]++;
    if (!rawText?.trim()) throw new Error('Empty response from AI');

    const { title, story } = extractTitle(rawText.trim(), prompt.match(/\w+ story/i)?.[0]?.replace(' story', ''));
    const quota = incrementQuota(email, tool);

    return NextResponse.json({
      story, title,
      model:     keyInfo.model,
      keyType:   keyInfo.type,
      remaining: quota.remaining,
      reset:     quota.reset,
      quota,
    });

  } catch (err) {
    console.error(`[Generate Error]:`, err.message);

    if (!isImageGen && process.env.GROQ_KEY_STORY_1) {
      try {
        const fallbackText = await callGroq(process.env.GROQ_KEY_STORY_1, 'llama-3.3-70b-versatile', SYSTEM_PROMPT, prompt, maxTokens);
        usage.groq1++;
        const { title, story } = extractTitle(fallbackText.trim(), '');
        const quota = incrementQuota(email, tool);
        return NextResponse.json({ story, title, model: 'llama-3.3-70b (fallback)', quota });
      } catch (fallbackErr) {
        console.error('[Fallback Error]', fallbackErr.message);
      }
    }

    if (err.name === 'TimeoutError') {
      return NextResponse.json({ error: 'Request timed out. Please try again.' }, { status: 504 });
    }
    return NextResponse.json({ error: err.message || 'Generation failed. Please try again.' }, { status: 500 });
  } finally {
    if (slotId && slotTool) release(slotTool, slotId);
  }
}

/* ─── GET: Dev Stats ─────────────────────────────────────────────────── */
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available' }, { status: 403 });
  }
  resetIfNewDay();
  return NextResponse.json({
    usage, limits: LIMITS, threshold: THRESHOLD,
    activeImageGens, maxConcurrent: MAX_CONCURRENT_IMAGES,
    hfKeysLoaded: HF_KEYS.length,
    keysConfigured: {
      flash: !!process.env.GEMINI_FLASH_KEY,
      lite:  !!process.env.GEMINI_LITE_KEY,
      groq1: !!process.env.GROQ_KEY_STORY_1,
      groq2: !!process.env.GROQ_KEY_STORY_2,
      hf:    HF_KEYS.length,
    },
  });
}
