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

import { observable, action } from 'mobx'

import Credentials from '../models/Credentials'
import CrendetialsManager from '../ipc/CrendetialsManager'

class CredentialsStore {
  @observable credentials: Credentials[] = []

  @action setPassword(username: string, password: string) {
    return CrendetialsManager.set(username, password).then(() => {
      this.credentials = [...this.credentials, new Credentials(username, password)]
    })
  }

  @action getPassword(username: string) {
    return CrendetialsManager.get(username).then((credentials: Credentials) => {
      this.credentials = [...this.credentials, new Credentials(username, credentials.password)]
    })
  }
}

export default new CredentialsStore()
