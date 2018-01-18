import React from 'react'

const isFunction = x => typeof x === 'function'
const eachObject = (f, o) => {
  o.forEach((from) => {
    Object.keys(Object(from)).forEach((key) => {
      f(key, from[key])
    })
  })
}
const assign = (target, ...source) => {
  eachObject((key, value) => { target[key] = value }, source)
  return target
}

function connectToStores(Spec, Component = Spec) {
  if (!isFunction(Spec.getStores)) {
    throw new Error('connectToStores() expects the wrapped component to have a static getStores() method')
  }
  if (!isFunction(Spec.getPropsFromStores)) {
    throw new Error('connectToStores() expects the wrapped component to have a static getPropsFromStores() method')
  }

  class StoreConnection extends React.Component {
    constructor(props) {
      super(props)
      this.state = Spec.getPropsFromStores(props, this.context)
    }

    componentDidMount() {
      const stores = Spec.getStores(this.props, this.context)
      this.storeListeners = stores.map((store) => {
        return store.listen(this.onChange.bind(this))
      })
      if (Spec.componentDidConnect) {
        Spec.componentDidConnect(this.props, this.context)
      }
    }

    componentWillReceiveProps(nextProps) {
      this.setState(Spec.getPropsFromStores(nextProps, this.context))
    }

    componentWillUnmount() {
      this.storeListeners.forEach(unlisten => unlisten())
    }

    onChange() {
      this.setState(Spec.getPropsFromStores(this.props, this.context))
    }

    render() {
      return React.createElement(
        Component,
        assign({}, this.props, this.state)
      )
    }
  }

  return StoreConnection
}

export default connectToStores