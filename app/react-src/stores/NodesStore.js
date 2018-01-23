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
import NodesActions from '../actions/NodesActions'
import Node from '../models/Node'

class NodesStore {
  nodes: Node[]
  selectedNodes: number[]
  validating: boolean
  bindActions: (actions: NodesActions) => void

  constructor() {
    this.nodes = []
    this.selectedNodes = []
    this.validating = false

    this.bindActions(NodesActions)
  }

  onUpdateSelection(options: { value: Array<number> | string, }) {
    if (options.value === 'all') {
      this.selectedNodes = this.nodes.map((n, i) => i)
    } else if (options.value === 'none') {
      this.selectedNodes = []
    } else if (options.value instanceof Array) {
      this.selectedNodes = [...options.value]
    }
  }

  onAdd(options: { node: Node, }) {
    this.nodes = [...this.nodes, options.node]
    this.selectedNodes = []
  }

  onUpdate(options: { node: Node, }) {
    this.nodes = this.nodes.map(node => {
      if (node.id === options.node.id) {
        return new Node(options.node)
      }
      return new Node(node)
    })
    this.selectedNodes = []
  }

  onLoadFulfilled(data: NodesStore) {
    this.nodes = data.nodes
    this.selectedNodes = data.selectedNodes
  }

  onDeleteSelection() {
    this.nodes = this.nodes.filter((_, i: number) => this.selectedNodes.indexOf(i) === -1)
    this.selectedNodes = []
  }

  onValidate() {
    this.validating = true
  }

  onValidateFulfilled() {
    this.validating = false
  }

  onValidateRejected() {
    this.validating = false
  }
}

export default alt.createStore(NodesStore)
