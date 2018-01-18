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

import { css } from 'styled-components'

import RobotoBlack from '../../resources/fonts/Roboto-Black.ttf'
import RobotoBlackItalic from '../../resources/fonts/Roboto-BlackItalic.ttf'
import RobotoBold from '../../resources/fonts/Roboto-Bold.ttf'
import RobotoBoldItalic from '../../resources/fonts/Roboto-BoldItalic.ttf'
import RobotoItalic from '../../resources/fonts/Roboto-Italic.ttf'
import RobotoLight from '../../resources/fonts/Roboto-Light.ttf'
import RobotoLightItalic from '../../resources/fonts/Roboto-LightItalic.ttf'
import RobotoMedium from '../../resources/fonts/Roboto-Medium.ttf'
import RobotoMediumItalic from '../../resources/fonts/Roboto-MediumItalic.ttf'
import RobotoRegular from '../../resources/fonts/Roboto-Regular.ttf'
import RobotoThin from '../../resources/fonts/Roboto-Thin.ttf'
import RobotoThinItalic from '../../resources/fonts/Roboto-ThinItalic.ttf'

const Fonts = css`
  @font-face {
    font-family: 'Roboto';
    src: url('${RobotoBlack}') format('truetype');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('${RobotoBlackItalic}') format('truetype');
    font-weight: 900;
    font-style: italic;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('${RobotoBold}') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('${RobotoBoldItalic}') format('truetype');
    font-weight: 700;
    font-style: italic;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('${RobotoItalic}') format('truetype');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('${RobotoLight}') format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('${RobotoLightItalic}') format('truetype');
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('${RobotoMedium}') format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('${RobotoMediumItalic}') format('truetype');
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('${RobotoRegular}') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('${RobotoThin}') format('truetype');
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('${RobotoThinItalic}') format('truetype');
    font-weight: 100;
    font-style: italic;
  }
`

export default Fonts
