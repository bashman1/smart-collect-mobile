
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import IntroSlider from '../components/intro/IntroSlider';
import SignIn from '../components/auth/SignIn'
import Home from '../components/main/Home';
import CreateItem from '../components/stock-management/CreateItem';
import PointOfSale from '../components/stock-management/PointOfSale';
import Orders from '../components/stock-management/Orders';
import Sales from '../components/stock-management/Sales';
import Settings from '../components/stock-management/Sales';
import NotificationList from '../components/notifications/NotificationList';
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

export const badgedIcon = (props) => {

    return (
        <TouchableOpacity style={[styles.rows, styles.navIconStyle]}  onPress={() => { props.navigation.navigate("NotificationList") }}>
            <IonIcon size={25} color="#fff" name="notifications" />
            <Badge styles={styles.badge}>0</Badge>
        </TouchableOpacity>
    )
}


export const IntroScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, navigationBarColor: '#fff' }}>
                <Stack.Screen name="IntroSlider" component={IntroSlider} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export const AuthScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, navigationBarColor: '#fff' }}>
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
        <NavigationContainer >
            <Drawer.Navigator  screenOptions={{navigationBarColor: '#fff'}} drawerContent={props => <SideMenu {...props} />}>
                <Drawer.Screen name="Home" component={Home} options={navLayout("Home")} />
                <Drawer.Screen name="CreateItem" component={CreateItem} options={navLayout("Create Item")} />
                <Drawer.Screen name="PointOfSale" component={PointOfSale} options={navLayout("Point Of Sale")} />
                <Drawer.Screen name="Orders" component={Orders} options={navLayout("Orders")} />
                <Drawer.Screen name="Sales" component={Sales} options={navLayout("Sales")} />
                <Drawer.Screen name="Settings" component={Settings} options={navLayout("Settings")} />
                <Drawer.Screen name="NotificationList" component={NotificationList} options={navLayout("NotificationList")} />

                
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


