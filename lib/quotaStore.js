import fs from 'fs'
import path from 'path'

const FILE = path.join(process.cwd(), 'data', 'quota.json')

const LIMITS = {
  'story-generator': 3,
  'hashtag-generator': 10,
  'keyword-generator': 10,
  'image-generator': 6,
}

function readData() {
  try {
    if (!fs.existsSync(FILE)) {
      fs.mkdirSync(path.dirname(FILE), { recursive: true })
      fs.writeFileSync(FILE, '{}')
      return {}
    }
    const raw = fs.readFileSync(FILE, 'utf8')
    if (!raw || raw.trim() === '') return {}
    return JSON.parse(raw)
  } catch {
    try { fs.writeFileSync(FILE, '{}') } catch {}
    return {}
  }
}

function writeData(data) {
  try {
    fs.mkdirSync(path.dirname(FILE), { recursive: true })
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2))
    return true
  } catch { return false }
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10)
}

function getQuota(email, tool) {
  const data = readData()
  const today = getTodayStr()
  const entry = data[email]?.[tool]
  if (!entry || entry.date !== today) {
    return { used: 0, remaining: LIMITS[tool], limit: LIMITS[tool] }
  }
  const used = entry.count
  const remaining = Math.max(0, LIMITS[tool] - used)
  return { used, remaining, limit: LIMITS[tool] }
}

function incrementQuota(email, tool) {
  const data = readData()
  const today = getTodayStr()
  if (!data[email]) data[email] = {}
  if (!data[email][tool] || data[email][tool].date !== today) {
    data[email][tool] = { count: 1, date: today }
  } else {
    data[email][tool].count += 1
  }
  writeData(data)
  return getQuota(email, tool)
}

export { readData, writeData, getQuota, incrementQuota, LIMITS }
