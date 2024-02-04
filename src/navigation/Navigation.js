
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IntroSlider from '../components/intro/IntroSlider';
import SignIn from '../components/auth/SignIn'
import Home from '../components/main/Home';
import { styles } from '../styles/Styles';
import { Badge } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { SideMenu } from './SideMenu';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const navLayout = (header) => {
    return (
        {
            headerShown: true,
            title: header,
            headerStyle: {
                backgroundColor: '#5F9B42',
                elevation: 0,
                shadowOpacity: 0
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                width: '100%',
                textAlign: 'center',
            },
            headerRight: () => badgedIcon()
        }
    )
}

export const badgedIcon = () => {
    return (
        <TouchableOpacity style={[styles.rows, styles.navIconStyle]}>
            <IonIcon size={25} color="#fff" name="notifications" />
            <Badge styles={styles.badge}>0</Badge>
        </TouchableOpacity>
    )
}


export const IntroScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="IntroSlider" component={IntroSlider} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export const AuthScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="IntroSlider" component={IntroSlider} /> */}
                <Stack.Screen name="SignIn" component={SignIn} />
                {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
                {/* <Stack.Screen name="ConsultMedicalWorker" component={Consultation}/> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export const MainScreen =()=>{
    return(
        <NavigationContainer>
            <Drawer.Navigator  drawerContent={props => <SideMenu {...props} />}>
                <Drawer.Screen name="Home" component={Home} options={navLayout("Home")} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


