const { spawn } = require('child_process')
const path      = require('path')

function readChatFromBrowser() {
  return new Promise((resolve, reject) => {
    const py = spawn('python3', [path.join(__dirname, '../bridge/bridge.py')])

    let output = ''
    let errOut = ''

    py.stdout.on('data', d => { output += d.toString() })
    py.stderr.on('data', d => { errOut += d.toString() })

    py.on('close', code => {
      if (code !== 0) return reject(new Error('Python bridge error: ' + errOut))
      try { resolve(JSON.parse(output)) }
      catch { reject(new Error('Invalid JSON from bridge: ' + output)) }
    })
  })
}

module.exports = { readChatFromBrowser }
