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

const Wrapper = styled.div`
  background: white;
  position: relative;
  padding-top: 24px;
  height: calc(100% - 24px);
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  padding: 22px 20px;
  font-size: 20px;
`
const Body = styled.div`
  height: 100%;
  overflow: auto;
`

type Props = {
  children: React.Node,
  title: string,
  className: string,
  panelBodyStyle?: any,
  bodyRef?: (ref: HTMLElement) => void,
}

class Panel extends React.Component<Props> {
  render() {
    return (
      <Wrapper className={this.props.className}>
        <Title>{this.props.title}</Title>
        <Body style={this.props.panelBodyStyle} innerRef={this.props.bodyRef}>{this.props.children}</Body>
      </Wrapper>
    )
  }
}

export default Panel
