import { NextResponse } from 'next/server'
import { auth } from '../../../auth'
import { getQuota, incrementQuota } from '../../../lib/quotaStore'
import { tryAcquire, release } from '../../../lib/concurrentStore'
import { getNextGeminiKey, getNextGroqKey, GEMINI_KEYS, GROQ_KEYS } from '../../../lib/storyKeys'
import { checkRPM } from '../../../lib/rpmLimiter'

const TOOL = 'story-generator'

const SYSTEM_PROMPT = `You are a professional creative writer and master storyteller.
Write engaging, cinematic stories with vivid descriptions, compelling characters, and captivating plots.
Always fully complete the story. Never cut off mid-sentence or leave it unfinished.
Start with a creative title on the first line, then a blank line, then the story.
Use sensory details, show don't tell, and create emotional resonance.`

function modelForGeminiKey(key) {
  if (key === process.env.GEMINI_LITE_KEY || key === process.env.EMERGENCY_LITE_KEY) return 'gemini-2.5-flash-lite'
  return 'gemini-2.5-flash'
}

async function callGemini(key, prompt, length) {
  const model = modelForGeminiKey(key)
  const maxTokens = { short: 600, medium: 1200, long: 2000 }[length] || 1200
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(30000),
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\n${prompt}` }] }],
      generationConfig: { temperature: 0.9, maxOutputTokens: maxTokens, topP: 0.95 },
    }),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Gemini error: ${response.status}`)
  }
  const data = await response.json()
  return { text: data?.candidates?.[0]?.content?.parts?.[0]?.text || '', model }
}

async function callGroq(key, prompt, length) {
  const model = 'llama-3.3-70b-versatile'
  const maxTokens = { short: 600, medium: 1200, long: 2000 }[length] || 1200
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(30000),
    body: JSON.stringify({
      model, temperature: 0.9, max_tokens: maxTokens,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: prompt }],
    }),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Groq error: ${response.status}`)
  }
  const data = await response.json()
  return { text: data?.choices?.[0]?.message?.content || '', model }
}

function extractTitle(story) {
  const lines = story.split('\n').filter(l => l.trim())
  const firstLine = lines[0]?.trim()
  if (firstLine && firstLine.length < 90 && !firstLine.endsWith('.') && firstLine.split(' ').length < 12) {
    return { title: firstLine.replace(/^title:\s*/i, '').trim(), story: lines.slice(1).join('\n').trim() }
  }
  return { title: 'Generated Story', story }
}

export async function POST(request) {
  let slotId = null
  try {
    const session = await auth()
    const email = session?.user?.email
    if (!email) {
      return NextResponse.json({ error: 'Sign in with Google to use this tool', requiresAuth: true }, { status: 401 })
    }

    let body
    try { body = await request.json() }
    catch { return NextResponse.json({ error: 'Invalid request body' }, { status: 400 }) }

    const prompt = body?.prompt
    const length = body?.length
    if (!prompt?.trim()) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })

    // ── RPM check ──
    const rpm = checkRPM(TOOL)
    if (!rpm.allowed) return NextResponse.json({ error: 'Too many requests, please wait a moment and try again.' }, { status: 429 })

    const currentQuota = await getQuota(email, TOOL)
    if (currentQuota.remaining <= 0) {
      return NextResponse.json({ error: 'Daily limit reached', quota: currentQuota }, { status: 429 })
    }

    const slot = tryAcquire(TOOL)
    if (!slot.allowed) {
      return NextResponse.json({ error: 'Server is busy right now. Please try again in a moment.', code: 'SERVER_BUSY' }, { status: 503 })
    }
    slotId = slot.id

    const errors = []
    for (let i = 0; i < GEMINI_KEYS.length; i++) {
      const key = getNextGeminiKey()
      if (!key) break
      try {
        const result = await callGemini(key, prompt.trim(), length)
        if (!result.text.trim()) throw new Error('Empty response from Gemini')
        const parsed = extractTitle(result.text.trim())
        return NextResponse.json({ ...parsed, model: result.model, quota: await incrementQuota(email, TOOL) })
      } catch (err) { errors.push(err.message) }
    }

    for (let i = 0; i < GROQ_KEYS.length; i++) {
      const key = getNextGroqKey()
      if (!key) break
      try {
        const result = await callGroq(key, prompt.trim(), length)
        if (!result.text.trim()) throw new Error('Empty response from Groq')
        const parsed = extractTitle(result.text.trim())
        return NextResponse.json({ ...parsed, model: result.model, quota: await incrementQuota(email, TOOL) })
      } catch (err) { errors.push(err.message) }
    }

    console.error('[generate-story] all providers failed', errors)
    return NextResponse.json({ error: 'All servers busy. Try again later.' }, { status: 500 })
  } catch (err) {
    console.error('[generate-story]', err)
    return NextResponse.json({ error: err.message || 'Generation failed' }, { status: 500 })
  } finally {
    if (slotId) release(TOOL, slotId)
  }
}