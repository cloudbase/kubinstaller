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
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import Header from '../atoms/Header'

const Wrapper = styled.div``
const Body = styled.div``
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 53px;
`
const RaisedButtons = styled.div`
  & > div {
    margin-left: 32px;
  }
`
const FlatButtons = styled.div``

type Props = {
  body: React.Node,
}

class MainTemplate extends React.Component<Props> {
  render() {
    return (
      <Wrapper>
        <Header />
        <Body>{this.props.body}</Body>
        <Footer>
          <FlatButtons>
            <FlatButton label="CLI" style={{ marginRight: '32px' }} />
            <FlatButton label="DASHBOARD" />
          </FlatButtons>
          <RaisedButtons>
            <RaisedButton label="Exit" />
            <RaisedButton label="Go" primary />
          </RaisedButtons>
        </Footer>
      </Wrapper>
    )
  }
}

export default MainTemplate
