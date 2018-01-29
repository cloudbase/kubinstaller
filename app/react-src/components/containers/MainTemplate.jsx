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

import Header from '../atoms/Header'
import Footer from '../molecules/Footer'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const Body = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  margin-top: -${props => props.progressBarHeight}px;
`
const HeaderStyled = styled(Header)`
  flex-shrink: 0;
`
const FooterStyled = styled(Footer)`
  flex-shrink: 0;
`

type Props = {
  body: React.Node,
  progressBarHeight?: number,
  footerState: 'cancel' | 'deploy',
}

class MainTemplate extends React.Component<Props> {
  static defaultProps = {
    progressBarHeight: 0,
  }

  componentWillMount() {
    if (!document.body) {
      return
    }
    // we are setting this 'universal' style on component mount so it doesn't interfere with
    // splash screen's transparent background
    document.body.style.background = '#EEF0F3'
  }

  render() {
    return (
      <Wrapper>
        <HeaderStyled />
        <Body progressBarHeight={this.props.progressBarHeight}>{this.props.body}</Body>
        <FooterStyled state={this.props.footerState} />
      </Wrapper>
    )
  }
}

export default MainTemplate
