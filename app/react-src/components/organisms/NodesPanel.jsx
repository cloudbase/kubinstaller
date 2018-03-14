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
import { observer } from 'mobx-react'
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
import ActionDelete from 'material-ui/svg-icons/action/delete'
import MoreVert from 'material-ui/svg-icons/navigation/more-vert'

import Node from '../../models/Node'
import MuiTheme from '../../utils/MuiTheme'
import Panel from '../atoms/Panel'
import TextEllipsis from '../atoms/TextEllipsis'

const PanelStyled = styled(Panel)`
  width: 100%;
  min-width: 565px;
`
const FloatingActionButtonStyled = styled(FloatingActionButton)`
  position: fixed;
  bottom: 100px;
  right: 350px;
  z-index: 100;
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
const MoreVertStyled = styled(MoreVert)`
  cursor: pointer;
`

type Props = {
  nodes: Array<Node>,
  selectedNodes: Array<number>,
  onNodeSelection: (selection: string | number[]) => void,
  onNodeIsMasterToggle: (node: Node, toggled: boolean) => void,
  onNodeIsNodeToggle: (node: Node, toggled: boolean) => void,
  onNewNodeClick: () => void,
  onDeleteSelection: () => void,
  onNodeMoreClick: (node: Node) => void,
}
type State = {
  tableHeight: string,
}

const colStyles = [{ width: '20%' }, { width: '30%' }, { width: '20%' }, { width: '20%' }, { width: '32px' }]
@observer
class NodesPanel extends React.Component<Props, State> {
  state = {
    tableHeight: '',
  }

  componentWillMount() {
    this.updateTableHeight()
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  bodyRef: HTMLElement

  handleResize() {
    this.updateTableHeight()
  }

  updateTableHeight() {
    if (!this.bodyRef) {
      setTimeout(() => { this.updateTableHeight() }, 0)
      return
    }

    this.setState({ tableHeight: `${this.bodyRef.offsetHeight - 70}px` })
  }

  render() {
    return (
      <PanelStyled title="Nodes" bodyRef={ref => { this.bodyRef = ref }}>
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
          height={this.state.tableHeight}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={colStyles[0]}>Host</TableHeaderColumn>
              <TableHeaderColumn style={colStyles[1]}>OS</TableHeaderColumn>
              <TableHeaderColumn style={colStyles[2]}>Master</TableHeaderColumn>
              <TableHeaderColumn style={colStyles[3]}>Node</TableHeaderColumn>
              <TableHeaderColumn style={colStyles[4]} />
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.props.nodes.map((node: Node, i: number) => ((
              <TableRow
                key={node.id}
                selected={this.props.selectedNodes.findIndex(rowIndex => rowIndex === i) > -1}
              >
                <TableRowColumn style={colStyles[0]}>
                  <TextEllipsis>{node.host}</TextEllipsis>
                </TableRowColumn>
                <TableRowColumn style={colStyles[1]}>
                  <TextEllipsis>{node.os}</TextEllipsis>
                </TableRowColumn>
                <TableRowColumn style={colStyles[2]}>
                  <Toggle
                    toggled={node.isMaster}
                    onClick={e => { e.stopPropagation() }}
                    onToggle={(e, toggled: boolean) => { this.props.onNodeIsMasterToggle(node, toggled) }}
                  />
                </TableRowColumn>
                <TableRowColumn style={colStyles[3]}>
                  <Toggle
                    toggled={node.isNode}
                    onClick={e => { e.stopPropagation() }}
                    onToggle={(e, toggled) => { this.props.onNodeIsNodeToggle(node, toggled) }}
                  />
                </TableRowColumn>
                <TableRowColumn style={colStyles[4]}>
                  <MoreVertStyled
                    onClick={e => { e.stopPropagation(); this.props.onNodeMoreClick(node) }}
                    color="#4C4D51"
                  />
                </TableRowColumn>
              </TableRow>
            )))}
          </TableBody>
        </Table>
        <FloatingActionButtonStyled
          onClick={() => { this.props.onNewNodeClick() }}
        ><ContentAdd />
        </FloatingActionButtonStyled>
      </PanelStyled>
    )
  }
}

export default NodesPanel
