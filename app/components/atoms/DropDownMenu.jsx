import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'

import Palette from '../../utils/Palette'

class DropDownMenuStyled extends React.Component {
  render() {
    return (
      <DropDownMenu
        {...this.props}
        labelStyle={{ color: Palette.primary }}
        underlineStyle={{ borderTop: 0 }}
        selectedMenuItemStyle={{ color: Palette.primary }}
      />
    )
  }
}

export default DropDownMenuStyled
