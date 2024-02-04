import React from 'react';
import { StyleSheet, View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import RNBootSplash from "react-native-bootsplash";
// import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import { styles } from '../../styles/Styles';
import { styles } from '../../styles/Styles.js';
// import NavigationBar from 'react-native-navbar-color';
import {AuthContext} from '../../services/Context';
import {System, GenericInsert} from '../../databases/allSchemas';



const slides = [
  {
    key: 1,
    title: 'Manage your collections', 
    // text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/splash3.png'),
    // backgroundColor: '#59b2ab',
    backgroundColor: '#ffffff',
  },
  {
    key: 2,
    title: 'Get detailed reports',
    // text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/splash1.png'),
    backgroundColor: '#ffffff',
  },
  {
    key: 3,
    title: 'Analysis and predictions',
    // text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/splash.png'),
    backgroundColor: '#ffffff',
  }
];


export default class IntroSlider extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {
      showRealApp: false
    }
  }

  static contextType = AuthContext
  componentDidMount() {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 250);
    RNBootSplash.hide({ fade: true });
    // NavigationBar.setColor('#DCE5F4')
  }

  _renderItem = ({ item }:any) => {
    return (
      <View style={[styles.itemCenter, styles.flex1, styles.healthPalBlueBackground]}>
        <StatusBar
          animated={true}
          backgroundColor="#ffffff"
          barStyle={'dark-content'}
          showHideTransition={'none'}
          hidden={false} />


        <Image style={[styles.marginBottom]} source={item.image} />
        <Text style={[styles.healthPalBlue, styles.marginBottom, styles.introText, styles.itemCenter]} >{item.title}</Text>
        <TouchableOpacity style={styles.touchableClearButton} onPress={this._onDone}>
          <Text style={styles.healthPalBlue}>SKIP</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onDone = () => {
    const { intro } = this.context as { intro: any };
    let systemData = {
      id:Math.floor(Date.now()/1000),
      key: 'INTRO',
      description: 'Introduction screens already seen.',
      status: 'Active',
      done: true,
      createdOn: new Date(),
    };
    GenericInsert(System, systemData).then((result)=>{
      intro()
    }).catch((error)=>{})

  }

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <IonIcon
          name="arrow-forward-outline"
          color="#76BA1D"
          size={26}
        />
      </View>
    );
  };

  _renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <IonIcon
          name="arrow-back-circle-outline"
          color="#76BA1D"
          size={26}
        />
      </View>
    );
  };

  _renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text>SKIP</Text>
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <IonIcon
          name="checkmark-circle-outline"
          color="#76BA1D"
          size={26}
        />
      </View>
    );
  };



  render() {

      return <AppIntroSlider
        renderItem={this._renderItem}
        data={slides}
        renderDoneButton={this._renderDoneButton}
        renderPrevButton={this._renderPrevButton}
        renderNextButton={this._renderNextButton}
        renderSkipButton={this._renderSkipButton}
        // renderPrevButton={this._renderNextButton}
        activeDotStyle={{ backgroundColor: '#76BA1D' }}
        onSkip={this._onDone}
        onDone={this._onDone} />
        ;
    }
  }

