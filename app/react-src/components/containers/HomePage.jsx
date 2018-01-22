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

import React from 'react'
import styled from 'styled-components'
import connectToStores from '../../utils/connectToStores'

import OptionsStore from '../../stores/OptionsStore'
import OptionsActions from '../../actions/OptionsActions'
import NodesStore from '../../stores/NodesStore'
import NodesActions from '../../actions/NodesActions'
import AccountsStore from '../../stores/AccountsStore'
import OptionsPanel from '../organisms/OptionsPanel'
import NodesPanel from '../organisms/NodesPanel'
import MainTemplate from './MainTemplate'
import Node from '../../models/Node'

const Wrapper = styled.div``
const Panels = styled.div`
  display: flex;
  margin-left: -24px;
  & > div {
    margin-left: 24px;
  }
`

type Props = {
  networkDrivers: Array<any>,
  selectedNetworkDriver: string,
  clusterNetworkStartIp: string,
  clusterNetworkEndIp: string,
  serviceNetworkStartIp: string,
  serviceNetworkEndIp: string,
  ingressToggled: boolean,
  helmToggled: boolean,
  registryToggled: boolean,
  nodes: Array<Node>,
  selectedNodes: Array<number>,
}

class HomePage extends React.Component<Props> {
  static getStores() {
    return [OptionsStore, NodesStore]
  }

  static getPropsFromStores() {
    let optionsStore = OptionsStore.getState()
    let nodesStore = NodesStore.getState()
    let accountsStore = AccountsStore.getState()
    return {
      networkDrivers: optionsStore.networkDrivers,
      selectedNetworkDriver: optionsStore.selectedNetworkDriver,
      clusterNetworkStartIp: optionsStore.clusterNetworkStartIp,
      clusterNetworkEndIp: optionsStore.clusterNetworkEndIp,
      serviceNetworkStartIp: optionsStore.serviceNetworkStartIp,
      serviceNetworkEndIp: optionsStore.serviceNetworkEndIp,
      ingressToggled: optionsStore.ingressToggled,
      helmToggled: optionsStore.helmToggled,
      registryToggled: optionsStore.registryToggled,
      nodes: nodesStore.nodes,
      selectedNodes: nodesStore.selectedNodes,
      accounts: accountsStore.accounts,
    }
  }

  componentWillMount() {
    NodesActions.load()
  }

  handleNetworkDriverChange(name) {
    OptionsActions.updateSelectedNetworkDriver(name)
  }

  handleClusterNetworkStartIpChange(ip) {
    OptionsActions.updateClusterNetworkStartIp(ip)
  }

  handleClusterNetworkEndIpChange(ip) {
    OptionsActions.updateClusterNetworkEndIp(ip)
  }

  handleServiceNetworkStartIpChange(ip) {
    OptionsActions.updateServiceNetworkStartIp(ip)
  }

  handleServiceNetworkEndIpChange(ip) {
    OptionsActions.updateServiceNetworkEndIp(ip)
  }

  handleIngressToggle(toggled) {
    OptionsActions.updateIngressToggle(toggled)
  }

  handleHelmToggle(toggled) {
    OptionsActions.updateHelmToggle(toggled)
  }

  handleRegistryToggle(toggled) {
    OptionsActions.updateRegistryToggle(toggled)
  }

  handleNodeSelection(selection) {
    NodesActions.updateSelection(selection)
    NodesActions.save()
  }

  handleNodeIsMasterToggle(node: Node, toggled) {
    NodesActions.nodeIsMasterToggle(node, toggled)
    NodesActions.save()
  }

  handleNodeIsNodeToggle(node, toggled) {
    NodesActions.nodeIsNodeToggle(node, toggled)
    NodesActions.save()
  }

  handleNewNodeClick() {
    NodesActions.newNode()
    NodesActions.save()
  }

  handleDeleteSelection() {
    NodesActions.deleteSelection()
    NodesActions.save()
  }

  render() {
    return (
      <MainTemplate
        body={(
          <Wrapper>
            <Panels>
              <NodesPanel
                nodes={this.props.nodes}
                selectedNodes={this.props.selectedNodes}
                onNodeSelection={selection => { this.handleNodeSelection(selection) }}
                onNodeIsMasterToggle={(node: Node, toggled) => { this.handleNodeIsMasterToggle(node, toggled) }}
                onNodeIsNodeToggle={(node, toggled) => { this.handleNodeIsNodeToggle(node, toggled) }}
                onNewNodeClick={() => { this.handleNewNodeClick() }}
                onDeleteSelection={() => { this.handleDeleteSelection() }}
              />
              <OptionsPanel
                networkDrivers={this.props.networkDrivers}
                selectedNetworkDriver={this.props.selectedNetworkDriver}
                onNetworkDriverChange={v => { this.handleNetworkDriverChange(v) }}
                clusterNetworkStartIp={this.props.clusterNetworkStartIp}
                clusterNetworkEndIp={this.props.clusterNetworkEndIp}
                onClusterNetworkStartIpChange={v => { this.handleClusterNetworkStartIpChange(v) }}
                onClusterNetworkEndIpChange={v => { this.handleClusterNetworkEndIpChange(v) }}
                serviceNetworkStartIp={this.props.serviceNetworkStartIp}
                serviceNetworkEndIp={this.props.serviceNetworkEndIp}
                onServiceNetworkStartIpChange={v => { this.handleServiceNetworkStartIpChange(v) }}
                onServiceNetworkEndIpChange={v => { this.handleServiceNetworkEndIpChange(v) }}
                ingressToggled={this.props.ingressToggled}
                onIngressToggle={v => { this.handleIngressToggle(v) }}
                helmToggled={this.props.helmToggled}
                onHelmToggle={v => { this.handleHelmToggle(v) }}
                registryToggled={this.props.registryToggled}
                onRegistryToggle={v => { this.handleRegistryToggle(v) }}
              />
            </Panels>
          </Wrapper>
      )}
      />
    )
  }
}

export default connectToStores(HomePage)
