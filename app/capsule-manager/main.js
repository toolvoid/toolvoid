const { app, BrowserWindow } = require('electron')
const path = require('path')
const { setupIpcHandlers } = require('./core/ipcHandlers')
const { cleanupPrivateProfile } = require('./core/browserLauncher')
const { shutdownTransferClient } = require('./core/transferClient')
const { applyStartOnBootPreference } = require('./core/startOnBoot')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    titleBarStyle: 'default',
    backgroundColor: '#0f0f0f',
    show: false
  })

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'))
  }

  mainWindow.once('ready-to-show', () => mainWindow.show())
}

app.whenReady().then(() => {
  applyStartOnBootPreference()
  createWindow()
  setupIpcHandlers()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', () => {
  shutdownTransferClient()
  cleanupPrivateProfile()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

function gracefulExit() {
  if (app.isReady()) app.quit()
  else process.exit(0)
}

process.on('SIGINT', gracefulExit)
process.on('SIGTERM', gracefulExit)
