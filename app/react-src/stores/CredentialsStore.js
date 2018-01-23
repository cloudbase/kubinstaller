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
import CrendetialsActions from '../actions/CrendetialsActions'
import Credentials from '../models/Credentials'

class CredentialsStore {
  credentials: Credentials[]
  bindActions: (actions: CrendetialsActions) => void

  constructor() {
    this.credentials = []

    this.bindActions(CrendetialsActions)
  }

  onSetPassword() {
    console.log('Setting the password ...') // eslint-disable-line no-console
  }

  onSetPasswordFulfilled(credentials: Credentials) {
    this.credentials = [...this.credentials, credentials]
    console.log('Password set successfully!') // eslint-disable-line no-console
  }

  onSetPasswordRejected() {
    console.log('Password couldn\'t be set!') // eslint-disable-line no-console
  }

  onGetPassword() {
    console.log('Getting the password ...') // eslint-disable-line no-console
  }

  onGetPasswordFulfilled(credentials: Credentials) {
    this.credentials = [...this.credentials, credentials]
    console.log('Password retrieved successfully!') // eslint-disable-line no-console
  }

  onGetPasswordRejected() {
    console.log('Password couldn\'t be retrieved!') // eslint-disable-line no-console
  }
}

export default alt.createStore(CredentialsStore)
