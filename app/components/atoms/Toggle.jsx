import React from 'react'
import Toggle from 'material-ui/Toggle'

import Palette from '../../utils/Palette'

class ToggleStyled extends React.Component {
  render() {
    return (
      <Toggle
        {...this.props}
        thumbSwitchedStyle={{ backgroundColor: Palette.primary }}
        trackSwitchedStyle={{ backgroundColor: '#96CBEE' }}
      />
    )
  }
}

export default ToggleStyled
