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

import electron, { ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'

const userDataPath = electron.app.getPath('userData')

const write = (fileName: string, event, data) => {
  fs.writeFile(path.join(userDataPath, `${fileName}.json`), JSON.stringify(data), err => {
    if (err) {
      event.sender.send(`save-${fileName}`, { status: 'error', ...err })
    } else {
      event.sender.send(`save-${fileName}`, { status: 'success' })
    }
  })
}

const read = (fileName: string, event) => {
  fs.readFile(path.join(userDataPath, `${fileName}.json`), (err, data: any) => {
    if (err) {
      event.sender.send(`load-${fileName}`, { status: 'error', ...err })
    } else {
      event.sender.send(`load-${fileName}`, { status: 'success', ...JSON.parse(data.toString()) })
    }
  })
}

ipcMain.on('save-nodes', (event, data) => {
  write('nodes', event, data)
})

ipcMain.on('load-nodes', event => {
  read('nodes', event)
})

ipcMain.on('save-options', (event, data) => {
  write('options', event, data)
})

ipcMain.on('load-options', event => {
  read('options', event)
})
