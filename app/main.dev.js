/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow } from 'electron'
import MenuBuilder from './menu'
import './node-src'

let mainWindow = null
let splashWindow = null
const appUrl = `file://${__dirname}/app.html`

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')()
  const path = require('path')
  const p = path.join(__dirname, '..', 'app', 'node_modules')
  require('module').globalPaths.push(p)
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
  ]

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log) // eslint-disable-line no-console
}


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const createMainWindow = (onFinish?: () => void) => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    backgroundColor: '#EEF0F3',
  })

  mainWindow.loadURL(appUrl)
  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    mainWindow.show()
    mainWindow.focus()
    if (onFinish) onFinish()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()
}

const createSplashWindow = () => {
  splashWindow = new BrowserWindow({
    show: false,
    width: 524,
    height: 524,
    frame: false,
    transparent: true,
    center: true,
  })

  splashWindow.loadURL(`${appUrl}#/splash`)

  splashWindow.once('ready-to-show', () => {
    if (!splashWindow) {
      throw new Error('"splashWindow" is not defined')
    }
    splashWindow.show()
    splashWindow.focus()

    setTimeout(() => {
      createMainWindow(() => { if (splashWindow) splashWindow.close() })
    }, 3000)
  })

  splashWindow.on('closed', () => {
    splashWindow = null
  })
}

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions()
  }

  createSplashWindow()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null && splashWindow === null) {
    createMainWindow()
  }
})
