const electron = require('electron')
const { app, BrowserWindow } = electron
const path = require('path')
const isDev = require('electron-is-dev')
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1366,
    minWidth: 768,
    height: 768,
    fullscreen: false,
    skipTaskbar: false
  })

  mainWindow.setMenuBarVisibility(false)

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3001'
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

  if (!isDev) {
    const {
      REACT_DEVELOPER_TOOLS,
      default: installExtension
    } = require('electron-devtools-installer')

    installExtension(REACT_DEVELOPER_TOOLS).then(() => {
      mainWindow.webContents.openDevTools()
    })
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
