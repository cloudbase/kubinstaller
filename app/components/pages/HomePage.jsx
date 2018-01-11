import React from 'react'
import styled from 'styled-components'
import connectToStores from '../../utils/connectToStores'

import HomeStore from '../../stores/HomeStore'
import Header from '../atoms/Header'
import OptionsPanel from '../organisms/OptionsPanel'
import HomeActions from '../../actions/HomeActions'

const Wrapper = styled.div``

class HomePage extends React.Component {
  static getStores() {
    return [HomeStore]
  }

  static getPropsFromStores() {
    return {
      array: HomeStore.getState().array,
    }
  }

  handleAddClick() {
    HomeActions.addItem(`Item-${Math.random() * 100}`)
  }

  render() {
    return (
      <Wrapper>
        <Header />
        <OptionsPanel />
      </Wrapper>
    )
  }
}

export default connectToStores(HomePage)
