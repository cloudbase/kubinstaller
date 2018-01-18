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
  margin-bottom: 52px;
`
const Logo = styled.div`
  ${StyleHelper.exactSize('77px')}
  background: url('${logo}') center no-repeat;
`
const Text = styled.div`
  margin-left: 12px;
`
const Name = styled.div`
  font-size: 41px;
  display: flex;
`
const NameLight = styled.div`
  ${StyleHelper.fontWeights.light};
`
const NameBold = styled.div`
  ${StyleHelper.fontWeights.medium};
`
const Description = styled.div`
  color: #5D5F6C;
`

type Props = {}
class Header extends React.Component<Props> {
  render() {
    return (
      <Wrapper>
        <Logo />
        <Text>
          <Name>
            <NameLight>kub</NameLight>
            <NameBold>installer</NameBold>
          </Name>
          <Description>The Kubernetes Cluster Installer</Description>
        </Text>
      </Wrapper>
    )
  }
}

export default Header
