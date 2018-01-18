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
import AccountsActions from '../actions/AccountsActions'
import Account from '../models/Account'

class AccountsStore {
  accounts: Account[]
  bindActions: (actions: AccountsActions) => void

  constructor() {
    this.accounts = []

    this.bindActions(AccountsActions)
  }

  onSetPassword() {
    console.log('Setting the password ...') // eslint-disable-line no-console
  }

  onSetPasswordFulfilled(account: Account) {
    this.accounts = [...this.accounts, account]
    console.log('Password set successfully!') // eslint-disable-line no-console
  }

  onSetPasswordRejected() {
    console.log('Password couldn\'t be set!') // eslint-disable-line no-console
  }

  onGetPassword() {
    console.log('Getting the password ...') // eslint-disable-line no-console
  }

  onGetPasswordFulfilled(account: Account) {
    this.accounts = [...this.accounts, account]
    console.log('Password retrieved successfully!') // eslint-disable-line no-console
  }

  onGetPasswordRejected() {
    console.log('Password couldn\'t be retrieved!') // eslint-disable-line no-console
  }
}

export default alt.createStore(AccountsStore)
