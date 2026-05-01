import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const FILE = path.join(process.cwd(), 'data', 'concurrent.json')
const MAX_CONCURRENT = 5
const TIMEOUT_MS = 3 * 60 * 1000

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

function cleanupExpired(slots) {
  const now = Date.now()
  return slots.filter(s => (now - new Date(s.startedAt).getTime()) < TIMEOUT_MS)
}

function tryAcquire(tool) {
  const data = readData()
  if (!data[tool]) data[tool] = []
  data[tool] = cleanupExpired(data[tool])

  if (data[tool].length >= MAX_CONCURRENT) {
    writeData(data)
    return { allowed: false, id: null, active: data[tool].length }
  }

  const id = crypto.randomUUID()
  data[tool].push({ id, startedAt: new Date().toISOString() })
  writeData(data)
  return { allowed: true, id, active: data[tool].length }
}

function release(tool, id) {
  try {
    const data = readData()
    if (!data[tool]) return
    data[tool] = data[tool].filter(s => s.id !== id)
    writeData(data)
  } catch {}
}

function getActive(tool) {
  const data = readData()
  if (!data[tool]) return 0
  const cleaned = cleanupExpired(data[tool])
  if (cleaned.length !== data[tool].length) {
    data[tool] = cleaned
    writeData(data)
  }
  return cleaned.length
}

export { tryAcquire, release, getActive, MAX_CONCURRENT }
