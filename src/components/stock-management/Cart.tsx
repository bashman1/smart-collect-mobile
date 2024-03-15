import React, { useState, useEffect } from 'react';
import { TextInput, Portal, Button, PaperProvider, Modal, DefaultTheme, DataTable, Divider } from 'react-native-paper';
import { View, Image, Alert, TouchableOpacity, Text, Pressable, ScrollView, Appearance, FlatList, StyleSheet } from 'react-native';
import { styles } from '../../styles/Styles';
import { validatePhone, mailValidation, showToast, createAlert, setStatusBar, showLoading, localNotification } from '../../services/CommonService';
import { Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { SelectList } from 'react-native-dropdown-select-list'
import { postToServerWithToken, postToServer, getFromServerWithToken } from '../../services/RemoteService';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedInUser, GenericQueryAll, GenericCartUpdate, GenericDeleteAll, MyCart, GenericDelete } from '../../databases/allSchemas';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

const Cart = (props: any) => {

    const [userData, setUerData] = useState({});
    const [cartData, setCartData] = useState([]);
    const [discount, setDiscount] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        initialLoading();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            // Fetch cart data or perform any other actions when the screen gains focus
            console.log('Cart screen focused');
            initialLoading();
            return () => {
            };
        }, [])
    );

    const initialLoading = () => {
        GenericQueryAll(LoggedInUser).then((results) => {
            setUerData(results[0]);
        }).catch((error) => { console.log(error) });

        GenericQueryAll(MyCart).then((results) => {
            setCartData(results);
            calculateTotal(results);
        }).catch((error) => { console.log(error) });
    }

    const calculateTotal = (cartData) => {
        let total = 0;
        cartData.forEach(element => {
            total = (total + (element.quantity * element.price))
        });
        setTotal(total-discount);
    }

    const addQuantity = (cart) => {
        GenericCartUpdate(MyCart, cart, 'ADD').then((result) => {
            initialLoading();
        }).catch((error) => { console.log(error) });
    }

    const reduceQuantity = (cart) => {
        GenericCartUpdate(MyCart, cart, 'REMOVE').then((result) => {
            initialLoading();
        }).catch((error) => { console.log(error) });
    }

    const deleteItem = (cart) => {
        GenericCartUpdate(MyCart, cart, 'DELETE').then((result) => {
            initialLoading();
        }).catch((error) => { console.log(error) });
    }



    const renderItems = ({ item }) => {
        return (
            <View>
                <View style={{ marginHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, display: 'flex' }}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/flickr-marco-verch.jpg')} style={{ width: 80, height: 80 }} resizeMode='contain' />
                        </View>
                        <View style={{ paddingLeft: 10, paddingVertical: 5, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>{item.name}</Text>
                            <Text style={{ fontSize: 25, fontWeight: '', marginBottom: 10 }}>UGX {item.price}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'space-between' }}>
                                    <TouchableOpacity style={styles.buttonCircle} onPress={() => { reduceQuantity(item) }}>
                                        <IonIcon name="remove" color={'#263776'} size={20} />
                                    </TouchableOpacity>
                                    <View style={{ with: 10, marginTop: 10 }}>
                                        <Text>{item.quantity}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.buttonCircle} onPress={() => { addQuantity(item) }}>
                                        <IonIcon name="add" color={'#263776'} size={20} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.buttonCircle} onPress={() => { deleteItem(item) }}>
                                    <IonIcon name="trash-outline" color={'#e60000'} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', height: 1, width: '100%' }} />
                </View>

            </View>
        )
    }








    // const addToCart = (product) => {
    //     const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    //     if (existingItemIndex !== -1) {
    //         const updatedCartItems = [...cartItems];
    //         updatedCartItems[existingItemIndex].quantity += 1;
    //         setCartItems(updatedCartItems);
    //     } else {
    //         setCartItems([...cartItems, { ...product, quantity: 1 }]);
    //     }
    // };

    // const removeFromCart = (product) => {
    //     const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    //     if (existingItemIndex !== -1) {
    //         const updatedCartItems = [...cartItems];
    //         updatedCartItems.splice(existingItemIndex, 1);
    //         setCartItems(updatedCartItems);
    //     }

    //     GenericDelete(MyCart, product.id).then((results)=>{
    //         createAlert("Deleted", product.name+" deleted successfully")
    //     }).catch((error)=>{

    //     })
    // };

    // const updateQuantity = (text, product) => {
    //     const quantity = parseInt(text, 10);
    //     if (!isNaN(quantity) && quantity >= 0) {
    //         const updatedCartItems = cartItems.map(item => {
    //             if (item.id === product.id) {
    //                 return { ...item, quantity };
    //             }
    //             return item;
    //         });
    //         setCartItems(updatedCartItems);
    //     }
    // };

    // const renderItem = ({ item }) => (
    //     <View style={styles.item}>
    //         <View style={styles.itemDetails}>
    //             <Text style={styles.itemName}>{item.name}</Text>
    //             <Text style={styles.itemPrice}>Price: ${item.price}</Text>
    //             <View style={styles.quantityContainer}>
    //                 <TouchableOpacity onPress={() => updateQuantity(item.quantity - 1, item)} style={styles.quantityButton}>
    //                     <Text style={styles.quantityButtonText}>-</Text>
    //                 </TouchableOpacity>
    //                 <TextInput
    //                     style={styles.quantityInput}
    //                     value={item.quantity.toString()}
    //                     onChangeText={(text) => updateQuantity(text, item)}
    //                     keyboardType="numeric"
    //                 />
    //                 <TouchableOpacity onPress={() => updateQuantity(item.quantity + 1, item)} style={styles.quantityButton}>
    //                     <Text style={styles.quantityButtonText}>+</Text>
    //                 </TouchableOpacity>
    //             </View>
    //             <Text style={styles.subtotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
    //         </View>
    //         <View style={styles.itemActions}>
    //             <TouchableOpacity style={styles.actionButton} onPress={() => removeFromCart(item)}>
    //                 <Text style={styles.actionButtonText}>Remove</Text>
    //             </TouchableOpacity>
    //         </View>
    //     </View>
    // );


    // const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);


    return (

        // <ScrollView style={styles.backgroundWhite}>
        //     <View style={[styles.padding]}>
        //         <View style={styles.container}>
        //             <Text style={styles.title}>Shopping Cart</Text>
        //             <FlatList
        //                 data={cartItems}
        //                 renderItem={renderItem}
        //                 keyExtractor={(item) => item.id.toString()}
        //                 ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
        //             />
        //             <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        //         </View>
        //     </View>
        // </ScrollView>

        <ScrollView>
            <View >
                <View >
                    <View style={[styles.marginBottom10, styles.padding10]}>
                        {/* <FlatList
                        data={cartData}
                        renderItem={renderItems}
                        keyExtractor={(item) => item.tableId.toString()}
                    /> */}
                        {cartData.map((item, index) => (
                            <View style={{ marginHorizontal: 15 }}>
                                <View style={{ flexDirection: 'row', paddingVertical: 10, display: 'flex' }}>
                                    {/* <View style={{ backgroundColor: '#fff', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../assets/flickr-marco-verch.jpg')} style={{ width: 80, height: 80 }} resizeMode='contain' />
                                    </View> */}
                                    <View style={{ paddingLeft: 10, paddingVertical: 5, justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>{item.name}</Text>
                                        <Text style={{ fontSize: 25, fontWeight: '', marginBottom: 10 }}>UGX {item.price}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'space-between' }}>
                                                <TouchableOpacity style={styles.buttonCircle} onPress={() => { reduceQuantity(item) }}>
                                                    <IonIcon name="remove" color={'#263776'} size={20} />
                                                </TouchableOpacity>
                                                <View style={{ with: 10, marginTop: 10 }}>
                                                    <Text>{item.quantity}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.buttonCircle} onPress={() => { addQuantity(item) }}>
                                                    <IonIcon name="add" color={'#263776'} size={20} />
                                                </TouchableOpacity>
                                            </View>
                                            {/* <Text>Sub. Total:{item.quantity*item.price} </Text> */}
                                            <TouchableOpacity style={styles.buttonCircle} onPress={() => { deleteItem(item) }}>
                                                <IonIcon name="trash-outline" color={'#e60000'} size={20} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', height: 1, width: '100%' }} />
                            </View>
                        ))}
                    </View>
                    <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text style={{ fontSize: 20 }}>Total Amount</Text>

                            <Text style={{ fontSize: 30 }}> UGX {total}</Text>
                        </View>
                        <View style={styles.padding}>
                            <TouchableOpacity style={[styles.touchableButton]}>
                                <Text style={styles.healthPalWhite}>Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>


    )

}



export default Cart;




