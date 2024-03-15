import React, { useState, useEffect } from 'react';
import { TextInput, Portal, Button, PaperProvider, Modal, DefaultTheme, DataTable } from 'react-native-paper';
import { View, Image, Alert, TouchableOpacity, Text, Pressable, ScrollView, Appearance } from 'react-native';
import { styles } from '../../styles/Styles';
import { validatePhone, mailValidation, showToast, createAlert, setStatusBar, showLoading, localNotification } from '../../services/CommonService';
import { Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { SelectList } from 'react-native-dropdown-select-list'
import { postToServerWithToken, postToServer, getFromServerWithToken } from '../../services/RemoteService';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedInUser, GenericQueryAll, MyCart, GenericDeleteAll, GenericInsert } from '../../databases/allSchemas';
import Toast from 'react-native-toast-message';

const ViewItem = (props: any) => {

    const [userData, setUerData] = useState({});
    const [productList, setProductList] = useState([]);

    const getProductList = (userData) => {
        getFromServerWithToken('get-products', {}, 'get', userData?.token)?.then((data: any) => {
            if (data?.status) {
                setProductList(data?.data)
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }

    const addToCart = (cart) => {
        let prod = {
            tableId: Math.floor(Date.now() / 1000),
            id: cart?.id,
            name: cart?.name,
            quantity: 1,
            price: Number(cart.selling_price),
            subtotal:Number(cart.selling_price),
        }
        GenericInsert(MyCart, prod).then((loggedInUser) => {
            createAlert("Cart", cart?.name + " added successfully")
        }).catch((error) => {


        })

    }


    useEffect(() => {
        GenericQueryAll(LoggedInUser).then((results) => {
            setUerData(results[0])
            getProductList(results[0]);
        }).catch((error) => { });

    }, []);


    return (
        <View style={styles.backgroundWhite} >
            <View style={[styles.padding]}>
                <View style={styles.marginBottom}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title sortDirection='descending'><Text style={styles.selectTextColor}>Name</Text></DataTable.Title>
                            <DataTable.Title numeric><Text style={styles.selectTextColor}>Price</Text></DataTable.Title>
                            <DataTable.Title numeric><Text style={styles.selectTextColor}>Qty.</Text></DataTable.Title>
                            <DataTable.Title numeric><Text style={styles.selectTextColor}></Text></DataTable.Title>
                        </DataTable.Header>
                        {productList.map((product, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell ><Text style={styles.selectTextColor}>{product.name}</Text></DataTable.Cell>
                                <DataTable.Cell numeric><Text style={styles.selectTextColor}>{product.selling_price}</Text></DataTable.Cell>
                                <DataTable.Cell numeric><Text style={styles.selectTextColor}>{product.quantity}</Text></DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <TouchableOpacity style={styles.selectTextColor} onPress={() => addToCart(product)} >
                                        <IonIcon
                                            name="bag-add-outline"
                                            color='#000'
                                            size={15}
                                        /></TouchableOpacity>

                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </View>
            </View>
        </View>
    )
}

export default ViewItem;


