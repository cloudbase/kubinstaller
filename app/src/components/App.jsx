// @flow

import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { injectGlobal } from 'styled-components'

import Fonts from './atoms/Fonts'
import MuiTheme from '../utils/MuiTheme'

injectGlobal`
  ${Fonts}
  body {
    margin: 0;
    font-family: Roboto;
    font-size: 14px;
    color: #353746;
    background: #EEF0F3;
    padding: 60px 48px 48px 48px;
    -webkit-font-smoothing: antialiased;
  }
`

type Props = {
  children: React.Node,
}

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MuiTheme)}>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}
