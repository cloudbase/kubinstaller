// @flow

import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: blue;
`

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <Wrapper>Home</Wrapper>
    )
  }
}
