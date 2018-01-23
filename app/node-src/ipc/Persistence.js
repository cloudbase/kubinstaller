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
const nodesFilePath = path.join(userDataPath, 'nodes.json')

ipcMain.on('save-nodes', (event, data) => {
  fs.writeFile(nodesFilePath, JSON.stringify(data), err => {
    if (err) {
      event.sender.send('save-nodes', { status: 'error', ...err })
    } else {
      event.sender.send('save-nodes', { status: 'success' })
    }
  })
})

ipcMain.on('load-nodes', event => {
  fs.readFile(nodesFilePath, (err, data: any) => {
    if (err) {
      event.sender.send('load-nodes', { status: 'error', ...err })
    } else {
      event.sender.send('load-nodes', { status: 'success', ...JSON.parse(data.toString()) })
    }
  })
})
