// @flow

import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { injectGlobal } from 'styled-components'
import Fonts from './atoms/Fonts'

injectGlobal`
  ${Fonts}
  body {
    margin: 0;
    font-family: Roboto;
    font-size: 14px;
  }
`

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <MuiThemeProvider>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}