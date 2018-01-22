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

export default class Node {
  id: string
  host: string
  os: string
  isMaster: boolean
  isNode: boolean

  constructor(props: {
    id: string, host: string, os: string, isMaster: boolean, isNode: boolean,
  }) {
    this.id = props.id
    this.host = props.host
    this.os = props.os
    this.isMaster = props.isMaster
    this.isNode = props.isNode
  }

  static random(): Node {
    return new Node({
      id: `node-${Math.random() * 100}`,
      host: `192.168.10.${Math.floor(Math.random() * 256)}`,
      os: ['Windows', 'Linux'][Math.floor(Math.random() * 2)],
      isMaster: [true, false][Math.floor(Math.random() * 2)],
      isNode: [true, false][Math.floor(Math.random() * 2)],
    })
  }
}
