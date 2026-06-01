const fs   = require('fs')
const path = require('path')
const { app } = require('electron')
const { encrypt, decrypt } = require('./encryptionHelper')
const { buildTokenWarningPromptBlock } = require('./tokenWarning')

const STORAGE_DIR = path.join(app.getPath('userData'), 'storage', 'capsules')
const CAPSULES_DIR = STORAGE_DIR
if (!fs.existsSync(CAPSULES_DIR)) fs.mkdirSync(CAPSULES_DIR, { recursive: true })

function generateId() {
  return 'cap_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7)
}

function createCapsule(data) {
  const id = generateId()
  const completed = data.progress?.completed || data.completed || []
  const current = data.progress?.current || data.current || ''
  const nextSteps = data.progress?.next_steps || data.next_steps || []
  const keyDecisions = data.key_decisions || []
  const importantContext = data.important_context || ''
  const continuationContext = data.summary || ''
  const tokenWarningPromptBlock = buildTokenWarningPromptBlock(data.raw_text || '')
  const capsule = {
    capsule_id:        id,
    version:           '1.0',
    created_at:        new Date().toISOString(),
    updated_at:        new Date().toISOString(),
    source_ai:         data.source_ai || 'Unknown',
    source_url:        data.source_url || '',
    title:             data.title || 'Untitled Capsule',
    summary:           continuationContext,
    progress: {
      completed,
      current,
      next_steps:  nextSteps
    },
    key_decisions:     keyDecisions,
    important_context: importantContext,
    tags:              data.tags              || [],
    raw_text:          data.raw_text          || '',
    summary_error:     data.summary_error     || '',
    transfer_prompt:   `Continue from where I left off:

Topic: ${data.title || 'Untitled Capsule'}

Continuation context:
${continuationContext}

Completed so far:
${completed.length ? completed.map(item => `- ${item}`).join('\n') : '- Not extracted'}

Current stopping point:
${current || 'Not extracted'}

Remaining / next steps:
${nextSteps.length ? nextSteps.map(item => `- ${item}`).join('\n') : '- Continue from the latest unresolved point'}

Key decisions:
${keyDecisions.length ? keyDecisions.map(item => `- ${item}`).join('\n') : '- None extracted'}

Important context:
${importantContext || 'None extracted'}

Please continue.

${tokenWarningPromptBlock}`
  }
  fs.writeFileSync(path.join(CAPSULES_DIR, `${id}.json`), encrypt(JSON.stringify(capsule)))
  return capsule
}

function getAllCapsules() {
  return fs.readdirSync(CAPSULES_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(decrypt(fs.readFileSync(path.join(CAPSULES_DIR, f), 'utf-8'))))
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
}

function getCapsule(id) {
  const fp = path.join(CAPSULES_DIR, `${id}.json`)
  if (!fs.existsSync(fp)) return null
  return JSON.parse(decrypt(fs.readFileSync(fp, 'utf-8')))
}

function deleteCapsule(id) {
  const fp = path.join(CAPSULES_DIR, `${id}.json`)
  if (fs.existsSync(fp)) fs.unlinkSync(fp)
  return { success: true }
}

function updateCapsule(id, updates) {
  const capsule = getCapsule(id)
  if (!capsule) return null
  const updated = { ...capsule, ...updates, updated_at: new Date().toISOString() }
  fs.writeFileSync(path.join(CAPSULES_DIR, `${id}.json`), encrypt(JSON.stringify(updated)))
  return updated
}

module.exports = { createCapsule, getAllCapsules, getCapsule, deleteCapsule, updateCapsule }
