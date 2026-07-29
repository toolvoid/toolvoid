const axios = require('axios')

const SYSTEM_PROMPT = `You are a precise context capsule generator.
Read ONLY the provided active conversation text. Ignore any navigation, sidebar, recent-chat names, menus, or page UI text if present.

Create a continuation handoff capsule for another AI chat.
Do NOT write a generic summary. The "summary" field must be a continuation context:
- what the original goal/topic was from the start
- what work/discussion has happened so far
- where the conversation currently reached
- what remains unfinished
- exactly where the next AI should start continuing

Write it like a practical handoff note to the next AI, not like a blog summary. Do not copy raw chat chunks. Keep it specific, compact, and actionable.

Return ONLY valid JSON (no markdown) with:
{
  "title": "clear topic, 5 words max",
  "summary": "continuation context: start goal, progress so far, current point, remaining work, where to resume",
  "progress": {
    "completed": ["concrete things already completed or decided"],
    "current": "the exact current point where the conversation/work stopped",
    "next_steps": ["specific next actions"]
  },
  "key_decisions": ["important choices, constraints, or preferences"],
  "important_context": "must-know details for another AI to continue smoothly",
  "tags": ["max 5 short tags"]
}`

function rawCapsule(rawText, reason = 'No API summary was available') {
  const excerpt = rawText.slice(0, 700)
  return {
    title: 'Raw Capsule',
    summary: `Continuation context could not be AI-generated. Reason: ${reason}. Use the captured conversation text as the source of truth. Resume from the latest visible point in this chat excerpt:\n\n${excerpt}`,
    progress: { completed: [], current: 'Review the captured chat and continue from the latest user request.', next_steps: ['Open the raw captured context if needed', 'Continue from the last unresolved request'] },
    key_decisions: [],
    important_context: excerpt,
    tags: [],
    summary_error: reason
  }
}

function normalizeCapsule(data, rawText) {
  if (!data || typeof data !== 'object') return rawCapsule(rawText)
  return {
    title: String(data.title || 'Raw Capsule'),
    summary: String(data.summary || rawText.slice(0, 300)),
    progress: {
      completed: Array.isArray(data.progress?.completed) ? data.progress.completed : Array.isArray(data.completed) ? data.completed : [],
      current: String(data.progress?.current || data.current || ''),
      next_steps: Array.isArray(data.progress?.next_steps) ? data.progress.next_steps : Array.isArray(data.next_steps) ? data.next_steps : []
    },
    key_decisions: Array.isArray(data.key_decisions) ? data.key_decisions : [],
    important_context: String(data.important_context || ''),
    tags: Array.isArray(data.tags) ? data.tags : [],
    summary_error: data.summary_error || ''
  }
}

async function summarizeWithAI(rawText, settings) {
  const provider = settings.provider
  const apiKey = String(settings.apiKey || '').trim()
  if (!apiKey) return rawCapsule(rawText, 'No API key is set')

  try {
    let result
    switch (provider) {
      case 'gemini':   result = await callGemini(apiKey, rawText); break
      case 'grok':     result = await callGrok(apiKey, rawText); break
      case 'openai':   result = await callOpenAI(apiKey, rawText); break
      case 'claude':   result = await callClaude(apiKey, rawText); break
      case 'deepseek': result = await callDeepSeek(apiKey, rawText); break
      default:         result = rawCapsule(rawText)
    }
    return normalizeCapsule(result, rawText)
  } catch (err) {
    const status = err.response?.status
    const apiMessage = err.response?.data?.error?.message || err.response?.data?.message
    const reason = [provider, status, apiMessage || err.message].filter(Boolean).join(': ')
    console.error('API error:', reason)
    return rawCapsule(rawText, reason)
  }
}

function parseJSON(text, rawText) {
  const cleaned = String(text || '').replace(/```json|```/gi, '').trim()
  try { return JSON.parse(cleaned) }
  catch {
    const start = cleaned.indexOf('{')
    const end = cleaned.lastIndexOf('}')
    if (start !== -1 && end > start) {
      try { return JSON.parse(cleaned.slice(start, end + 1)) }
      catch {}
    }
    return rawCapsule(rawText, 'AI response was not valid JSON')
  }
}

async function callGemini(apiKey, text) {
  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      contents: [{ parts: [{ text: SYSTEM_PROMPT + '\n\nConversation:\n' + text }] }],
      generationConfig: { responseMimeType: 'application/json' }
    },
    { timeout: 30000 }
  )
  return parseJSON(res.data.candidates[0].content.parts[0].text, text)
}

async function callGrok(apiKey, text) {
  const res = await axios.post('https://api.x.ai/v1/chat/completions', {
    model: 'grok-3-mini',
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: text }],
    response_format: { type: 'json_object' }
  }, { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 30000 })
  return parseJSON(res.data.choices[0].message.content, text)
}

async function callOpenAI(apiKey, text) {
  const res = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: text }],
    response_format: { type: 'json_object' }
  }, { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 30000 })
  return parseJSON(res.data.choices[0].message.content, text)
}

async function callClaude(apiKey, text) {
  const res = await axios.post('https://api.anthropic.com/v1/messages', {
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: text }]
  }, { headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' }, timeout: 30000 })
  return parseJSON(res.data.content[0].text, text)
}

async function callDeepSeek(apiKey, text) {
  const res = await axios.post('https://api.deepseek.com/chat/completions', {
    model: 'deepseek-chat',
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: text }],
    response_format: { type: 'json_object' }
  }, { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 30000 })
  return parseJSON(res.data.choices[0].message.content, text)
}

module.exports = { summarizeWithAI }
