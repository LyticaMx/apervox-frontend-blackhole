const { app, BrowserWindow, protocol } = require('electron')
const isDev = require('electron-is-dev')
const { ipcMain } = require('electron')
const Protocol = require('./protocol')
let mainWindow

function createWindow () {
  if (!isDev) {
    protocol.registerBufferProtocol(Protocol.scheme, Protocol.requestHandler)
  }
  mainWindow = new BrowserWindow({
    width: 1366,
    minWidth: 768,
    height: 768,
    fullscreen: false,
    skipTaskbar: false,
    titleBarStyle: 'hidden', // opcion para windows
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.setMenuBarVisibility(isDev)

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `${Protocol.scheme}://rse/index.html`
  )

  // Wait until webpack build html page
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }

    mainWindow = null
  })

  if (isDev) {
    const {
      REACT_DEVELOPER_TOOLS,
      default: installExtension
    } = require('electron-devtools-installer')
    installExtension(REACT_DEVELOPER_TOOLS).then(() => {
      mainWindow.webContents.openDevTools()
    })
  }

  ipcMain.addListener('minimize-window', () => mainWindow.minimize())
  ipcMain.addListener('maximize-window', () => {
    if (!mainWindow.isMaximized()) mainWindow.maximize()
    else mainWindow.unmaximize()
  })
  ipcMain.addListener('close-window', () => mainWindow.close())
}

protocol.registerSchemesAsPrivileged([{
  scheme: Protocol.scheme,
  privileges: {
    standard: true,
    secure: true
  }
}])

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
