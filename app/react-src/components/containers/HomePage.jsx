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
import { observer } from 'mobx-react'

import OptionsStore from '../../stores/OptionsStore'
import NodesStore from '../../stores/NodesStore'
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

type State = {
  showNodeModal: boolean,
  selectedNode: ?Node,
}
@observer
class HomePage extends React.Component<{}, State> {
  state = {
    showNodeModal: false,
    selectedNode: null,
  }

  componentWillMount() {
    NodesStore.load()
    OptionsStore.load()
  }

  handleNetworkDriverChange(networkDriver: string) {
    OptionsStore.updateSelectedNetworkDriver(networkDriver)
    OptionsStore.save()
  }

  handleClusterNetworkStartIpChange(ip: string) {
    OptionsStore.updateClusterNetworkStartIp(ip)
    OptionsStore.save()
  }

  handleClusterNetworkEndIpChange(ip: string) {
    OptionsStore.updateClusterNetworkEndIp(ip)
    OptionsStore.save()
  }

  handleServiceNetworkStartIpChange(ip: string) {
    OptionsStore.updateServiceNetworkStartIp(ip)
    OptionsStore.save()
  }

  handleServiceNetworkEndIpChange(ip: string) {
    OptionsStore.updateServiceNetworkEndIp(ip)
    OptionsStore.save()
  }

  handleIngressToggle(toggled: boolean) {
    OptionsStore.updateIngressToggle(toggled)
    OptionsStore.save()
  }

  handleHelmToggle(toggled: boolean) {
    OptionsStore.updateHelmToggle(toggled)
    OptionsStore.save()
  }

  handleRegistryToggle(toggled: boolean) {
    OptionsStore.updateRegistryToggle(toggled)
    OptionsStore.save()
  }

  handleNodeSelection(selection: string | number[]) {
    NodesStore.updateSelection(selection)
    NodesStore.save()
  }

  handleNodeIsMasterToggle(node: Node, toggled: boolean) {
    let newNode = new Node(node)
    newNode.isMaster = toggled
    NodesStore.update(newNode)
    NodesStore.save()
  }

  handleNodeIsNodeToggle(node: Node, toggled: boolean) {
    let newNode = new Node(node)
    newNode.isNode = toggled
    NodesStore.update(newNode)
    NodesStore.save()
  }

  handleNewNodeClick() {
    this.setState({ showNodeModal: true, selectedNode: null })
  }

  handleDeleteSelection() {
    NodesStore.deleteSelection()
    NodesStore.save()
  }

  handleNodeModalClose() {
    this.setState({ showNodeModal: false })
  }

  handleAddNodeClick(node: Node) {
    NodesStore.validate(node).then(() => {
      NodesStore.add(node)
      NodesStore.save()
      this.setState({ showNodeModal: false })
    })
  }

  handleEditNodeClick(node: Node) {
    NodesStore.validate(node).then(() => {
      NodesStore.update(node)
      NodesStore.save()
      this.setState({ showNodeModal: false })
    })
  }

  handleNodeMoreClick(selectedNode: Node) {
    this.setState({ showNodeModal: true, selectedNode })
  }

  render() {
    return (
      <MainTemplate
        footerState="deploy"
        body={(
          <Wrapper>
            <Panels>
              <NodesPanel
                nodes={NodesStore.nodes}
                selectedNodes={NodesStore.selectedNodes}
                onNodeSelection={selection => { this.handleNodeSelection(selection) }}
                onNodeIsMasterToggle={(node: Node, toggled) => { this.handleNodeIsMasterToggle(node, toggled) }}
                onNodeIsNodeToggle={(node, toggled) => { this.handleNodeIsNodeToggle(node, toggled) }}
                onNewNodeClick={() => { this.handleNewNodeClick() }}
                onDeleteSelection={() => { this.handleDeleteSelection() }}
                onNodeMoreClick={node => { this.handleNodeMoreClick(node) }}
              />
              <OptionsPanel
                networkDrivers={OptionsStore.networkDrivers}
                selectedNetworkDriver={OptionsStore.selectedNetworkDriver}
                onNetworkDriverChange={name => { this.handleNetworkDriverChange(name) }}
                clusterNetworkStartIp={OptionsStore.clusterNetworkStartIp}
                clusterNetworkEndIp={OptionsStore.clusterNetworkEndIp}
                onClusterNetworkStartIpChange={v => { this.handleClusterNetworkStartIpChange(v) }}
                onClusterNetworkEndIpChange={v => { this.handleClusterNetworkEndIpChange(v) }}
                serviceNetworkStartIp={OptionsStore.serviceNetworkStartIp}
                serviceNetworkEndIp={OptionsStore.serviceNetworkEndIp}
                onServiceNetworkStartIpChange={v => { this.handleServiceNetworkStartIpChange(v) }}
                onServiceNetworkEndIpChange={v => { this.handleServiceNetworkEndIpChange(v) }}
                ingressToggled={OptionsStore.ingressToggled}
                onIngressToggle={v => { this.handleIngressToggle(v) }}
                helmToggled={OptionsStore.helmToggled}
                onHelmToggle={v => { this.handleHelmToggle(v) }}
                registryToggled={OptionsStore.registryToggled}
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
                validating={NodesStore.validating}
              />
            ) : null}
          </Wrapper>
      )}
      />
    )
  }
}

export default HomePage
