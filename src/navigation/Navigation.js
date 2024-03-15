
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import IntroSlider from '../components/intro/IntroSlider';
import SignIn from '../components/auth/SignIn'
import Home from '../components/main/Home';
import CreateItem from '../components/stock-management/CreateItem';
import ViewItems from '../components/stock-management/ViewItems';
import PointOfSale from '../components/stock-management/PointOfSale';
import Orders from '../components/stock-management/Orders';
import Sales from '../components/stock-management/Sales';
import Settings from '../components/stock-management/Sales';
import NotificationList from '../components/notifications/NotificationList';
import Cart from '../components/stock-management/Cart';
import { styles } from '../styles/Styles';
import { Badge } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { SideMenu } from './SideMenu';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const navLayout = (header, navigation) => {
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
            headerRight: () => badgedIcon(navigation)
        }
    )
}

export const badgedIcon = (props) => {

    return (
        <TouchableOpacity style={[styles.rows, styles.navIconStyle]}  onPress={() => { props.navigate('Cart')}}>
            <IonIcon size={25} color="#fff" name="cart" />
            {/* <Badge styles={styles.badge}>0</Badge> */}
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
                <Drawer.Screen name="Home" component={Home} options={({ navigation })=>navLayout("Home", navigation)} />
                <Drawer.Screen name="CreateItem" component={CreateItem} options={({ navigation })=>navLayout("Create Item", navigation)} />
                <Drawer.Screen name="PointOfSale" component={PointOfSale} options={({ navigation })=>navLayout("Point Of Sale", navigation)} />
                <Drawer.Screen name="Orders" component={Orders} options={({ navigation })=>navLayout("Orders", navigation)} />
                <Drawer.Screen name="Sales" component={Sales} options={({ navigation })=>navLayout("Sales", navigation)} />
                <Drawer.Screen name="Settings" component={Settings} options={({ navigation })=>navLayout("Settings", navigation)} />
                <Drawer.Screen name="NotificationList" component={NotificationList} options={({ navigation })=>navLayout("NotificationList", navigation)} />
                <Drawer.Screen name="ViewItem" component={ViewItems} options={({ navigation })=>navLayout("Product List", navigation)} />
                <Drawer.Screen name="Cart" component={Cart} options={({ navigation })=>navLayout("Check Out", navigation)} key={Math.floor(Date.now() / 1000)} />

                
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


