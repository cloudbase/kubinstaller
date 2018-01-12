import alt from '../alt'

class OptionsActions {
  updateSelectedNetworkDriver(value) {
    return { value }
  }

  updateClusterNetworkStartIp(value) {
    return { value }
  }

  updateClusterNetworkEndIp(value) {
    return { value }
  }

  updateServiceNetworkStartIp(value) {
    return { value }
  }

  updateServiceNetworkEndIp(value) {
    return { value }
  }

  updateIngressToggle(value) {
    return { value }
  }

  updateHelmToggle(value) {
    return { value }
  }

  updateRegistryToggle(value) {
    return { value }
  }
}

export default alt.createActions(OptionsActions)
