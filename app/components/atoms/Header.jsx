import React from 'react'
import styled from 'styled-components'

import logo from '../../resources/images/logo.svg'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 52px;
`
const Logo = styled.div`
  width: 72px;
  height: 72px;
  background: url('${logo}') center no-repeat;
`
const Text = styled.div`
  font-size: 35px;
  margin-left: 20px;
`

class Header extends React.Component {
  render() {
    return (
      <Wrapper>
        <Logo />
        <Text>kubinstaller</Text>
      </Wrapper>
    )
  }
}

export default Header
