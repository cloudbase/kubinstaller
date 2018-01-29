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
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 890px;
  background: #353746;
  padding: 22px 28px;
`

type Props = {
  className?: string,
  state: 'cancel' | 'deploy',
}
class Footer extends React.Component<Props> {
  render() {
    return (
      <Wrapper className={this.props.className}>
        {this.props.state === 'deploy' ? (
          <Link to="/console">
            <RaisedButton label="DEPLOY" primary style={{ width: '164px' }} />
          </Link>
        ) : (
          <Link to="/">
            <FlatButton label="Cancel" style={{ color: '#FFFFFF' }} />
          </Link>
        )}
      </Wrapper>
    )
  }
}

export default Footer
