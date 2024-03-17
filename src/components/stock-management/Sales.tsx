import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Portal, PaperProvider, Modal, DefaultTheme, DataTable } from 'react-native-paper';
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, Appearance, useColorScheme, SafeAreaView, Button } from 'react-native';
import { styles } from '../../styles/Styles';
import { validatePhone, mailValidation, showToast, createAlert, setStatusBar, showLoading, localNotification } from '../../services/CommonService';
import { Dimensions } from "react-native";
import ThermalPrinterModule from 'react-native-thermal-printer';
import { LoggedInUser, GenericQueryAll, MyCart, GenericDeleteAll, GenericInsert } from '../../databases/allSchemas';
import { postToServerWithToken, postToServer, getFromServerWithToken } from '../../services/RemoteService';
import IonIcon from 'react-native-vector-icons/Ionicons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

// import {
//   BottomSheet
//   BottomSheetModal,
//   // BottomSheetView,
//   BottomSheetModalProvider,
// } from '@gorhom/bottom-sheet';

// import { SafeAreaView, useColorScheme, Button, TextInput } from 'react-native';


const screenWidth = Dimensions.get("window").width;

const Sales = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [statusBar, changeStatusBar] = useState(setStatusBar('#5F9B42', 'light-content', true, false));
  const [userData, setUerData] = useState({});
  const [salesList, setSalesList] = useState([]);
  const [receiptData, setReceiptData]= useState(null)

  const [salesDetails, setSalesDetails]= useState([])

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);



  const [state, setState] = useState({
    text:
      '[C]<img>https://via.placeholder.com/300.jpg</img>\n' +
      '[L]\n' +
      "[C]<u><font size='big'>ORDER N°045</font></u>\n" +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      '[L]<b>BEAUTIFUL SHIRT</b>[R]9.99e\n' +
      '[L]  + Size : S\n' +
      '[L]\n' +
      '[L]<b>AWESOME HAT</b>[R]24.99e\n' +
      '[L]  + Size : 57/58\n' +
      '[L]\n' +
      '[C]--------------------------------\n' +
      '[R]TOTAL PRICE :[R]34.98e\n' +
      '[R]TAX :[R]4.23e\n' +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      "[L]<font size='tall'>Customer :</font>\n" +
      '[L]Raymond DUPONT\n' +
      '[L]5 rue des girafes\n' +
      '[L]31547 PERPETES\n' +
      '[L]Tel : +33801201456\n' +
      '[L]\n' +
      "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
      "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>",
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const onPress = async () => {


    try {
      await ThermalPrinterModule.printBluetooth({
        payload: receiptData,
        printerNbrCharactersPerLine: 38,
      });
    } catch (err) {
      //error handling
      console.log(err.message);
    }
  };

  const getDetails=(data)=>{
    getSalesDetails(data.id)
  }

  const getSalesDetails = (id)=>{
    getFromServerWithToken('get-orders-details/'+id, {}, 'get', userData?.token)?.then((data: any) => {
      if (data?.status) {
        setSalesDetails(data?.data);
        
        let total = 0;
        let receipt = "[C]<u><font size='small'>"+data?.data[0].institution_name+"</font></u>\n" +
            '[C]----------------\n';
            receipt = receipt + '[L]<b>Name</b>          Qty       Price\n';
        
        (data?.data ?? []).forEach(element => {
            console.log(receipt);
            receipt = receipt + '[L]<b>' + element.name + '</b>   ' + Number(element.qty) + '       UGX ' + Number(element.price) + '\n';
            total = total + (Number(element.qty) * Number(element.price));
        });
        
        receipt = receipt + '[C]----------------\n';
        receipt = receipt + '[L]TOTAL PRICE :           UGX ' + total + '\n';
        receipt = receipt + '[L]<b>served by:</b> '+data?.data[0].user_name+'\n';
        receipt = receipt + "[C]<u><font size='small'>Thank you for shopping with us.</font></u>\n" +
        
        setReceiptData(receipt);

        onPress()

      } else {
        createAlert("Process Failed", data?.message);
      }
    }).catch(err => {
    })
  }


  const getSalesList = (userData) => {
    getFromServerWithToken('get-orders', {}, 'get', userData?.token)?.then((data: any) => {
      if (data?.status) {
        setSalesList(data?.data);
      } else {
        createAlert("Process Failed", data?.message);
      }
    }).catch(err => {
    })
  }

  useEffect(() => {
    GenericQueryAll(LoggedInUser).then((results) => {
      setUerData(results[0])
      getSalesList(results[0]);
    }).catch((error) => { console.log(error) });

  }, []);

  const snapPoints = [10, 30, 50];
  return (
    // <ScrollView>
    //     <Text>Hello There</Text>
    // </ScrollView>
    <ScrollView style={styles.backgroundWhite}>
      <SafeAreaView style={backgroundStyle}>
        <View style={[styles.padding]}>
          <View style={styles.marginBottom}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title sortDirection='descending'><Text style={styles.selectTextColor}>Recpt. No.</Text></DataTable.Title>
                <DataTable.Title numeric><Text style={styles.selectTextColor}>Items</Text></DataTable.Title>
                <DataTable.Title numeric><Text style={styles.selectTextColor}>Cost</Text></DataTable.Title>
                <DataTable.Title numeric><Text style={styles.selectTextColor}></Text></DataTable.Title>
              </DataTable.Header>
              {salesList.map((product, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell ><Text style={styles.selectTextColor}>{product.receipt_no}</Text></DataTable.Cell>
                  <DataTable.Cell numeric><Text style={styles.selectTextColor}>{product.item_count}</Text></DataTable.Cell>
                  <DataTable.Cell numeric><Text style={styles.selectTextColor}>{product.total}</Text></DataTable.Cell>
                  <DataTable.Cell numeric>
                    <TouchableOpacity style={styles.selectTextColor} onPress={() => getDetails(product)} >
                      <IonIcon
                        name="information-circle-outline"
                        color='#000'
                        size={30}
                      /></TouchableOpacity>

                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>

          </View>
        </View>
        <TextInput
          value={receiptData}
          onChangeText={(text) => setState((prev) => ({ ...prev, text }))}
        />
        <Button
          title="Click to invoke your native module!"
          color="#841584"
          onPress={onPress}
        />

        {/* <View style={styles.container}>
          <BottomSheet snapPoints={snapPoints}
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
          </BottomSheet>
        </View> */}

      </SafeAreaView>
    </ScrollView>
  )

}

export default Sales;