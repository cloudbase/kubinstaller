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

class Header extends React.Component {
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
