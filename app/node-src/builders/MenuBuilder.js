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
    const menu = Menu.buildFromTemplate(this.buildDefaultTemplate())
    Menu.setApplicationMenu(menu)

    return menu
  }

  buildDefaultTemplate() {
    const subMenuAbout = {
      label: appPackage.productName,
      submenu: [
        { label: `About ${appPackage.productName}`, click: () => { this.emit('item-click', 'about') } },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    }
    const subMenuEdit = {
      label: 'Edit',
      role: 'editMenu',
    }
    const subMenuViewDev = {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggledevtools' },
        { role: 'togglefullscreen' },
      ],
    }
    const subMenuViewProd = {
      label: 'View',
      submenu: [
        { role: 'togglefullscreen' },
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
