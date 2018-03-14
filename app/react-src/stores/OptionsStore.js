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

import NetworkDriver from '../models/NetworkDriver'
import PersistenceManager from '../ipc/PersistenceManager'

class OptionsStore {
  @observable networkDrivers: Array<NetworkDriver> = []
  @observable selectedNetworkDriver: string = ''
  @observable clusterNetworkStartIp: string = ''
  @observable clusterNetworkEndIp: string = ''
  @observable serviceNetworkStartIp: string = ''
  @observable serviceNetworkEndIp: string = ''
  @observable ingressToggled: boolean = false
  @observable helmToggled: boolean = false
  @observable registryToggled: boolean = false

  constructor() {
    const networkDriverMockup1 = new NetworkDriver()
    networkDriverMockup1.name = 'Open vSwitch'
    const networkDriverMockup2 = new NetworkDriver()
    networkDriverMockup2.name = 'Others'
    this.networkDrivers = [networkDriverMockup1, networkDriverMockup2]
    this.selectedNetworkDriver = this.networkDrivers[0].name
  }

  @action updateSelectedNetworkDriver(value: string) {
    this.selectedNetworkDriver = value
  }

  @action updateClusterNetworkStartIp(value: string) {
    this.clusterNetworkStartIp = value
  }

  @action updateClusterNetworkEndIp(value: string) {
    this.clusterNetworkEndIp = value
  }

  @action updateServiceNetworkStartIp(value: string) {
    this.serviceNetworkStartIp = value
  }

  @action updateServiceNetworkEndIp(value: string) {
    this.serviceNetworkEndIp = value
  }

  @action updateIngressToggle(value: boolean) {
    this.ingressToggled = value
  }

  @action updateHelmToggle(value: boolean) {
    this.helmToggled = value
  }

  @action updateRegistryToggle(value: boolean) {
    this.registryToggled = value
  }

  @action save() {
    return PersistenceManager.save('options', {
      networkDrivers: toJS(this.networkDrivers),
      selectedNetworkDriver: toJS(this.selectedNetworkDriver),
      clusterNetworkStartIp: toJS(this.clusterNetworkStartIp),
      clusterNetworkEndIp: toJS(this.clusterNetworkEndIp),
      serviceNetworkStartIp: toJS(this.serviceNetworkStartIp),
      serviceNetworkEndIp: toJS(this.serviceNetworkEndIp),
      ingressToggled: toJS(this.ingressToggled),
      helmToggled: toJS(this.helmToggled),
      registryToggled: toJS(this.registryToggled),
    })
  }

  @action load() {
    return PersistenceManager.load('options').then((data: OptionsStore) => {
      this.networkDrivers = data.networkDrivers
      this.selectedNetworkDriver = data.selectedNetworkDriver
      this.clusterNetworkStartIp = data.clusterNetworkStartIp
      this.clusterNetworkEndIp = data.clusterNetworkEndIp
      this.serviceNetworkStartIp = data.serviceNetworkStartIp
      this.serviceNetworkEndIp = data.serviceNetworkEndIp
      this.ingressToggled = data.ingressToggled
      this.helmToggled = data.helmToggled
      this.registryToggled = data.registryToggled
    })
  }
}

export default new OptionsStore()
