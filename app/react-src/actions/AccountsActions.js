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
import AccountsManager from '../ipc/AccountsManager'

class AccountsActions {
  setPassword(account: string, password: string) {
    AccountsManager.set(account, password).then(
      () => { this.setPasswordFulfilled(account, password) },
      error => { this.setPasswordRejected(error) }
    )
    return { account, password }
  }

  setPasswordFulfilled(account: string, password: string) {
    return { account, password }
  }

  setPasswordRejected(error) {
    return error || true
  }

  getPassword(account: string) {
    AccountsManager.get(account).then(
      (response) => { this.getPasswordFulfilled(account, response.password) },
      error => { this.getPasswordRejected(error) }
    )
    return { account }
  }

  getPasswordFulfilled(account: string, password: string) {
    return { account, password }
  }

  getPasswordRejected(error) {
    return error || true
  }
}

export default alt.createActions(AccountsActions)
