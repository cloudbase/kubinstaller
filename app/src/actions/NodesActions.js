// @flow

import alt from '../alt'
import Node from '../models/Node'

class NodesActions {
  updateSelection(value: string | Array<number>) {
    return { value }
  }

  nodeApiToggle(node: Node, toggled: boolean) {
    return { node, toggled }
  }

  nodeEnabledToggle(node: Node, toggled: boolean) {
    return { node, toggled }
  }

  newNode() {
    return true
  }
}

export default alt.createActions(NodesActions)
