const fs = require('fs')
const path = require('path')
const { app } = require('electron')

const DEFAULT_START_ON_BOOT = true
const PREF_FILE = 'startup-settings.json'

function getPreferencePath() {
  return path.join(app.getPath('userData'), PREF_FILE)
}

function getPreferredStartOnBoot() {
  try {
    const raw = fs.readFileSync(getPreferencePath(), 'utf8')
    const pref = JSON.parse(raw)
    return typeof pref.openAtLogin === 'boolean' ? pref.openAtLogin : DEFAULT_START_ON_BOOT
  } catch {
    return DEFAULT_START_ON_BOOT
  }
}

function savePreferredStartOnBoot(openAtLogin) {
  fs.mkdirSync(app.getPath('userData'), { recursive: true })
  fs.writeFileSync(getPreferencePath(), JSON.stringify({ openAtLogin }, null, 2))
}

function setStartOnBoot(openAtLogin, persist = false) {
  const enabled = Boolean(openAtLogin)

  app.setLoginItemSettings({
    openAtLogin: enabled,
    openAsHidden: false
  })

  if (persist) savePreferredStartOnBoot(enabled)

  return app.getLoginItemSettings()
}

function applyStartOnBootPreference() {
  return setStartOnBoot(getPreferredStartOnBoot())
}

module.exports = {
  applyStartOnBootPreference,
  getPreferredStartOnBoot,
  setStartOnBoot
}
