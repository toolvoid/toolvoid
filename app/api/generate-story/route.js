import { NextResponse } from 'next/server'
import { auth } from '../../../auth'
import { getQuota, incrementQuota } from '../../../lib/quotaStore'
import { tryAcquire, release } from '../../../lib/concurrentStore'
import { getNextGeminiKey, getNextGroqKey, GEMINI_KEYS, GROQ_KEYS } from '../../../lib/storyKeys'
import { checkRPM } from '../../../lib/rpmLimiter'

const TOOL = 'story-generator'

const PACE_WORDS_PER_SECOND = { slow: 2.0, normal: 2.5, fast: 3.5 }
const VALID_DURATIONS = [15, 30, 45, 60, 300, 600]

const SYSTEM_PROMPT = `You are a professional scriptwriter and video narrator.
Write engaging, cinematic video scripts structured as timed segments.
Each segment must include narration text and a visual direction for the video.

IMPORTANT: Return ONLY a valid JSON array of segment objects. No markdown fences, no explanation, no title line.
Each segment object must have these exact fields:
- "start_time": number (seconds from start)
- "end_time": number (seconds from start)
- "narration": string (spoken words for this segment)
- "visual": string (visual description for this segment)

Example format:
[{"start_time":0,"end_time":5,"narration":"Welcome everyone.","visual":"Wide shot of a futuristic city skyline at dawn"}]

Make sure timestamps are sequential and cover the full duration without gaps.`

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

/**
 * Attempts to parse a JSON array of segments from a model response.
 * Strips markdown fences, then tries JSON.parse.
 * On failure, returns null (caller should retry with stricter instruction).
 */
function safeParseSegments(text) {
  if (!text || !text.trim()) return null

  let cleaned = text.trim()

  // Strip markdown fences if present
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim()
  }

  const validateSegments = (segments) => {
    if (!Array.isArray(segments) || segments.length === 0) return null

    const isValid = segments.every((segment) => (
      Number.isFinite(segment?.start_time) &&
      Number.isFinite(segment?.end_time) &&
      segment.end_time > segment.start_time &&
      typeof segment.narration === 'string' &&
      segment.narration.trim().length > 0 &&
      typeof segment.visual === 'string'
    ))

    return isValid ? segments : null
  }

  // Try direct parse
  try {
    const parsed = JSON.parse(cleaned)
    const segments = validateSegments(parsed)
    if (segments) return segments
  } catch {
    // will retry below
  }

  // Try to find a JSON array in the text with bracket-boundary heuristic
  const arrayMatch = cleaned.match(/\[\s*\{[\s\S]*\}\s*\]/)
  if (arrayMatch) {
    try {
      const parsed = JSON.parse(arrayMatch[0])
      const segments = validateSegments(parsed)
      if (segments) return segments
    } catch {}
  }

  return null
}

function parseDurationSeconds(duration) {
  if (duration === undefined || duration === null || duration === '') return null

  const durationSec = Number.parseInt(duration, 10)
  if (!Number.isInteger(durationSec) || String(durationSec) !== String(duration).trim() || !VALID_DURATIONS.includes(durationSec)) {
    return null
  }

  return durationSec
}

/**
 * Builds the user prompt for script generation by incorporating
 * duration, pace, topic, custom instructions, and all existing fields.
 */
