/*
Copyright (C) 2017  Cloudbase Solutions SRL
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MuiTheme from '../../utils/MuiTheme'

const Wrapper = styled.div`
  background: white;
  border: 1px solid ${MuiTheme.palette.borderColor};
  position: relative;
`
const Title = styled.div`
  padding: 22px 20px;
  font-size: 20px;
  border-bottom: 1px solid ${MuiTheme.palette.borderColor};
`
const Body = styled.div`
  ${props => props.noPadding ? '' : 'padding: 22px 20px;'}
`

class Panel extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    className: PropTypes.string,
    noPadding: PropTypes.bool,
  }

  render() {
    return (
      <Wrapper className={this.props.className}>
        <Title>{this.props.title}</Title>
        <Body noPadding={this.props.noPadding}>{this.props.children}</Body>
      </Wrapper>
    )
  }
}

export default Panel
