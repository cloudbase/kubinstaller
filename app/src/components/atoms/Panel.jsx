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
const Body = styled.div`
  ${props => props.noPadding ? '' : 'padding: 22px 20px;'}
`

type Props = {
  children: React.Node,
  title: string,
  className: string,
  noPadding?: boolean,
}

class Panel extends React.Component<Props> {
  render() {
    return (
      <Wrapper className={this.props.className}>
        <Title>{this.props.title}</Title>
        <Body noPadding={this.props.noPadding}>{this.props.children}</Body>
      </Wrapper>
    )
  }
}

export default Panel
