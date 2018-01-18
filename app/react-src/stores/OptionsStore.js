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