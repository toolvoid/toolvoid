import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export const LIMITS = {
  'story-generator': 3,
  'hashtag-generator': 10,
  'keyword-generator': 10,
  'image-generator': 6,
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10)
}

export async function getQuota(email, tool) {
  const today = getTodayStr()
  const key = `quota:${email}:${tool}:${today}`
  const count = await redis.get(key)
  const used = parseInt(count || 0)
  return {
    used,
    remaining: Math.max(0, LIMITS[tool] - used),
    limit: LIMITS[tool],
    reset: 'midnight tonight',
  }
}

export async function incrementQuota(email, tool) {
  const today = getTodayStr()
  const key = `quota:${email}:${tool}:${today}`
  await redis.incr(key)
  // Expire at end of day
  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)
  await redis.expireat(key, Math.floor(endOfDay.getTime() / 1000))
  return getQuota(email, tool)
}