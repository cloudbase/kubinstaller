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
import Node from '../models/Node'
import NodesStore from '../stores/NodesStore'
import PersistenceManager from '../ipc/PersistenceManager'

class NodesActions {
  updateSelection(value: string | Array<number>) {
    return { value }
  }

  add(node: Node) {
    return { node }
  }

  update(node: Node) {
    return { node }
  }

  save() {
    return { promise: PersistenceManager.save('nodes', NodesStore.getState()) }
  }

  load() {
    return {
      promise: PersistenceManager.load('nodes').then(
        data => { this.loadFulfilled(data) },
        error => { this.loadRejected(error) }
      ),
    }
  }

  loadFulfilled(data: NodesStore) {
    return data || true
  }

  loadRejected(error) {
    return error || true
  }

  deleteSelection() {
    return true
  }

  validate(node: Node) {
    return {
      promise: new Promise((resolve, reject) => {
        setTimeout(() => {
          if (node.host === 'localhost') {
            reject(new Error('Node is localhost'))
          } else {
            resolve(node)
          }
        }, 3000)
      }).then(
        () => { this.validateFulfilled(node) },
        reason => { this.validateRejected(node, reason) },
      ),
      node,
    }
  }

  validateFulfilled(node: Node) {
    return { node }
  }

  validateRejected(node: Node, reason: Error) {
    return { node, reason }
  }
}

export default alt.createActions(NodesActions)
