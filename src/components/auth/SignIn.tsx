import React, { Component, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, StatusBar, Appearance } from 'react-native';
import { styles } from '../../styles/Styles';
import { TextInput } from 'react-native-paper';
import { validatePhone, mailValidation, showToast, createAlert, showLoading, localNotification } from '../../services/CommonService';
import RNBootSplash from "react-native-bootsplash";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../services/Context';
import { LoggedInUser, GenericInsert, GenericQueryAll } from '../../databases/allSchemas';
import { postToServer, postToServerWithToken } from '../../services/RemoteService';
import { useDispatch, useSelector,Provider } from 'react-redux';
import { addUserData } from '../../actions/UserData';
import changeNavigationBarColor, {
    hideNavigationBar,
    showNavigationBar,
  } from 'react-native-navigation-bar-color';
// import { Provider } from 'react-redux';

const SignIn = (props: any) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [spinner, setSpinner] = useState(showLoading(false));
    const [show_password, setShowPassword] = useState(true);
    const [password_icon, setPasswordIcon] = useState('eye-off-outline');

    const dispatch = useDispatch();
    const submitUserData = (userData:any) => dispatch(addUserData(userData))

    const { signIn } = React.useContext(AuthContext);

    const userData = useSelector((state:any) => state?.userDataReducer?.userDataList[0])

    const setNavigationColor = (color:any) => {
        changeNavigationBarColor(color);
    };


    useEffect(() => {
        // setNavigationColor("#5F9B42")
        setTimeout(() => {
            RNBootSplash.hide({ fade: true });
        }, 250);
       
    });


    const goToHome = () => {
        props.navigation.navigate('Home');
    }

    const seePassword = () => {
        if (password_icon == 'eye-off-outline') {
            setPasswordIcon('eye-outline')
            setShowPassword(false)
        } else {
            setPasswordIcon('eye-off-outline')
            setShowPassword(true)
        }
    }

    const onSubmit =()=>{
        if (email == null || password == null) {
            createAlert("Required", "Email and password are required");
            return;
        }

        setSpinner(showLoading(true))
        let postData = {
            email: email,
            password: password,
        }
        postToServer('user-login',postData, 'POST')?.then(data=>{
            setSpinner(showLoading(false))
            if(data?.status){
                
                let databaseData = {
                    tableId:Math.floor(Date.now()/1000),
                    id:data?.data?.user_data?.id,
                    age:null,
                    code:null,
                    contact:data?.data?.user_data?.phone_number,
                    createdBy:data?.data?.user_data?.created_by,
                    createdOn:data?.data?.user_data?.created_on,
                    email: data?.data?.user_data?.email,
                    firstName:data?.data?.user_data?.first_name,
                    lastName:data?.data?.user_data?.last_name,
                    status:data?.data?.user_data?.status,
                    token:data?.data?.token?.accessToken,
                    updatedBy:data?.data?.user_data?.updated_by,
                    updatedOn:data?.data?.user_data?.updated_on,
                    userType:data?.data?.user_data?.user_type
                }
                submitUserData(databaseData);
                GenericInsert(LoggedInUser, databaseData).then((loggedInUser) => {
                }).catch((error) => {
                    createAlert('error', 'error')
                   
                })
                signIn();
            }else{
                createAlert("Login process failed",data.message)
            }
        })
    }

    return (
        <ScrollView style={styles.backgroundWhite}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle={'dark-content'}
                showHideTransition={'none'}
                hidden={false} />
            {spinner}
            <View style={[styles.padding]}>
                <View style={[styles.marginBottom, styles.itemCenter, styles.loginMarginTop]}>
                    <Image style={styles.screenLogo} source={require('../../assets/Smart_Collect_logo.png')} />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Email" mode='outlined' placeholder="Email" onChangeText={(email:any) => setEmail(email)} />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Password" mode='outlined'  placeholder="Password"
                        onChangeText={(password:any) => setPassword(password)} secureTextEntry={show_password}
                        right={<TextInput.Icon icon={() => <IonIcon color={(Appearance.getColorScheme() === 'dark')?'#000':''} name={password_icon} size={30} onPress={seePassword} />}
                         />}
                    />
                </View>
                <View style={styles.marginBottom}>
                    <TouchableOpacity style={styles.touchableButton} onPress={onSubmit}>
                        <Text style={styles.healthPalWhite}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.marginBottom, styles.itemCenter]}>
                    <TouchableOpacity onPress={()=>{}}>
                        <Text style={styles.healthPalBlue}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default SignIn;