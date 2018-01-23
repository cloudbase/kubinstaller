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

import { ipcMain } from 'electron'
import keytar from 'keytar'

const serviceName = 'kubinstaller'

ipcMain.on('set-password', (event, data) => {
  keytar.setPassword(serviceName, data.account, data.password).then(
    () => { event.sender.send('set-password', { status: 'success' }) },
    error => { event.sender.send('set-password', { status: 'error', ...error }) }
  )
})

ipcMain.on('get-password', (event, data) => {
  keytar.getPassword(serviceName, data.account).then(
    (password: string) => { event.sender.send('get-password', { status: 'success', password }) },
    error => { event.sender.send('get-password', { status: 'error', ...error }) }
  )
})
