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
import { Menu, shell } from 'electron'
import EventEmitter from 'events'
import appPackage from '../../package.json'

export default class MenuBuilder extends EventEmitter {
  buildMenu() {
    if (process.platform !== 'darwin') {
      return
    }

    const menu = Menu.buildFromTemplate(this.buildDefaultTemplate())
    Menu.setApplicationMenu(menu)
  }

  buildDefaultTemplate() {
    const subMenuAbout = {
      label: appPackage.productName,
      submenu: [
        { label: `About ${appPackage.productName}`, click: () => { this.emit('item-click', 'about') } },
        { type: 'separator' },
        { role: 'quit' },
      ],
    }
    const subMenuEdit = {
      label: 'Edit',
      role: 'editMenu',
    }
    const subMenuViewProd = {
      label: 'View',
      submenu: [
        { role: 'togglefullscreen' },
      ],
    }
    const subMenuViewDev = {
      ...subMenuViewProd,
      submenu: [
        { role: 'reload' },
        { role: 'toggledevtools' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { role: 'resetzoom' },
        { type: 'separator' },
        ...subMenuViewProd.submenu,
      ],
    }
    const subMenuHelp = {
      label: 'Help',
      submenu: [
        { label: 'Learn More', click() { shell.openExternal(appPackage.homepage) } },
        { type: 'separator' },
        { label: 'Search Issues', click() { shell.openExternal(`${appPackage.homepage}/issues`) } },
      ],
    }

    const subMenuView = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'
      ? subMenuViewDev
      : subMenuViewProd

    return [
      subMenuAbout,
      subMenuEdit,
      subMenuView,
      subMenuHelp,
    ]
  }
}
