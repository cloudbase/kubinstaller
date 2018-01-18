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

import MuiTheme from '../../utils/MuiTheme'

const Wrapper = styled.div`
  background: white;
  border: 1px solid ${MuiTheme.palette.borderColor};
  position: relative;
`
const Title = styled.div`
  padding: 22px 20px;
  font-size: 20px;
  border-bottom: 1px solid ${MuiTheme.palette.borderColor};
`
const Body = styled.div``

type Props = {
  children: React.Node,
  title: string,
  className: string,
  panelBodyStyle?: any,
}

class Panel extends React.Component<Props> {
  render() {
    return (
      <Wrapper className={this.props.className}>
        <Title>{this.props.title}</Title>
        <Body style={this.props.panelBodyStyle}>{this.props.children}</Body>
      </Wrapper>
    )
  }
}

export default Panel
