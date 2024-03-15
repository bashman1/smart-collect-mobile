import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { validatePhone, mailValidation, showToast, createAlert, showLoading } from '../services/CommonService';
// import {logout} from '../service/CommonService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {logOut} from '../service/RemoteService';
import { AuthContext } from '../services/Context';
import { LoggedInUser, GenericQueryAll, GenericDeleteAll } from '../databases/allSchemas'


export function SideMenu(props) {
    const [userData, setUerData] = useState({});
    useEffect(() => {

        GenericQueryAll(LoggedInUser).then((results) => {
            setUerData(results[0])
        }).catch((error) => { alert(JSON.stringify(error)) });

    }, []);

    const { signOut } = React.useContext(AuthContext);

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    const logOut = () => {
        GenericDeleteAll(LoggedInUser).then(() => {
            signOut();
        }).catch((error) => { console.log(error); })
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Image style={styles.image} source={require('../assets/Smart_Collect_logo.png')} />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            </View>
                        </View>

                        <Drawer.Section>
                            <View style={[styles.row, styles.drawerSection]}>
                                <View style={styles.section}>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>{userData.firstName + ' ' + userData.lastName}</Paragraph>
                                </View>
                            </View>
                            <View style={styles.row}>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.section}>
                                    <Caption style={styles.caption}>Location: </Caption>
                                    <Caption style={styles.caption}>{'Kampala'}</Caption>
                                </View>
                            </View>
                        </Drawer.Section>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate("Home") }}
                        />

                        {/* <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="chatbubbles-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Medical Consultation"
                            onPress={() => { props.navigation.navigate("ConsultMedicalWorker") }}
                        /> */}
                        {/* <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="location-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Locations"
                            onPress={() => { props.navigation.navigate("Maps") }}
                        /> */}

                        {/* <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="people-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Public Health"
                            onPress={() => { props.navigation.navigate("PublicHealth") }}
                        /> */}

                        {/* <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="stats-chart-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Statistics"
                            onPress={() => { test() }}
                        /> */}

                        <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="swap-horizontal-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Products"
                            onPress={() => { props.navigation.navigate("ViewItem") }}
                        />

                        


                        <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="calendar-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Stock"
                            onPress={() => { props.navigation.navigate('CreateItem') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="medical-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Point of sale"
                            onPress={() => { props.navigation.navigate('PointOfSale') }}
                        />
{/* 
                        <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="flask-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Laboratories"
                            onPress={() => { props.navigation.navigate('Laboratories') }}
                        /> */}

                        {/* <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="flask-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="My Lab Tests"
                            onPress={() => { props.navigation.navigate('MyLabTests') }}
                        /> */}

                        <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="cart-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Sales"
                            onPress={() => { props.navigation.navigate('Sales') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="settings-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => { props.navigation.navigate('Settings') }}
                        />
                    </Drawer.Section>
                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}

                    {/* <View>
                        <Image style={styles.screenLogo} source={require('../assets/healthPalLogo2.png')} />
                    </View> */}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <IonIcon
                            name="log-out-outline"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={logOut}
                />
            </Drawer.Section>
        </View>
    );
}