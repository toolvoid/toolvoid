const GEMINI_KEYS = [
  process.env.GEMINI_FLASH_KEY,
  process.env.GEMINI_LITE_KEY,
  process.env.GEMINI_IMAGE_KEY_1,
  process.env.GEMINI_IMAGE_KEY_2,
  process.env.EMERGENCY_FLASH_KEY,
  process.env.EMERGENCY_LITE_KEY,
].filter(Boolean)

const GROQ_KEYS = [
  process.env.GROQ_KEY_STORY_1,
  process.env.GROQ_KEY_STORY_2,
].filter(Boolean)

let geminiIndex = 0
let groqIndex = 0

function getNextGeminiKey() {
  if (!GEMINI_KEYS.length) return null
  const key = GEMINI_KEYS[geminiIndex % GEMINI_KEYS.length]
  geminiIndex++
  return key
}

function getNextGroqKey() {
  if (!GROQ_KEYS.length) return null
  const key = GROQ_KEYS[groqIndex % GROQ_KEYS.length]
  groqIndex++
  return key
}

export { getNextGeminiKey, getNextGroqKey, GEMINI_KEYS, GROQ_KEYS }
