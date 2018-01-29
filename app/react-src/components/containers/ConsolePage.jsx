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

import React from 'react'
import styled from 'styled-components'
import LinearProgress from 'material-ui/LinearProgress'

import MainTemplate from './MainTemplate'
import Console from '../organisms/Console'

const ProgressBarHeight = 3
const Wrapper = styled.div``
const LinearProgressStyled = styled(LinearProgress)`
  z-index: 1;
`

type Props = {}
type State = {
  progress: number,
}
class ConsolePage extends React.Component<Props, State> {
  state = {
    progress: 50,
  }

  render() {
    return (
      <MainTemplate
        progressBarHeight={ProgressBarHeight}
        body={(
          <Wrapper>
            <LinearProgressStyled
              style={{ height: ProgressBarHeight }}
              mode="determinate"
              value={this.state.progress}
            />
            <Console />
          </Wrapper>
        )}
      />
    )
  }
}

export default ConsolePage
