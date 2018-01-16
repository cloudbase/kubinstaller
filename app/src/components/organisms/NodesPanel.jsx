// @flow

import * as React from 'react'
import styled from 'styled-components'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Toggle from 'material-ui/Toggle'
import FlatButton from 'material-ui/FlatButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'

import Node from '../../models/Node'
import MuiTheme from '../../utils/MuiTheme'
import Panel from '../atoms/Panel'

const PanelStyled = styled(Panel)`
  width: 100%;
  min-width: 565px;
`
const FloatingActionButtonStyled = styled(FloatingActionButton)`
  position: absolute;
  bottom: -28px;
  left: 28px;
`
const SelectionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${MuiTheme.palette.primary2Color};
  padding: 16px 26px;
`
const SelectionInfoText = styled.div`
  font-size: 12px;
  color: ${MuiTheme.palette.secondaryTextColor};
`

type Props = {
  nodes: Array<Node>,
  selectedNodes: Array<number>,
  onNodeSelection: () => void,
  onNodeApiToggle: (node: Node, toggled: boolean) => void,
  onNodeEnabledToggle: (node: Node, toggled: boolean) => void,
  onNewNodeClick: () => void,
}

class NodesPanel extends React.Component<Props> {
  render() {
    return (
      <PanelStyled title="Nodes" noPadding>
        <FloatingActionButtonStyled
          onClick={() => { this.props.onNewNodeClick() }}
        >
          <ContentAdd />
        </FloatingActionButtonStyled>
        {this.props.selectedNodes.length > 0 ? (
          <SelectionInfo>
            <SelectionInfoText>{this.props.selectedNodes.length} item{this.props.selectedNodes.length > 1 ? 's' : ''} selected</SelectionInfoText>
            <ActionDelete color={MuiTheme.palette.accent3Color} style={{ cursor: 'pointer' }} />
          </SelectionInfo>
        ) : null}
        <Table
          multiSelectable
          enableSelectAll
          onRowSelection={this.props.onNodeSelection}
          height="336px"
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Host</TableHeaderColumn>
              <TableHeaderColumn>OS</TableHeaderColumn>
              <TableHeaderColumn>API</TableHeaderColumn>
              <TableHeaderColumn>Node</TableHeaderColumn>
              <TableHeaderColumn>Credentials</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.props.nodes.map((node: Node, i: number) => ((
              <TableRow
                key={node.id}
                selected={this.props.selectedNodes.findIndex(rowIndex => rowIndex === i) > -1}
              >
                <TableRowColumn>{node.host}</TableRowColumn>
                <TableRowColumn>{node.os}</TableRowColumn>
                <TableRowColumn>
                  <Toggle
                    toggled={node.api}
                    onClick={e => { e.stopPropagation() }}
                    onToggle={(e, toggled: boolean) => { this.props.onNodeApiToggle(node, toggled) }}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <Toggle
                    toggled={node.enabled}
                    onClick={e => { e.stopPropagation() }}
                    onToggle={(e, toggled) => { this.props.onNodeEnabledToggle(node, toggled) }}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <FlatButton
                    label="ADD"
                    primary
                    onClick={e => { e.stopPropagation() }}
                  />
                </TableRowColumn>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </PanelStyled>
    )
  }
}

export default NodesPanel
