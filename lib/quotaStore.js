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

function getNextUtcMidnight() {
  const now = new Date()
  return Math.floor(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1) / 1000)
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
    reset: '00:00 UTC',
  }
}

export async function incrementQuota(email, tool) {
  const today = getTodayStr()
  const key = `quota:${email}:${tool}:${today}`
  await redis.incr(key)
  // The quota key uses the UTC calendar date, so expiry must use the same reset boundary.
  await redis.expireat(key, getNextUtcMidnight())
  return getQuota(email, tool)
}
