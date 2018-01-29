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
import CredentialsStore from '../../stores/CredentialsStore'
import OptionsPanel from '../organisms/OptionsPanel'
import NodesPanel from '../organisms/NodesPanel'
import MainTemplate from './MainTemplate'
import Node from '../../models/Node'
import NodeModal from '../organisms/NodeModal'

const Wrapper = styled.div``
const Panels = styled.div`
  display: flex;
  margin-left: -24px;
  height: 100%;
  & > div {
    margin-left: 24px;
  }
`

type Props = {
  networkDrivers: any[],
  selectedNetworkDriver: string,
  clusterNetworkStartIp: string,
  clusterNetworkEndIp: string,
  serviceNetworkStartIp: string,
  serviceNetworkEndIp: string,
  ingressToggled: boolean,
  helmToggled: boolean,
  registryToggled: boolean,
  nodes: Node[],
  selectedNodes: number[],
  nodesValidating: boolean,
}

type State = {
  showNodeModal: boolean,
  selectedNode: ?Node,
}

class HomePage extends React.Component<Props, State> {
  static getStores() {
    return [OptionsStore, NodesStore]
  }

  static getPropsFromStores() {
    let optionsStore = OptionsStore.getState()
    let nodesStore = NodesStore.getState()
    let credentialsStore = CredentialsStore.getState()
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
      credentials: credentialsStore.credentials,
      nodesValidating: nodesStore.validating,
    }
  }

  state = {
    showNodeModal: false,
    selectedNode: null,
  }

  componentWillMount() {
    NodesActions.load()
    OptionsActions.load()
  }

  handleNetworkDriverChange(name) {
    OptionsActions.updateSelectedNetworkDriver(name)
    OptionsActions.save()
  }

  handleClusterNetworkStartIpChange(ip) {
    OptionsActions.updateClusterNetworkStartIp(ip)
    OptionsActions.save()
  }

  handleClusterNetworkEndIpChange(ip) {
    OptionsActions.updateClusterNetworkEndIp(ip)
    OptionsActions.save()
  }

  handleServiceNetworkStartIpChange(ip) {
    OptionsActions.updateServiceNetworkStartIp(ip)
    OptionsActions.save()
  }

  handleServiceNetworkEndIpChange(ip) {
    OptionsActions.updateServiceNetworkEndIp(ip)
    OptionsActions.save()
  }

  handleIngressToggle(toggled) {
    OptionsActions.updateIngressToggle(toggled)
    OptionsActions.save()
  }

  handleHelmToggle(toggled) {
    OptionsActions.updateHelmToggle(toggled)
    OptionsActions.save()
  }

  handleRegistryToggle(toggled) {
    OptionsActions.updateRegistryToggle(toggled)
    OptionsActions.save()
  }

  handleNodeSelection(selection) {
    NodesActions.updateSelection(selection)
    NodesActions.save()
  }

  handleNodeIsMasterToggle(node: Node, toggled) {
    let newNode = new Node(node)
    newNode.isMaster = toggled
    NodesActions.update(newNode)
    NodesActions.save()
  }

  handleNodeIsNodeToggle(node, toggled) {
    let newNode = new Node(node)
    newNode.isNode = toggled
    NodesActions.update(newNode)
    NodesActions.save()
  }

  handleNewNodeClick() {
    this.setState({ showNodeModal: true, selectedNode: null })
  }

  handleDeleteSelection() {
    NodesActions.deleteSelection()
    NodesActions.save()
  }

  handleNodeModalClose() {
    this.setState({ showNodeModal: false })
  }

  handleAddNodeClick(node: Node) {
    NodesActions.validate(node).promise.then(() => {
      NodesActions.add(node)
      NodesActions.save()
      this.setState({ showNodeModal: false })
    })
  }

  handleEditNodeClick(node: Node) {
    NodesActions.validate(node).promise.then(() => {
      NodesActions.update(node)
      NodesActions.save()
      this.setState({ showNodeModal: false })
    })
  }

  handleNodeMoreClick(selectedNode: Node) {
    this.setState({ showNodeModal: true, selectedNode })
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
                onNodeMoreClick={node => { this.handleNodeMoreClick(node) }}
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
            {this.state.showNodeModal ? (
              <NodeModal
                onCancelClick={() => this.handleNodeModalClose()}
                onAddNodeClick={node => this.handleAddNodeClick(node)}
                onEditNodeClick={node => this.handleEditNodeClick(node)}
                node={this.state.selectedNode}
                isEditMode={this.state.selectedNode !== null}
                validating={this.props.nodesValidating}
              />
            ) : null}
          </Wrapper>
      )}
      />
    )
  }
}

export default connectToStores(HomePage)
