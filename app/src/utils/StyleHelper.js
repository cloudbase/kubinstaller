import { css } from 'styled-components'

class StyleHelper {
  static exactWidth = width => {
    return css`
      min-width: ${width};
      max-width: ${width};
    `
  }
}

export default StyleHelper
