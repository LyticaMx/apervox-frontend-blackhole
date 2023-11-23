const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const { ipcMain } = require('electron')
let mainWindow

function createWindow () {
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
      : `file://${path.join(__dirname, './index.html')}`
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
