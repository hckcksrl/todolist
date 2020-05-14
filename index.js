/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import CustomItem from './src/component/Table'

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(
    'CustomItem',
    () => CustomItem
);
