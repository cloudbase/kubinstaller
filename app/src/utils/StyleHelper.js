// @flow

import { css } from 'styled-components'

class StyleHelper {
  static exactWidth = (width: string) => {
    return css`
      min-width: ${width};
      max-width: ${width};
    `
  }
  static exactHeight = (height: string) => {
    return css`
      min-height: ${height};
      max-height: ${height};
    `
  }
  static exactSize = (size: string) => {
    return [...StyleHelper.exactWidth(size), ...StyleHelper.exactHeight(size)]
  }
  static fontWeights = {
    light: 'font-weight: 300;',
    medium: 'font-weight: 500;',
  }
}

export default StyleHelper