function buildScriptPrompt(body) {
  const {
    prompt: existingPrompt,
    duration,
    pace,
    topic,
    customTitle,
    customInstructions,
    genre,
    mood,
    tone,
    charName,
    charAge,
    charGender,
    charRole,
    traits,
    period,
    place,
    world,
    conflict,
    twist,
    starter,
    language,
    pov,
  } = body

  const wps = PACE_WORDS_PER_SECOND[pace] || 2.5
  const durationSec = duration
  const targetWords = Math.round(durationSec * wps)
  const clean = (value) => typeof value === 'string' ? value.trim() : value

  const parts = []

  // Use existing prompt as base if provided, otherwise build from fields
  if (existingPrompt && !duration) {
    // Legacy-style prompt — just use as-is but append duration constraint
    parts.push(existingPrompt)
  } else {
    // Script-specific prompt construction
    const genreLabel = genre || 'General'
    parts.push(`Genre: ${genreLabel}.`)
    if (clean(topic)) parts.push(`Core topic: ${clean(topic)}.`)
    if (clean(customTitle)) parts.push(`Preferred title: ${clean(customTitle)}.`)
    if (clean(tone)) parts.push(`Tone: ${clean(tone)}.`)
    if (clean(mood)) parts.push(`Mood: ${clean(mood)}.`)

    const characterParts = [
      clean(charName),
      clean(charAge) && `${clean(charAge)} years old`,
      clean(charGender),
      clean(charRole),
    ].filter(Boolean)
    if (characterParts.length || (Array.isArray(traits) && traits.length)) {
      const traitLine = Array.isArray(traits) && traits.length ? `. Personality: ${traits.filter(Boolean).join(', ')}` : ''
      parts.push(`Character: ${characterParts.join(', ')}${traitLine}.`)
    }

    const settingParts = [
      clean(period),
      clean(place),
      clean(world) && `${clean(world)} world`,
    ].filter(Boolean)
    if (settingParts.length) parts.push(`Setting: ${settingParts.join(', ')}.`)

    if (clean(conflict)) parts.push(`Conflict: ${clean(conflict)}.`)
    if (clean(twist)) parts.push(`Plot twist: ${clean(twist)}.`)
    if (clean(starter)) parts.push(`Opening hook: "${clean(starter)}"`)
    if (language && language !== 'english') parts.push(`Language: ${language}.`)
    if (pov) parts.push(`Narrative POV: ${pov}.`)
  }

  // Duration and pace constraints
  parts.push(``)
  parts.push(`SCRIPT CONSTRAINTS:`)
  parts.push(`- Duration: ${durationSec} seconds`)
  parts.push(`- Target word count: ~${targetWords} words`)
  parts.push(`- Pace: ${pace || 'normal'} (${wps} words/second)`)
  parts.push(`- Start with a strong opening hook that grabs attention.`)
  parts.push(`- Match genre-appropriate tone throughout.`)

  // Custom instructions (override if conflict)
  if (customInstructions && customInstructions.trim()) {
    parts.push(``)
    parts.push(`USER'S CUSTOM INSTRUCTIONS (these override genre/mood defaults if they conflict):`)
    parts.push(customInstructions.trim())
  }

  return parts.join('\n')
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
    if (!prompt?.trim() && !body?.genre && !body?.topic) return NextResponse.json({ error: 'Prompt or topic is required' }, { status: 400 })

    const durationSec = parseDurationSeconds(body?.duration)
    if (!durationSec) {
      return NextResponse.json({ error: 'Duration must be one of: 15, 30, 45, 60, 300, 600 seconds' }, { status: 400 })
    }
    body.duration = durationSec

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

    // Build the script-specific prompt
    const scriptPrompt = buildScriptPrompt(body)

    const errors = []
    for (let i = 0; i < GEMINI_KEYS.length; i++) {
      const key = getNextGeminiKey()
      if (!key) break
      try {
        const result = await callGemini(key, scriptPrompt, length)
        if (!result.text.trim()) throw new Error('Empty response from Gemini')

        // Try to parse segments
        let segments = safeParseSegments(result.text.trim())

        // If first parse failed, retry with strict JSON instruction
        if (!segments) {
          const retryPrompt = `${scriptPrompt}\n\nIMPORTANT: Return ONLY valid JSON. No markdown fences, no code blocks, no extra text. Start with [ and end with ].`
          const retryResult = await callGemini(key, retryPrompt, length)
          if (retryResult.text.trim()) {
            segments = safeParseSegments(retryResult.text.trim())
          }
        }

        if (!segments) throw new Error('Failed to parse segments from Gemini response')

        const title = body?.customTitle?.trim() || (body?.topic || body?.genre || 'Script').replace(/^./, c => c.toUpperCase()) + ' Script'
        return NextResponse.json({ segments, title, model: result.model, quota: await incrementQuota(email, TOOL) })
      } catch (err) { errors.push(err.message) }
    }

    for (let i = 0; i < GROQ_KEYS.length; i++) {
      const key = getNextGroqKey()
      if (!key) break
      try {
        const result = await callGroq(key, scriptPrompt, length)
        if (!result.text.trim()) throw new Error('Empty response from Groq')

        let segments = safeParseSegments(result.text.trim())

        if (!segments) {
          const retryPrompt = `${scriptPrompt}\n\nIMPORTANT: Return ONLY valid JSON. No markdown fences, no code blocks, no extra text. Start with [ and end with ].`
          const retryResult = await callGroq(key, retryPrompt, length)
          if (retryResult.text.trim()) {
            segments = safeParseSegments(retryResult.text.trim())
          }
        }

        if (!segments) throw new Error('Failed to parse segments from Groq response')

        const title = body?.customTitle?.trim() || (body?.topic || body?.genre || 'Script').replace(/^./, c => c.toUpperCase()) + ' Script'
        return NextResponse.json({ segments, title, model: result.model, quota: await incrementQuota(email, TOOL) })
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
