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

import React from 'react'
import styled from 'styled-components'

import logo from '../../resources/images/logo.svg'
import StyleHelper from '../../utils/StyleHelper'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: #DFE3E9;
  padding: 36px 24px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.26);
  position: relative;
  z-index: 1;
`
const Logo = styled.div`
  ${StyleHelper.exactSize('77px')}
  background: url('${logo}') center no-repeat;
`
const Text = styled.div`
  margin-left: 12px;
`
const Name = styled.div`
  font-size: 47px;
  display: flex;
`
const NameLight = styled.div`
  ${StyleHelper.fontWeights.light};
`
const NameBold = styled.div`
  ${StyleHelper.fontWeights.medium};
`

type Props = {
  className?: string,
}
class Header extends React.Component<Props> {
  render() {
    return (
      <Wrapper className={this.props.className}>
        <Logo />
        <Text>
          <Name>
            <NameLight>kub</NameLight>
            <NameBold>installer</NameBold>
          </Name>
        </Text>
      </Wrapper>
    )
  }
}

export default Header
