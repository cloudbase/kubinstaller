import alt from '../alt'

import HomeActions from '../actions/HomeActions'

class HomeStore {
  constructor() {
    this.array = ['OVS', 'Others']

    this.bindActions(HomeActions)
  }

  onAddItem({ item }) {
    console.log(`Adding item ... ${item}`) // eslint-disable-line no-console
  }

  onAddItemFulfilled(item) {
    console.log(`Item added ... ${item}`) // eslint-disable-line no-console
    this.array = [...this.array, item]
  }
}

export default alt.createStore(HomeStore)
