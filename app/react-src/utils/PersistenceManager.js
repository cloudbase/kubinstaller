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

import { ipcRenderer } from 'electron'

class Ipc {
  static send(channel: string, data: any, errorMessage: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ipcRenderer.send(channel, data)
      ipcRenderer.once(channel, (event, arg) => {
        if (arg.status === 'error') {
          console.error(errorMessage, arg) // eslint-disable-line no-console
          reject(arg)
        } else {
          resolve(arg)
        }
      })
    })
  }
}

export default class PersistenceManager {
  static save(channel: string, data: any): Promise<any> {
    return Ipc.send(`save-${channel}`, data, `Saving to channel 'save-${channel}' failed!`)
  }

  static load(channel: string): Promise<any> {
    return Ipc.send(`load-${channel}`, null, `Loading from channel 'load-${channel}' failed!`)
  }
}
