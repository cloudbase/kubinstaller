import alt from '../alt'

import OptionsActions from '../actions/OptionsActions'

class OptionsStore {
  constructor() {
    this.networkDrivers = [{ name: 'OVS' }, { name: 'Others' }]
    this.selectedNetworkDriver = 'OVS'
    this.clusterNetworkStartIp = ''
    this.clusterNetworkEndIp = ''
    this.serviceNetworkStartIp = ''
    this.serviceNetworkEndIp = ''
    this.ingressToggled = false
    this.helmToggled = false
    this.registryToggled = false

    this.bindActions(OptionsActions)
  }

  onUpdateSelectedNetworkDriver({ value }) {
    this.selectedNetworkDriver = value
  }

  onUpdateClusterNetworkStartIp({ value }) {
    this.clusterNetworkStartIp = value
  }

  onUpdateClusterNetworkEndIp({ value }) {
    this.clusterNetworkEndIp = value
  }

  onUpdateServiceNetworkStartIp({ value }) {
    this.serviceNetworkStartIp = value
  }

  onUpdateServiceNetworkEndIp({ value }) {
    this.serviceNetworkEndIp = value
  }

  onUpdateIngressToggle({ value }) {
    this.ingressToggled = value
  }

  onUpdateHelmToggle({ value }) {
    this.helmToggled = value
  }

  onUpdateRegistryToggle({ value }) {
    this.registryToggled = value
  }
}

export default alt.createStore(OptionsStore)
