/**
 * @format
 */

import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';
import i18n from './i18next/i18n';
import App from './App';

AppRegistry.registerComponent(appName, () => App);
