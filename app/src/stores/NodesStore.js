// @flow

import alt from '../alt'
import NodesActions from '../actions/NodesActions'
import Node from '../models/Node'

const updateArray = (array: Array<Node>, id: string, callback: (node: Node) => Node) => {
  return array.map((node: Node) => {
    if (node.id === id) {
      return Node.clone(callback(node))
    }
    return Node.clone(node)
  })
}

class NodesStore {
  nodes: Array<Node>
  selectedNodes: Array<number>
  bindActions: (actions: NodesActions) => void

  constructor() {
    this.nodes = [
      new Node({
        id: 'node-1',
        host: '192.168.10.101',
        os: 'Windows',
        api: false,
        enabled: true,
      }),
      new Node({
        id: 'node-2',
        host: '192.168.10.102',
        os: 'Linux',
        api: true,
        enabled: false,
      })]

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

  onNodeApiToggle(options: { node: Node, toggled: boolean, }) {
    this.nodes = updateArray(this.nodes, options.node.id, (node: Node) => {
      node.api = options.toggled
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
    let newNode = new Node({
      id: `node-${Math.random() * 100}`,
      host: '192.168.10.102',
      os: 'Windows',
      api: true,
      enabled: false,
    })
    this.nodes.push(newNode)
  }
}

export default alt.createStore(NodesStore)
