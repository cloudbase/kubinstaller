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

const Wrapper = styled.div`
  font-family: Courier;
  padding: 16px;
`
const Line = styled.div`
  margin-bottom: 8px;
`
const Username = styled.span`
  word-break: break-all;
  color: green;
`
const Path = styled.span`
  word-break: break-all;
  color: blue;
  margin-right: 8px;
`
const Text = styled.span`
  word-break: break-all;
  ${props => props.customStyle ? props.customStyle : ''}
`
const Cursor = styled.div`
  height: 16px;
  width: 8px;
  margin: 16px 0;
  background: #6D6D6D;
`
class StyledText {
  content: string
  style: any
  constructor(content: string, style?: string) {
    this.content = content
    this.style = style || ''
  }
}
class ConsoleLine {
  text: string | Array<StyledText | string>
  username: string
  path: string
}
type Props = {
  lines?: ConsoleLine[],
}
const line1 = new ConsoleLine()
line1.username = 'user@usersMacBookPro'
line1.path = '~/Projects/first'
line1.text = '2018-01-23 14:23:45.197 Electron[49929:1747795] *** WARNING: Textured window AtomNSWindow: is getting an implicitly transparent titlebar. This will break when linking against newer SDKs. Use NSWindow -titlebarAppearsTransparent=YES instead.'
const line2 = new ConsoleLine()
line2.username = 'user@usersMacBookPro'
line2.path = '~/Projects/second'
line2.text = '2018-01-23 14:23:45.197 Electron[49929:1747795] *** WARNING: Textured window AtomNSWindow: is getting an implicitly transparent titlebar. This will break when linking against newer SDKs. Use NSWindow -titlebarAppearsTransparent=YES instead.'
const line3 = new ConsoleLine()
line3.text = [
  '[53801:0123/145436.837886:',
  new StyledText('ERROR:CONSOLE', 'color: red'),
  '(852)] [object ErrorEvent], source: ',
  new StyledText('chrome-devtools://devtools/bundled/inspector.js', 'font-style: italic; color: gray;'),
  ' (852)',
]
class Console extends React.Component<Props> {
  renderText(text: string | Array<StyledText | string>) {
    if (text instanceof Array) {
      return text.map(t => {
        const style = typeof t === 'string' ? '' : t.style
        const content = typeof t === 'string' ? t : t.content
        return <Text customStyle={style}>{content}</Text>
      })
    }
    return text
  }

  render() {
    const lines = this.props.lines || [line1, line2, line3]

    return (
      <Wrapper>
        {lines.map(line => {
          return (
            <Line>
              {line.username ? <Username>{line.username}:</Username> : null}
              {line.path ? <Path>{line.path}$</Path> : null}
              <Text>{this.renderText(line.text)}</Text>
            </Line>
          )
        })}
        <Cursor />
      </Wrapper>
    )
  }
}

export default Console
