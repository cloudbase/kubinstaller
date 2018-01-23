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

import Credentials from '../models/Credentials'

export default class Node {
  id: string
  host: string
  os: 'linux' | 'windows'
  isMaster: boolean
  isNode: boolean
  credentials: Credentials
  sshKey: string

  constructor(node?: Node) {
    this.id = (node && node.id) || `node-${new Date().getTime()}`
    this.host = (node && node.host) || ''
    this.os = (node && node.os) || 'linux'
    this.isMaster = (node && node.isMaster) || false
    this.isNode = (node && node.isNode) || false
    this.sshKey = (node && node.sshKey) || ''

    if (node && node.credentials) {
      this.credentials = new Credentials(node.credentials.username, node.credentials.password)
    } else {
      this.credentials = new Credentials()
    }
  }
}
