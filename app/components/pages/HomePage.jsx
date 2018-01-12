import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import connectToStores from '../../utils/connectToStores'

import OptionsStore from '../../stores/OptionsStore'
import OptionsActions from '../../actions/OptionsActions'
import Header from '../atoms/Header'
import OptionsPanel from '../organisms/OptionsPanel'

const Wrapper = styled.div``

class HomePage extends React.Component {
  static propTypes = {
    networkDrivers: PropTypes.array,
    selectedNetworkDriver: PropTypes.string,
    clusterNetworkStartIp: PropTypes.string,
    clusterNetworkEndIp: PropTypes.string,
    serviceNetworkStartIp: PropTypes.string,
    serviceNetworkEndIp: PropTypes.string,
    ingressToggled: PropTypes.bool,
    helmToggled: PropTypes.bool,
    registryToggled: PropTypes.bool,
  }

  static getStores() {
    return [OptionsStore]
  }

  static getPropsFromStores() {
    let optionsStore = OptionsStore.getState()
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
    }
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

  render() {
    return (
      <Wrapper>
        <Header />
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
      </Wrapper>
    )
  }
}

export default connectToStores(HomePage)
