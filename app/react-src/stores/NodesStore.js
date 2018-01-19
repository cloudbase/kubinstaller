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

const updateArray = (array: Array<Node>, id: string, callback: (node: Node) => Node) => {
  return array.map((node: Node) => {
    if (node.id === id) {
      return new Node(callback(node))
    }
    return new Node(node)
  })
}

class NodesStore {
  nodes: Node[]
  selectedNodes: number[]
  bindActions: (actions: NodesActions) => void

  constructor() {
    this.nodes = []
    this.selectedNodes = []

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

  onNodeMasterToggle(options: { node: Node, toggled: boolean, }) {
    this.nodes = updateArray(this.nodes, options.node.id, (node: Node) => {
      node.master = options.toggled
      return node
    })
  }

  onNodeEnabledToggle(options: { node: Node, toggled: boolean, }) {
    this.nodes = updateArray(this.nodes, options.node.id, (node: Node) => {
      node.enabled = options.toggled
      return node
    })
  }

  onNewNode() {
    this.nodes = [...this.nodes, Node.random()]
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
}

export default alt.createStore(NodesStore)
