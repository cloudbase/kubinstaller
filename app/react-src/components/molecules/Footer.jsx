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
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 890px;
  background: #353746;
  padding: 22px 28px;
`
const RaisedButtons = styled.div``
const FlatButtons = styled.div``

type Props = {
  className?: string,
}
class Footer extends React.Component<Props> {
  render() {
    return (
      <Wrapper className={this.props.className}>
        <FlatButtons>
          <Link to="/console">
            <FlatButton label="CLI" style={{ marginRight: '32px', color: 'white' }} />
          </Link>
          <Link to="/">
            <FlatButton label="DASHBOARD" style={{ color: 'white' }} />
          </Link>
        </FlatButtons>
        <RaisedButtons>
          <RaisedButton label="DEPLOY" primary style={{ width: '164px' }} />
        </RaisedButtons>
      </Wrapper>
    )
  }
}

export default Footer
