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
import styled, { css } from 'styled-components'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import Node from '../../models/Node'
import Credentials from '../../models/Credentials'
import theme from '../../utils/MuiTheme'

const Wrapper = styled.div``
const GroupLabel = styled.div`
  font-size: 12px;
  color: ${theme.palette.border2Color}};
  margin-bottom: 8px;
`
const Group = styled.div`
  margin-top: 16px;
  ${props => props.flex ? css`
    display: flex;
    margin-left: -16px;
    > div {
      margin-left: 16px;
    }
  ` : ''}
`
const ValidationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
`
const ValidationMessage = styled.div`
  font-size: 16px;
  color: black;
  margin-top: 28px;
`

type Props = {
  onCancelClick: () => void,
  onAddNodeClick: (node: Node) => void,
  onEditNodeClick: (node: Node) => void,
  node: ?Node,
  isEditMode: boolean,
  validating: boolean,
}
type State = {
  node: Node,
  hostErrorText: string,
  usernameErrorText: string,
  passwordErrorText: string,
  sshKeyErrorText: string,
}

class NodeModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      node: props.node || new Node(),
      hostErrorText: '',
      usernameErrorText: '',
      passwordErrorText: '',
      sshKeyErrorText: '',
    }
  }

  validate(): boolean {
    let valid = true
    let hostErrorText = ''
    let usernameErrorText = ''
    let passwordErrorText = ''
    let sshKeyErrorText = ''
    const requiredMessage = 'This field is required!'

    if (!this.state.node.host) {
      valid = false
      hostErrorText = requiredMessage
    }

    if (!this.state.node.credentials.username) {
      valid = false
      usernameErrorText = requiredMessage
    }

    if (!this.state.node.credentials.password) {
      valid = false
      passwordErrorText = requiredMessage
    }

    if (!this.state.node.sshKey) {
      valid = false
      sshKeyErrorText = requiredMessage
    }

    this.setState({
      hostErrorText,
      usernameErrorText,
      passwordErrorText,
      sshKeyErrorText,
    })

    return valid
  }

  handleHostChange(host: string) {
    const node = new Node(this.state.node)
    node.host = host
    this.setState({ node })
  }

  handleOsChange(os: 'linux' | 'windows') {
    const node = new Node(this.state.node)
    node.os = os
    this.setState({ node })
  }

  handleUsernameChange(username: string) {
    const node = new Node(this.state.node)
    node.credentials = new Credentials(username, node.credentials.password)
    this.setState({ node })
  }

  handlePasswordChange(password: string) {
    const node = new Node(this.state.node)
    node.credentials = new Credentials(node.credentials.username, password)
    this.setState({ node })
  }

  handleSshKeyChange(sshKey: string) {
    const node = new Node(this.state.node)
    node.sshKey = sshKey
    this.setState({ node })
  }

  handleAddNode() {
    if (!this.validate()) {
      return
    }

    this.props.onAddNodeClick(new Node(this.state.node))
  }

  handleEditNode() {
    if (!this.validate()) {
      return
    }

    this.props.onEditNodeClick(new Node(this.state.node))
  }

  rendeValidating() {
    if (!this.props.validating) {
      return null
    }

    return (
      <ValidationWrapper>
        <CircularProgress size={60} thickness={6} />
        <ValidationMessage>Validating Node</ValidationMessage>
      </ValidationWrapper>
    )
  }

  renderForm() {
    if (this.props.validating) {
      return null
    }

    return (
      <Wrapper>
        <TextField
          floatingLabelText="Hostname"
          fullWidth
          value={this.state.node.host}
          errorText={this.state.hostErrorText}
          onChange={e => { this.handleHostChange(e.target.value) }}
        />
        <Group>
          <GroupLabel>Connection</GroupLabel>
          <RadioButtonGroup
            name="os"
            valueSelected={this.state.node.os}
            onChange={(event, os) => { this.handleOsChange(os) }}
          >
            <RadioButton
              value="linux"
              label="SSH (Linux)"
              style={{ marginBottom: '16px' }}
            />
            <RadioButton
              value="windows"
              label="WinRM (Windows)"
            />
          </RadioButtonGroup>
        </Group>
        <Group flex>
          <TextField
            floatingLabelText="Username"
            errorText={this.state.usernameErrorText}
            value={this.state.node.credentials.username}
            onChange={(event) => { this.handleUsernameChange(event.target.value) }}
          />
          <TextField
            floatingLabelText="Password"
            type="password"
            errorText={this.state.passwordErrorText}
            value={this.state.node.credentials.password}
            onChange={(event) => { this.handlePasswordChange(event.target.value) }}
          />
        </Group>
        <Group>
          <TextField
            floatingLabelText="SSH Public Key"
            fullWidth
            multiLine
            rows={2}
            rowsMax={2}
            errorText={this.state.sshKeyErrorText}
            value={this.state.node.sshKey}
            onChange={(event) => { this.handleSshKeyChange(event.target.value) }}
          />
        </Group>
      </Wrapper>
    )
  }

  render() {
    const modalActions = [(
      <FlatButton
        label="Cancel"
        style={{ color: theme.palette.primary1Color }}
        onClick={() => { this.props.onCancelClick() }}
      />
    ), (
      <FlatButton
        label={`${this.props.isEditMode ? 'Update' : 'Add'} Node`}
        style={{ color: theme.palette.primary1Color }}
        onClick={() => {
          if (this.props.isEditMode) {
            this.handleEditNode()
          } else {
            this.handleAddNode()
          }
        }}
      />
      )]

    const title = this.props.isEditMode ? 'Update Kubernetes Node' : 'Add a new Kubernetes Node'

    return (
      <Dialog
        modal
        open
        title={title}
        contentStyle={{ width: '568px' }}
        actions={this.props.validating ? [modalActions[0]] : modalActions}
      >
        {this.renderForm()}
        {this.rendeValidating()}
      </Dialog>
    )
  }
}

export default NodeModal
