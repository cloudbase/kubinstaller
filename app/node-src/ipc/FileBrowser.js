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

import { ipcMain, dialog, BrowserWindow } from 'electron'
import fs from 'fs'

const certificateChannel = 'browse-certificate'

ipcMain.on(certificateChannel, event => {
  const paths = dialog.showOpenDialog(BrowserWindow.getAllWindows()[0], {
    title: 'Open Certificate File',
    filters: { name: 'All Files', extensions: ['*'] },
    properties: ['openFile', 'showHiddenFiles'],
  })
  if (!paths) {
    event.sender.send(certificateChannel, { contents: null })
    return
  }
  const contents = fs.readFileSync(paths[0], 'utf8')
  event.sender.send(certificateChannel, { contents })
})
