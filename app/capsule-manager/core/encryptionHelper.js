const CryptoJS = require('crypto-js')
const fs       = require('fs')
const path     = require('path')
const os       = require('os')

const CONFIG_PATH = path.join(__dirname, '../storage/config.enc')
const SECRET      = os.hostname() + '_capsule_v1_' + os.userInfo().username

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, SECRET).toString()
}

function decrypt(ciphertext) {
  return CryptoJS.AES.decrypt(ciphertext, SECRET).toString(CryptoJS.enc.Utf8)
}

function saveSettings(settings) {
  fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true })
  fs.writeFileSync(CONFIG_PATH, encrypt(JSON.stringify(settings)), 'utf-8')
  return { success: true }
}

function getSettings() {
  if (!fs.existsSync(CONFIG_PATH)) return {}
  try { return JSON.parse(decrypt(fs.readFileSync(CONFIG_PATH, 'utf-8'))) }
  catch { return {} }
}

module.exports = { encrypt, decrypt, saveSettings, getSettings }
