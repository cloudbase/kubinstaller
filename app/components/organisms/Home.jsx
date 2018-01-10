// @flow

import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: blue;
`

type Props = {
  array: Array,
  onAddClick: () => void,
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <Wrapper>
        {this.props.array.map(item => (
          <div key={item}>{item}</div>
        ))}
        <button onClick={this.props.onAddClick}>Add async</button>
      </Wrapper>
    )
  }
}
