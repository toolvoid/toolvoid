const RPM_LIMITS = {
  'story-generator':   15,
  'hashtag-generator': 40,
  'keyword-generator': 40,
  'image-generator':   12,
  'site-maker-form':   10,
}

const rpmStore = {}

export function checkRPM(tool, identifier) {
  const limit = RPM_LIMITS[tool]
  if (!limit) return { allowed: true }
  const key = identifier ? `${tool}:${identifier}` : tool
  const currentMinute = new Date().toISOString().slice(0, 16)
  for (const [storeKey, bucket] of Object.entries(rpmStore)) {
    if (bucket.minute !== currentMinute) delete rpmStore[storeKey]
  }
  if (!rpmStore[key] || rpmStore[key].minute !== currentMinute) {
    rpmStore[key] = { minute: currentMinute, count: 1 }
    return { allowed: true, count: 1, limit }
  }
  rpmStore[key].count++
  if (rpmStore[key].count > limit) {
    return { allowed: false, count: rpmStore[key].count, limit }
  }
  return { allowed: true, count: rpmStore[key].count, limit }
}
