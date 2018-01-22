/*
Copyright 2018 Cloudbase Solutions Srl

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import * as React from 'react'
import { render } from 'react-dom'
import { Switch, Route, Router } from 'react-router'
import { createHashHistory } from 'history'
import { AppContainer } from 'react-hot-loader'

import App from './components/App'
import HomePage from './components/containers/HomePage'
import Splash from './components/organisms/Splash'

let history = createHashHistory()
const renderApp = () => {
  render(
    <AppContainer>
      <App>
        <Router history={history}>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/splash" component={Splash} />
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
