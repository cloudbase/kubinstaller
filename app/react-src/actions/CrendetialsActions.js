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

import alt from '../alt'
import CrendetialsManager from '../ipc/CrendetialsManager'

class CrendetialsActions {
  setPassword(username: string, password: string) {
    CrendetialsManager.set(username, password).then(
      () => { this.setPasswordFulfilled(username, password) },
      error => { this.setPasswordRejected(error) }
    )
    return { username, password }
  }

  setPasswordFulfilled(username: string, password: string) {
    return { username, password }
  }

  setPasswordRejected(error) {
    return error || true
  }

  getPassword(username: string) {
    CrendetialsManager.get(username).then(
      (response) => { this.getPasswordFulfilled(username, response.password) },
      error => { this.getPasswordRejected(error) }
    )
    return { username }
  }

  getPasswordFulfilled(username: string, password: string) {
    return { username, password }
  }

  getPasswordRejected(error) {
    return error || true
  }
}

export default alt.createActions(CrendetialsActions)
