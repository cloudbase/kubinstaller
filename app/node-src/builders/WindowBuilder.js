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

const WindowShowDelay = 500

export default class WindowBuilder extends EventEmitter {
  mainWindow: BrowserWindow
  splashWindow: BrowserWindow
  appUrl: string

  constructor(appUrl: string) {
    super()

    this.appUrl = appUrl
  }

  buildWindow(windowOptions: BrowserWindowConstructorOptions, url: string): Promise<BrowserWindow> {
    return new Promise((resolve, reject) => {
      const window = new BrowserWindow(windowOptions)

      window.loadURL(url)

      window.once('ready-to-show', () => {
        if (!window) {
          reject(new Error('window could not be built'))
        }
        setTimeout(() => {
          window.show()
          window.focus()
          resolve(window)
        }, WindowShowDelay)
      })
    })
  }

  buildMainWindow(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.buildWindow({
        show: false,
        width: 1024,
        height: 728,
        minWidth: 945,
        minHeight: 580,
        backgroundColor: '#EEF0F3',
      }, this.appUrl).then(window => {
        this.mainWindow = window
        this.emit('main-window-loaded')
        this.mainWindow.on('closed', () => {
          this.mainWindow = null
        })
        resolve()
      }, reject)
    })
  }

  buildSplashWindow(windowOptions?: BrowserWindowConstructorOptions, isSplash: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      this.buildWindow({
        show: false,
        frame: false,
        width: 400,
        height: 300,
        transparent: true,
        center: true,
        hasShadow: false,
        ...windowOptions,
      }, `${this.appUrl}#/about${isSplash ? '?isSplash=true' : ''}`).then(window => {
        this.splashWindow = window
        this.splashWindow.on('closed', () => {
          this.splashWindow = null
        })
        this.emit('splash-window-loaded')
        resolve()
      }, reject)
    })
  }

  destroySplashWindow() {
    if (this.splashWindow) {
      this.splashWindow.close()
    }
  }
}
