import React from 'react';
import { View, Text, Alert, StatusBar, Platform } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import PushNotification from "react-native-push-notification";
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message';


export const createAlert = (title, message) =>
    Alert.alert(
        title,
        message,
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );


export function showLoading(show) {
    return (
        <Spinner
            visible={show}
            textContent={'Loading...'}
            textStyle={{ color: '#fff' }}
        />
    );
}

export const mailValidation = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) == false) {
        return false;
    } else {
        return true
    }
}

export const validatePhone = (phone) => {
    let reg = /^(\d{10}|\d{12})$/;
    if (reg.test(phone) == false) {
        return false
    } else {
        return true
    }
}

export const setStatusBar = (backgroundColor, contentColor, translucent, hidden,) => {
    return (
        <StatusBar
            animated={true}
            backgroundColor={backgroundColor}
            barStyle={contentColor}    //['default', 'dark-content', 'light-content'];
            showHideTransition={'fade'}
            translucent={translucent}
            hidden={hidden} />
    )
}

export const formatText = (text) => {
    return text.replace(/[^+\d]/g, '');
};

export const logout = (props) => {
    return props.navigation.navigate('SignIn')
}


export const showToast = (message) => {
    // ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    Toast.show({
        type: 'success',
        text1: 'Success',
        text2: message+' 👋'
      });
};

export const CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === "android") {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                // showToast("You are online!");

            } else {
                // showToast("You are offline, Please check internet connection and try again");
                createAlert("You are offline", "Please check internet connection and try again");
            }
        });
    } else {
        // For iOS devices
        NetInfo.isConnected.addEventListener(
            "connectionChange",
            handleFirstConnectivityChange
        );
    }
};


export const handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
        "connectionChange",
        handleFirstConnectivityChange
    );

    if (isConnected === false) {
        Alert.alert("You are offline!");
    } else {
        Alert.alert("You are online!");
    }
};


export const localNotification = () => {
    PushNotification.localNotification(
        {
            channelId: 'test-channel',
            title: 'Notification Title',
            message: 'Notification Message'
        }
    )
}