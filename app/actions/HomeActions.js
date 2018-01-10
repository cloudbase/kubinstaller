import alt from '../alt'

class HomeActions {
  addItem(item) {
    return {
      item,
      promise: new Promise(resolve => {
        setTimeout(() => { resolve(item) }, 1000)
      }).then(
        item => { this.addItemFulfilled(item) },
        reason => { this.addItemRejected(reason) }
      ),
    }
  }

  addItemFulfilled(item) {
    return item
  }

  addItemRejected(reason) {
    return reason || true
  }
}

export default alt.createActions(HomeActions)
