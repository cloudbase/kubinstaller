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
import TextField from 'material-ui/TextField'

import Node from '../../models/Node'

const Wrapper = styled.div``

type Props = {}
type State = {
  node: Node,
}

class NodeComponent extends React.Component<Props, State> {
  state = {
    node: new Node(),
  }

  handleHostChange(host: string) {
    this.setState({
      node: new Node({
        ...this.state.node,
        host,
      }),
    })
  }

  render() {
    return (
      <Wrapper>
        <TextField
          floatingLabelText="Hostname"
          floatingLabelFixed
          fullWidth
          value={this.state.node.host}
          onChange={e => { this.handleHostChange(e.target.value) }}
        />
      </Wrapper>
    )
  }
}

export default NodeComponent
