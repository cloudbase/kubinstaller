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

import { observable, action, toJS } from 'mobx'

import Node from '../models/Node'
import PersistenceManager from '../ipc/PersistenceManager'

class NodesStore {
  @observable nodes: Node[] = []
  @observable selectedNodes: number[] = []
  @observable validating: boolean = false

  @action updateSelection(value: string | number[]) {
    if (value === 'all') {
      this.selectedNodes = this.nodes.map((n, i) => i)
    } else if (value === 'none') {
      this.selectedNodes = []
    } else if (value instanceof Array) {
      this.selectedNodes = [...value]
    }
  }

  @action add(node: Node) {
    this.nodes = [...this.nodes, node]
    this.selectedNodes = []
  }

  @action update(nodeData: Node) {
    this.nodes = this.nodes.map(node => {
      if (nodeData.id === node.id) {
        return nodeData
      }
      return node
    })
    this.selectedNodes = []
  }

  @action save() {
    return PersistenceManager.save('nodes', {
      nodes: toJS(this.nodes),
      selectedNodes: toJS(this.selectedNodes),
    })
  }

  @action load() {
    return PersistenceManager.load('nodes').then((data: { nodes: Node[], selectedNodes: number[] }) => {
      this.nodes = data.nodes
      this.selectedNodes = data.selectedNodes
    })
  }

  @action deleteSelection() {
    this.nodes = this.nodes.filter((_, i: number) => this.selectedNodes.indexOf(i) === -1)
    this.selectedNodes = []
  }

  @action validate(node: Node) {
    this.validating = true

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(node)
      }, 3000)
    }).then(() => {
      this.validating = false
    }).catch(() => {
      this.validating = false
    })
  }
}

export default new NodesStore()
