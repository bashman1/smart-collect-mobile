import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Appearance } from 'react-native';
import { styles } from '../../styles/Styles';
import { validatePhone, mailValidation, showToast, createAlert, setStatusBar, showLoading, localNotification } from '../../services/CommonService';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const NotificationList = (props: any) => {
    // const [statusBar, changeStatusBar] = useState(setStatusBar('#5F9B42', 'light-content', true, false));

    useEffect(() => {

    });

    return (
        <ScrollView>
        {/* {statusBar} */}

        </ScrollView>
    )

}

export default NotificationList;