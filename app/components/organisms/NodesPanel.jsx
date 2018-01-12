import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
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

import Panel from '../atoms/Panel'

const PanelStyled = styled(Panel)`
  width: 100%;
  min-width: 565px;
`
const FloatingActionButtonStyled = styled(FloatingActionButton)`
  position: absolute;
  top: -29px;
  right: 29px;
`

class NodesPanel extends React.Component {
  static propTypes = {
    nodes: PropTypes.array,
    selectedNodes: PropTypes.array,
    onNodeSelection: PropTypes.func,
    onNodeApiToggle: PropTypes.func,
    onNodeEnabledToggle: PropTypes.func,
    onNewNodeClick: PropTypes.func,
  }

  render() {
    return (
      <PanelStyled title="Nodes">
        <FloatingActionButtonStyled
          onClick={() => { this.props.onNewNodeClick() }}
        >
          <ContentAdd />
        </FloatingActionButtonStyled>
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
          <TableBody>
            {this.props.nodes.map((node, i) => ((
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
                    onToggle={(e, toggled) => { this.props.onNodeApiToggle(node, toggled) }}
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
