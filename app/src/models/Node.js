// @flow

export default class Node {
  id: string
  host: string
  os: string
  api: boolean
  enabled: boolean

  constructor(props: {
      id: string, host: string, os: string, api: boolean, enabled: boolean,
  }) {
    this.id = props.id
    this.host = props.host
    this.os = props.os
    this.api = props.api
    this.enabled = props.enabled
  }

  static clone(node: Node): Node {
    let newNode = new Node({
      id: node.id,
      host: node.host,
      os: node.os,
      api: node.api,
      enabled: node.enabled,
    })
    return newNode
  }
}
