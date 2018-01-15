import alt from '../alt'
import NodesActions from '../actions/NodesActions'

const updateObjectInArray = (array, id, prop, value) => {
  return array.map(item => {
    if (item.id === id) {
      item[prop] = value
    }
    return { ...item }
  })
}

class NodesStore {
  constructor() {
    this.nodes = [
      {
        id: 'node-1',
        host: '192.168.10.101',
        os: 'Windows',
        api: false,
        enabled: true,
      },
      {
        id: 'node-2',
        host: '192.168.10.102',
        os: 'Linux',
        api: true,
        enabled: false,
      },
    ]

    this.selectedNodes = []

    this.bindActions(NodesActions)
  }

  onUpdateSelection({ value }) {
    if (value === 'all') {
      this.selectedNodes = this.nodes.map((n, i) => i)
    } else if (value === 'none') {
      this.selectedNodes = []
    } else {
      this.selectedNodes = [...value]
    }
  }

  onNodeApiToggle({ node, toggled }) {
    this.nodes = updateObjectInArray(this.nodes, node.id, 'api', toggled)
  }

  onNodeEnabledToggle({ node, toggled }) {
    this.nodes = updateObjectInArray(this.nodes, node.id, 'enabled', toggled)
  }

  onNewNode() {
    this.nodes.push({
      id: `node-${Math.random() * 100}`,
      host: '192.168.10.102',
      os: 'Windows',
      api: true,
      enabled: false,
    })
  }
}

export default alt.createStore(NodesStore)
