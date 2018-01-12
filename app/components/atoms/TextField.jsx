import React from 'react'
import TextField from 'material-ui/TextField'
import Palette from '../../utils/Palette'

class TextFieldStyled extends React.Component {
  render() {
    return (
      <TextField
        {...this.props}
        floatingLabelFixed
        floatingLabelFocusStyle={{ color: Palette.focusColor }}
        floatingLabelStyle={{ color: Palette.grayscale[1] }}
        underlineStyle={{ borderColor: Palette.grayscale[2] }}
        underlineFocusStyle={{ borderColor: Palette.focusColor }}
        fullWidth
      />
    )
  }
}

export default TextFieldStyled
