import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Appearance } from 'react-native';
import RNBootSplash from "react-native-bootsplash";
import { styles } from '../../styles/Styles';
import { validatePhone, mailValidation, showToast, createAlert, setStatusBar, showLoading, localNotification } from '../../services/CommonService';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import changeNavigationBarColor, {
    hideNavigationBar,
    showNavigationBar,
  } from 'react-native-navigation-bar-color';

const Home = (props: any) => {

    const [statusBar, changeStatusBar] = useState(setStatusBar('#5F9B42', 'light-content', true, false));


    const setNavigationColor = (color:any) => {
        changeNavigationBarColor(color);
    };

    useEffect(() => {
        setNavigationColor("#5F9B42")
        setTimeout(() => {
            RNBootSplash.hide({ fade: true });
        }, 250);
    });

    const barData = [
        {value: 250, label: 'Mon', labelTextStyle: {color: 'gray'}},
        {value: 500, label: 'Tue', frontColor: '#5F9B42', labelTextStyle: {color: 'gray'}},
        {value: 745, label: 'Wed', frontColor: '#5F9B42', labelTextStyle: {color: 'gray'}},
        {value: 320, label: 'Thu', labelTextStyle: {color: 'gray'}},
        {value: 600, label: 'Fri', frontColor: '#5F9B42', labelTextStyle: {color: 'gray'}},
        {value: 256, label: 'Sat', labelTextStyle: {color: 'gray'}},
        {value: 300, label: 'Sun', labelTextStyle: {color: 'grey'}},
    ];

    const lineData = [{value: 0},{value: 10},{value: 8},{value: 58},{value: 56},{value: 78},{value: 74},{value: 98}];
    const lineData2 = [{value: 0},{value: 20},{value: 18},{value: 40},{value: 36},{value: 60},{value: 54},{value: 85}];

    return (
        <ScrollView>
            {statusBar}
            <View style={[styles.padding]}>
                <Text style={[styles.paragraph, styles.caption]}>Dashboard</Text>
                <View style={[styles.marginBottom, styles.card,  (Appearance.getColorScheme() === 'dark')?styles.darkTheme:styles.lightTheme]}>
                <Text style={styles.healthPalBlue}>Daily sales</Text>
                    <BarChart
                    barWidth={(screenWidth-(0.5*6)-100)/7}
                    noOfSections={5}
                    barBorderRadius={4}
                    spacing={.5}
                    frontColor="#5F9B42"
                    data={barData}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    
                />
                </View>
                {/* <Card style={styles.marginBottom}>
                    <LineChart
                        areaChart
                        curved
                        data={lineData}
                        data2={lineData2}
                        height={250}
                        showVerticalLines
                        spacing={44}
                        initialSpacing={0}
                        color1="skyblue"
                        color2="orange"
                        textColor1="green"
                        hideDataPoints
                        dataPointsColor1="blue"
                        dataPointsColor2="red"
                        startFillColor1="skyblue"
                        startFillColor2="orange"
                        startOpacity={0.8}
                        endOpacity={0.3}
                        />
                </Card> */}

                <View style={styles.marginBottom}>
                    <View style={styles.gridContainer}>
                        <View style={styles.item}>

                            <TouchableOpacity style={styles.card} onPress={() => { props.navigation.navigate("ViewItem")}}>
                                <Text style={styles.healthPalBlue}>Stock</Text>
                                <Image style={styles.homeScreenIcon} source={require('../../assets/1.png')} />
                            </TouchableOpacity>

                        </View>
                        <View style={styles.item}>

                            <TouchableOpacity style={styles.card} onPress={()=>{props.navigation.navigate('Sales')}}>
                                <Text style={styles.healthPalBlue}>Sales</Text>
                                <Image style={styles.homeScreenIcon} source={require('../../assets/2.png')} />
                            </TouchableOpacity>

                        </View>
                        
                    </View>
                </View>


                <View style={styles.marginBottom}>
                    <TouchableOpacity style={styles.touchableButton} onPress={()=>{props.navigation.navigate('CreateItem')}}>
                        <Text style={styles.healthPalWhite}>Create Product</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )

}
export default Home;