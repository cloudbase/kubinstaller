// @flow

import alt from '../alt'

import OptionsActions from '../actions/OptionsActions'
import NetworkDriver from '../models/NetworkDriver'

class OptionsStore {
  networkDrivers: Array<NetworkDriver>
  selectedNetworkDriver: string
  clusterNetworkStartIp: string
  clusterNetworkEndIp: string
  serviceNetworkStartIp: string
  serviceNetworkEndIp: string
  ingressToggled: boolean
  helmToggled: boolean
  registryToggled: boolean
  bindActions: (actions: OptionsActions) => void

  constructor() {
    this.networkDrivers = [new NetworkDriver({ name: 'OVS' }), new NetworkDriver({ name: 'Others' })]
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

  onUpdateSelectedNetworkDriver(arg: { value: string, }) {
    this.selectedNetworkDriver = arg.value
  }

  onUpdateClusterNetworkStartIp(arg: { value: string, }) {
    this.clusterNetworkStartIp = arg.value
  }

  onUpdateClusterNetworkEndIp(arg: { value: string, }) {
    this.clusterNetworkEndIp = arg.value
  }

  onUpdateServiceNetworkStartIp(arg: { value: string, }) {
    this.serviceNetworkStartIp = arg.value
  }

  onUpdateServiceNetworkEndIp(arg: { value: string, }) {
    this.serviceNetworkEndIp = arg.value
  }

  onUpdateIngressToggle(arg: { value: boolean, }) {
    this.ingressToggled = arg.value
  }

  onUpdateHelmToggle(arg: { value: boolean, }) {
    this.helmToggled = arg.value
  }

  onUpdateRegistryToggle(arg: { value: boolean, }) {
    this.registryToggled = arg.value
  }
}

export default alt.createStore(OptionsStore)
