const RPM_LIMITS = {
  'story-generator':   15,
  'hashtag-generator': 40,
  'keyword-generator': 40,
  'image-generator':   12,
}

const rpmStore = {}

export function checkRPM(tool) {
  const limit = RPM_LIMITS[tool]
  if (!limit) return { allowed: true }
  const currentMinute = new Date().toISOString().slice(0, 16)
  if (!rpmStore[tool] || rpmStore[tool].minute !== currentMinute) {
    rpmStore[tool] = { minute: currentMinute, count: 1 }
    return { allowed: true, count: 1, limit }
  }
  rpmStore[tool].count++
  if (rpmStore[tool].count > limit) {
    return { allowed: false, count: rpmStore[tool].count, limit }
  }
  return { allowed: true, count: rpmStore[tool].count, limit }
}