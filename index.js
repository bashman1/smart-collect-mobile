/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { Provider } from 'react-redux';
import configureStore from './src/Store';
import PushNotification from "react-native-push-notification";

PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification
    },
    requestPermissions: Platform.OS === 'ios'
})

const store = configureStore();

const SmartCollect = () =>
    <Provider store={store}>
        <App />
    </Provider>

AppRegistry.registerComponent(appName, () => SmartCollect);
