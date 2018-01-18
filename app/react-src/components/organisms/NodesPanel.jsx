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
import TextEllipsis from '../atoms/TextEllipsis'

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
  onDeleteSelection: () => void,
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
            <ActionDelete
              color={MuiTheme.palette.accent3Color}
              style={{ cursor: 'pointer' }}
              onClick={this.props.onDeleteSelection}
            />
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
                <TableRowColumn>
                  <TextEllipsis>{node.host}</TextEllipsis>
                </TableRowColumn>
                <TableRowColumn>
                  <TextEllipsis>{node.os}</TextEllipsis>
                </TableRowColumn>
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
