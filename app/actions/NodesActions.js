import alt from '../alt'

class NodesActions {
  updateSelection(value) {
    return { value }
  }

  nodeApiToggle(node, toggled) {
    return { node, toggled }
  }

  nodeEnabledToggle(node, toggled) {
    return { node, toggled }
  }

  newNode() {
    return true
  }
}

export default alt.createActions(NodesActions)
