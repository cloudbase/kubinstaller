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

// @flow

import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import styled, { injectGlobal } from 'styled-components'

import Fonts from './atoms/Fonts'
import MuiTheme from '../utils/MuiTheme'

injectGlobal`
  ${Fonts}
  html, body, #root {
    height: 100%;
  }
  body {
    margin: 0;
    font-family: Roboto;
    font-size: 14px;
    color: #353746;
    -webkit-font-smoothing: antialiased;
  }
`
const Wrapper = styled.div`
  height: 100%;
`

type Props = {
  children: React.Node,
}

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MuiTheme)}>
        <Wrapper>
          {this.props.children}
        </Wrapper>
      </MuiThemeProvider>
    )
  }
}
