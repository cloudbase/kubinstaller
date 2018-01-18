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

const Wrapper = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`

type Props = {
  children: React.Node,
}

class TextEllipsis extends React.Component<Props> {
  componentDidMount() {
    this.setTitle()

    window.addEventListener('resize', this.handleResize.bind(this))
  }

  componentDidUpdate() {
    this.setTitle()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  setTitle() {
    if (!this.wrapperRef) {
      return
    }

    if (this.wrapperRef.scrollWidth > this.wrapperRef.clientWidth) {
      this.wrapperRef.setAttribute('title', this.wrapperRef.textContent)
    } else {
      this.wrapperRef.setAttribute('title', '')
    }
  }

  handleResize() {
    this.setTitle()
  }

  wrapperRef: ?HTMLDivElement

  render() {
    return (
      <Wrapper innerRef={ref => { this.wrapperRef = ref }}>{this.props.children}</Wrapper>
    )
  }
}

export default TextEllipsis
