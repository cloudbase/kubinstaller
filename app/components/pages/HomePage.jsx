import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores'

import HomeStore from '../../stores/HomeStore'
import Home from '../organisms/Home'
import HomeActions from '../../actions/HomeActions'

type Props = {
  array: Array,
};

class HomePage extends React.Component<Props> {
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
    return <Home array={this.props.array} onAddClick={() => { this.handleAddClick() }} />
  }
}

export default connectToStores(HomePage)
