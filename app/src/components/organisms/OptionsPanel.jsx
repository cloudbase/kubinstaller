// @flow

import React from 'react'
import styled from 'styled-components'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'

import MuiTheme from '../../utils/MuiTheme'
import StyleHelper from '../../utils/StyleHelper'
import NetworkDriver from '../../models/NetworkDriver'
import Panel from '../atoms/Panel'

const PanelStyled = styled(Panel)`
  ${StyleHelper.exactWidth('300px')}
`
const NetworkDriverWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -18px;
  margin-right: -18px;
`
const NetworkDriverLabel = styled.div``
const IpRanges = styled.div`
  margin: 18px 0;
`
const Group = styled.div`
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0px;
  }
`
const GroupLabel = styled.div`
  font-size: 12px;
  color: ${MuiTheme.palette.border2Color}};
  margin-bottom: 3px;
`
const IpRange = styled.div`
  display: flex;
  margin-left: -12px;
  & > div {
    margin-left: 12px;
  }
`
const Option = styled.div`
  padding: 12px 0;
  border-top: 1px solid ${MuiTheme.palette.borderColor};
  &:last-child {
    padding-bottom: 0;
  }
`

type Props = {
  networkDrivers: Array<NetworkDriver>,
  selectedNetworkDriver: string,
  onNetworkDriverChange: (_: NetworkDriver) => void,
  clusterNetworkStartIp: string,
  clusterNetworkEndIp: string,
  onClusterNetworkStartIpChange: (_: string) => void,
  onClusterNetworkEndIpChange: (_: string) => void,
  serviceNetworkStartIp: string,
  serviceNetworkEndIp: string,
  onServiceNetworkStartIpChange: (_: string) => void,
  onServiceNetworkEndIpChange: (_: string) => void,
  ingressToggled: boolean,
  onIngressToggle: (_: boolean) => void,
  helmToggled: boolean,
  onHelmToggle: (_: boolean) => void,
  registryToggled: boolean,
  onRegistryToggle: (_: boolean) => void,
}

class OptionsPanel extends React.Component<Props> {
  render() {
    return (
      <PanelStyled title="Options">
        <NetworkDriverWrapper>
          <NetworkDriverLabel>Network Driver</NetworkDriverLabel>
          <DropDownMenu
            value={this.props.selectedNetworkDriver}
            labelStyle={{ color: MuiTheme.palette.primary1Color }}
            onChange={(e, i, value: NetworkDriver) => { this.props.onNetworkDriverChange(value) }}
          >
            {this.props.networkDrivers.map(driver => (
              <MenuItem key={driver.name} value={driver.name} primaryText={driver.name} />
            ))}
          </DropDownMenu>
        </NetworkDriverWrapper>
        <IpRanges>
          <Group>
            <GroupLabel>Cluster Network Range</GroupLabel>
            <IpRange>
              <TextField
                floatingLabelText="Start IP"
                floatingLabelFixed
                fullWidth
                value={this.props.clusterNetworkStartIp}
                onChange={e => { this.props.onClusterNetworkStartIpChange(e.target.value) }}
              />
              <TextField
                floatingLabelText="End IP"
                floatingLabelFixed
                fullWidth
                value={this.props.clusterNetworkEndIp}
                onChange={e => { this.props.onClusterNetworkEndIpChange(e.target.value) }}
              />
            </IpRange>
          </Group>
          <Group>
            <GroupLabel>Service Network Range</GroupLabel>
            <IpRange>
              <TextField
                floatingLabelText="Start IP"
                floatingLabelFixed
                fullWidth
                value={this.props.serviceNetworkStartIp}
                onChange={e => { this.props.onServiceNetworkStartIpChange(e.target.value) }}
              />
              <TextField
                floatingLabelText="End IP"
                floatingLabelFixed
                fullWidth
                value={this.props.serviceNetworkEndIp}
                onChange={e => { this.props.onServiceNetworkEndIpChange(e.target.value) }}
              />
            </IpRange>
          </Group>
        </IpRanges>
        <Option>
          <Toggle
            label="Ingress"
            toggled={this.props.ingressToggled}
            onToggle={(e, isToggled) => { this.props.onIngressToggle(isToggled) }}
          />
        </Option>
        <Option>
          <Toggle
            label="Helm"
            toggled={this.props.helmToggled}
            onToggle={(e, isToggled) => { this.props.onHelmToggle(isToggled) }}
          />
        </Option>
        <Option>
          <Toggle
            label="Registry"
            toggled={this.props.registryToggled}
            onToggle={(e, isToggled) => { this.props.onRegistryToggle(isToggled) }}
          />
        </Option>
      </PanelStyled>
    )
  }
}

export default OptionsPanel
