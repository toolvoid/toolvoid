const { ipcMain } = require('electron')
const { createCapsule, getAllCapsules, getCapsule, deleteCapsule, updateCapsule } = require('./capsuleManager')
const { saveSettings, getSettings } = require('./encryptionHelper')
const { getInstalledBrowsers, launchBrowser } = require('./browserLauncher')
const { readChatFromBrowser } = require('./bridgeClient')
const { transferCapsule } = require('./transferClient')
const { summarizeWithAI } = require('./apiRouter')

let capsuleCreateInFlight = false

function setupIpcHandlers() {
  ipcMain.handle('capsule:save',    async (_, data)        => createCapsule(data))
  ipcMain.handle('capsule:getAll',  async ()               => getAllCapsules())
  ipcMain.handle('capsule:get',     async (_, id)          => getCapsule(id))
  ipcMain.handle('capsule:delete',  async (_, id)          => deleteCapsule(id))
  ipcMain.handle('capsule:update',  async (_, id, updates) => updateCapsule(id, updates))
  ipcMain.handle('settings:save',   async (_, settings)    => saveSettings(settings))
  ipcMain.handle('settings:get',    async ()               => getSettings())
  ipcMain.handle('browser:list',    async ()               => getInstalledBrowsers())
  ipcMain.handle('browser:launch',  async (_, browserPath) => launchBrowser(browserPath))
  ipcMain.handle('browser:readChat',async (_, options = {}) => {
    if (capsuleCreateInFlight) {
      return { success: false, error: 'Capsule creation already in progress' }
    }

    capsuleCreateInFlight = true
    try {
      const result = await readChatFromBrowser()
      if (!result.success) return result

      const settings = getSettings()
      const summary = settings.apiKey
        ? await summarizeWithAI(result.raw_text, settings)
        : {
            title: 'Raw Capsule',
            summary: `Continuation context could not be AI-generated because no API key is set. Use the captured chat text as the source of truth and resume from the latest visible user request.\n\n${result.raw_text.slice(0, 700)}`,
            progress: { completed: [], current: 'Review the captured chat and continue from the latest user request.', next_steps: ['Open the raw captured context if needed', 'Continue from the last unresolved request'] },
            key_decisions: [],
            important_context: result.raw_text.slice(0, 700),
            tags: []
          }

      const capsule = createCapsule({
        ...result,
        ...summary,
        title: options.title || summary.title || 'Raw Capsule',
        source_url: result.url || result.source_url || ''
      })

      return { success: true, ...capsule }
    } finally {
      capsuleCreateInFlight = false
    }
  })
  ipcMain.handle('browser:transfer',async (_, data)        => transferCapsule(data.url, data.prompt))
}

module.exports = { setupIpcHandlers }
