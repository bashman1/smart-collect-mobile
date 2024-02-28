import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
// import { Dimensions } from 'react-native'
// import {useWindowDimensions} from 'react-native';

// const WINDOW_HEIGHT = useWindowDimensions().height;

export const styles = StyleSheet.create(
    {
        healthPalBlue: {
            // color: '#263776',
            color: '#76BA1D',
        },
        healthPalBlueBackground: {   
            // backgroundColor: '#263776',  
            backgroundColor: '#ffffff',
        },
        healthPalGreen: {
            color: '#5F9B42',
        },
        healthPalWhite: {
            color: '#ffffff',
        },
        healthPalRed: {
            color: '#e60000',
        },
        flex1: {
            flex: 1,
        },

        itemCenter: {
            justifyContent: 'center',
            alignItems: 'center',
        },
 
        marginBottom: {
            marginBottom: 20,
            
        },
        screenLogo: {
            height: 100,
            width: '100%',
            borderRadius: 10
        },
        profilePic: {
            height: '50%',
            width: '100%',
            borderRadius: 10
        },
        padding: {
            padding: 10
        },
        marginBottom10:{
            marginBottom: 10,
        },
        marginTop10:{
            marginTop: 10,
        },
        touchableButton: {
            borderWidth: 1,
            borderColor: '#5F9B42',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            height: 45,
            borderRadius: 5,
            backgroundColor: '#5F9B42'
        },
        touchableClearButton: {
            // borderWidth: 1,
            // borderColor: '#253674',
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            borderRadius: 10,
            backgroundColor: 'rgba(1, 1, 1, .1)'
        },
        buttonCircle: {
            width: 40,
            height: 40,
            backgroundColor: 'rgba(1, 1, 1, .1)',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },

        gridContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 10
        },
        gridItem: {
            width: '48%',
        },
        card: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0.26,
            elevation: 8,
            backgroundColor: 'white',
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 5
        },
        cardWithoutPadding: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0.26,
            elevation: 8,
            backgroundColor: 'white',
            
            // paddingTop: 20,
            // paddingBottom: 20,
            // paddingLeft: 10,
            // paddingRight: 10,
            borderRadius: 5
        },
        rows: {
            flexDirection: 'row',
            alignItems: 'center',
            // marginRight: 15,
        },

        row:{
            flexDirection: 'row',
        },

          item: {
            width: '48%', // is 50% of container width
          },

          categoryItem:{
              width: '32%'
          },
          introText:{
              fontWeight: 'bold',
              fontSize: 20
          },
        heading:{
            fontWeight: 'bold',
            fontSize: 25,
            paddingBottom: 5

        },
          page: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff"
          },
          container: {
            height: '100%',
            width: '100%',
            backgroundColor: "#fff"
          },
          map: {
            flex: 1
          },
          navIconStyle:{
            paddingRight:10
        },
        drawerContent: {
            flex: 1,
        },
        userInfoSection: {
            paddingLeft: 20,
        },
        title: {
            fontSize: 16,
            marginTop: 3,
            fontWeight: 'bold',
        },
        caption: {
            fontSize: 14,
            lineHeight: 14,
        },
        section: {
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 15,
        },
        paragraph: {
            fontWeight: 'bold',
            marginRight: 3,
        },
        drawerSection: {
            marginTop: 15,
        },
        bottomDrawerSection: {
            marginBottom: 0,
            borderTopColor: '#f4f4f4',
            borderTopWidth: 1
        },
        preference: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 16,
        },
        image: {
            width: 70,
            height: 70,
            borderRadius: 70 / 2,
            overflow: "hidden",
            borderWidth: 1,
        },
        passwordWidth:{
            width: '100%'
        },
        showPasswordIcon:{
            width:'15%',
            position: 'absolute',
            right: 0
        },
        loginMarginTop:{
            marginTop :'30%'
        },
        homeScreenIcon:{
            height:140,
            width:140,
        },
        doctorsThumbnail:{
            width: 60,
            height: 60
        },
        borderBottom:{
            borderBottomWidth: 1,
            width: '100%',
            borderBottomColor: '#e6e6e6',
            marginBottom: 2,
        },
        marginRight:{
            marginRight: 10
        },
        fontWeightBold:{
             fontWeight: 'bold',
        },
        greyColorFaint:{
            color: '#8c8c8c'
        },
        pageTitle:{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#263776'

        },
        searchResultTouchable:{
            padding:10,
            borderBottomColor: '#e6e6e6',
            borderBottomWidth: 1

        },
        searchResults:{
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.26,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 5
        },
        searchResultItem:{
            fontSize: 20
        },
        searchPageMarginTop:{
            marginTop:10

        },
        appBar:{
            height: 100,
            backgroundColor: '#263776',
            paddingTop: 25,
            paddingLeft: 10,
            paddingRight :10,
        },
        imageBackGround:{
            width: '100%',
            height: '100%',
        },
        backgroundImageHeight:{
            height:100,
        },
        pharmacyCatImg:{
            height: 40,
            width: 40,
            overflow: 'hidden'
        },
        padding10:{
            padding:10
        },
        floatRight:{
            alignItems: 'flex-end',
            marginTop: -20,
        },
        alignRight:{
            textAlign: 'right'
        },
        minFullHeight:{
            minHeight: '100%',
        },        
        fontSize5:{
            fontSize: 5
        },
        fontSize10:{
            fontSize: 10
        },
        fontSize20:{
            fontSize: 20
        },
        fontSize30:{
            fontSize: 30
        },
        fontSize40:{
            fontSize: 40
        },
        fontSize50:{
            fontSize: 50
        },
        fontSize60:{
            fontSize: 60
        },
        medicineDetailsImage:{
            width: '98%',
            height: 200
        },
        floatingButton:{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            position: 'absolute',
            bottom: 10,
            right: 10,
            height: 70,
            backgroundColor: '#fff',
            borderRadius: 100,
        },

        backgroundWhite:{
            backgroundColor:'#ffffff'
        },
        greenTheme:{
            backgroundColor:"#5F9B42"
        },
        darkTheme:{
            backgroundColor: '#333340'
        },
        lightTheme:{
            backgroundColor: '#ffffff'
        },
        selectStyle:{
            borderRadius: 5
        },
        selectTextColor:{
            color:"#000"
        },
        flex09:{
            flex:0.9
        },      
        flex01:{
            flex:0.1
        }


      

    }
)