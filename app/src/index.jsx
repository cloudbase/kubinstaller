import * as React from 'react'
import { render } from 'react-dom'
import { Switch, Route, Router } from 'react-router'
import { createHashHistory } from 'history'
import { AppContainer } from 'react-hot-loader'

import App from './components/App'
import HomePage from './components/containers/HomePage'

let history = createHashHistory()
const renderApp = () => {
  render(
    <AppContainer>
      <App>
        <Router history={history}>
          <Switch>
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </App>
    </AppContainer>,
    document.getElementById('root')
  )
}

renderApp()

if (module.hot) {
  module.hot.accept('./components/App', () => {
    require('./components/App')
    renderApp()
  })
}
