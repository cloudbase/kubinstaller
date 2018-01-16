// @flow

import alt from '../alt'

class OptionsActions {
  updateSelectedNetworkDriver(value: string) {
    return { value }
  }

  updateClusterNetworkStartIp(value: string) {
    return { value }
  }

  updateClusterNetworkEndIp(value: string) {
    return { value }
  }

  updateServiceNetworkStartIp(value: string) {
    return { value }
  }

  updateServiceNetworkEndIp(value: string) {
    return { value }
  }

  updateIngressToggle(value: boolean) {
    return { value }
  }

  updateHelmToggle(value: boolean) {
    return { value }
  }

  updateRegistryToggle(value: boolean) {
    return { value }
  }
}

export default alt.createActions(OptionsActions)
