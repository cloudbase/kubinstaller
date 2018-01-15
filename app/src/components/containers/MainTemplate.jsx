import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
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

class MainTemplate extends React.Component {
  static propTypes = {
    body: PropTypes.node,
  }

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
