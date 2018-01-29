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

class Range {
  start: number
  end: number
  style: string

  constructor(start: number, end: number, style: string) {
    this.start = start
    this.end = end
    this.style = style
  }
}

const span = (text: string, style: string = ''): string => {
  return `<span ${style ? `style=${style}` : ''}>${text}</span>`
}

export default class StyledString {
  text: string
  ranges: Range[]

  constructor(text: string) {
    this.text = text
    this.ranges = []
  }

  range(start: number, end: number, style: string) {
    let range = new Range(start, end, style)
    this.ranges.push(range)
  }

  toHtml(): string {
    this.ranges.sort((r1, r2) => r1.start - r2.start)
    let htmlString = span(this.text.substring(0, this.ranges[0].start))
    this.ranges.forEach((range, i) => {
      htmlString += span(this.text.substring(range.start, range.end), range.style)
      if (this.ranges.length > i + 1) {
        htmlString += span(this.text.substring(range.end, this.ranges[i + 1].start))
      }
    })
    htmlString += span(this.text.substring(this.ranges[this.ranges.length - 1].end))

    return htmlString
  }
}
