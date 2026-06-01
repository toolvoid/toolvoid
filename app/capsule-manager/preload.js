const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('capsule', {
  // Capsule CRUD
  saveCapsule:     (data)     => ipcRenderer.invoke('capsule:save', data),
  getCapsules:     ()         => ipcRenderer.invoke('capsule:getAll'),
  getCapsule:      (id)       => ipcRenderer.invoke('capsule:get', id),
  deleteCapsule:   (id)       => ipcRenderer.invoke('capsule:delete', id),
  updateCapsule:   (id, data) => ipcRenderer.invoke('capsule:update', id, data),

  // Browser + CDP
  getBrowsers:     ()         => ipcRenderer.invoke('browser:list'),
  launchBrowser:   (path)     => ipcRenderer.invoke('browser:launch', path),
  readChat:        (options)  => ipcRenderer.invoke('browser:readChat', options),
  transferCapsule: (data)     => ipcRenderer.invoke('browser:transfer', data),

  // Settings
  saveSettings:    (s)        => ipcRenderer.invoke('settings:save', s),
  getSettings:     ()         => ipcRenderer.invoke('settings:get'),
  setStartOnBoot:  (enabled)  => ipcRenderer.invoke('settings:setStartOnBoot', enabled),
  getStartOnBoot:  ()         => ipcRenderer.invoke('settings:getStartOnBoot'),

  // Events: main → renderer
  onCapsuleUpdated: (cb) => ipcRenderer.on('capsule:updated', (_, d) => cb(d)),
  onBridgeStatus:   (cb) => ipcRenderer.on('bridge:status',   (_, d) => cb(d))
})
