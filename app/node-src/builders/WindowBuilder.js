/*
Copyright 2018 Cloudbase Solutions Srl

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// @flow

import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import EventEmitter from 'events'

export default class WindowBuilder extends EventEmitter {
  mainWindow: BrowserWindow
  splashWindow: BrowserWindow
  appUrl: string

  constructor(appUrl: string) {
    super()

    this.appUrl = appUrl
  }

  buildMainWindow(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        minWidth: 945,
        minHeight: 580,
        backgroundColor: '#EEF0F3',
      })

      this.mainWindow.loadURL(this.appUrl)
      this.mainWindow.once('ready-to-show', () => {
        if (!this.mainWindow) {
          reject(new Error('"mainWindow" is not defined'))
        }
        this.mainWindow.show()
        this.mainWindow.focus()
        this.emit('main-window-loaded')
        resolve()
      })

      this.mainWindow.on('closed', () => {
        this.mainWindow = null
      })
    })
  }

  buildSplashWindow(windowOptions?: BrowserWindowConstructorOptions, isSplash: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      this.splashWindow = new BrowserWindow({
        show: false,
        width: 524,
        height: 400,
        frame: false,
        transparent: true,
        center: true,
        ...windowOptions,
      })

      this.splashWindow.loadURL(`${this.appUrl}#/about${isSplash ? '?isSplash=true' : ''}`)

      this.splashWindow.once('ready-to-show', () => {
        if (!this.splashWindow) {
          reject(new Error('"splashWindow" is not defined'))
        }
        this.splashWindow.show()
        this.splashWindow.focus()
        this.emit('splash-window-loaded')
        resolve()
      })

      this.splashWindow.on('closed', () => {
        this.splashWindow = null
      })
    })
  }

  destroySplashWindow() {
    if (this.splashWindow) {
      this.splashWindow.close()
    }
  }
}
