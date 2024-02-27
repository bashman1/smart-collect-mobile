import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { View, Image, TouchableOpacity, Text, ScrollView, Appearance } from 'react-native';
import { styles } from '../../styles/Styles';
import { validatePhone, mailValidation, showToast, createAlert, setStatusBar, showLoading, localNotification } from '../../services/CommonService';
import { Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { SelectList } from 'react-native-dropdown-select-list'
import { postToServerWithToken,postToServer } from '../../services/RemoteService';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedInUser, GenericQueryAll, GenericDeleteAll } from '../../databases/allSchemas'

const screenWidth = Dimensions.get("window").width;

const CreateItem = (props: any) => {
    const [statusBar, changeStatusBar] = useState(setStatusBar('#5F9B42', 'light-content', true, false));

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // const userData = useSelector((state:any) => state.userDataReducer.userDataList[0])
    const [userData, setUerData] = useState({});

    const [selected, setSelected] = React.useState("");

    const [name, setName]=useState(null);
    const [type, setType]=useState(null);
    const [category, setCategory]=useState(null);
    const [subCategory, setSubCategory]=useState(null);
    const [gauge, setGauge]=useState(null);
    const [manufacturer, setManufacturer]=useState(null);
    const [supplier, setSupplier]=useState(null);
    const [measurementUnit, setUnit]=useState(null);
    const [productNo, setProductNo]=useState(null);
    const [description, setDescription]=useState(null);
    const [quantity, setQuantity]=useState(null);
    const [minStock, setMinStock]=useState(null);
    const [maxStock, setMaxStock]=useState(null);
    const [stockDate, setStockDate]=useState(null);
    const [expiryDate, setExpiryDate]=useState(null);
    const [manufacturingDate, setManufacturingDate]=useState(null);
    const [purchasePrice, setPurchasePrice]=useState(null);
    const [sellingPrice, setSellingPrice]=useState(null);

    const [dateType, setDateType]=useState("");

    const data = [
        { key: '1', value: 'Mobiles', disabled: true },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers', disabled: true },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ]

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const checkOutSelected=()=>{
        console.log(type)
    }
    const handleConfirm = (date: any) => {
        if(dateType =='STOCK_DATE'){
            setStockDate(date.toString())
        }else if(dateType =='MANUFACTURING_DATE'){
            setManufacturingDate(date.toString())
        }else if(dateType =='EXPIRY_DATE'){
            setExpiryDate(date.toString())
        }
        hideDatePicker();
    };

    const determineDatePicker=(type:any)=>{
        setDateType(type)
    }


    const searchFromServer = () => {

        let postData = {
            searchWord: "searchWord",
        }

        // createAlert("Token",  JSON.stringify(userData));
        // return;
        postToServerWithToken('get-suppliers', postData, "GET", userData?.token).then((data:any) => {
            // createAlert("Response", JSON.stringify(data))
            console.log(data);
            if (data.status) {
                // setSearchResult(data.returnObject);
            } else {

            }
        }).catch(err => {

        })

        // const helo=postToServerWithToken('get-product-types', postData, "POST", userData?.data?.token)
    }


    const showStockDate=()=>{
        determineDatePicker('STOCK_DATE')
        showDatePicker()
    }

    const showManufacturingDate=()=>{
        determineDatePicker('MANUFACTURING_DATE')
        showDatePicker()
    }

    const showExpiryDate=()=>{
        determineDatePicker('EXPIRY_DATE')
        showDatePicker()
    }

    useEffect(() => {
        GenericQueryAll(LoggedInUser).then((results) => {
            setUerData(results[0])
            console.log(results)
        }).catch((error) => {  });

    }, []);




    return (
        <ScrollView style={styles.backgroundWhite}>
            <View style={[styles.padding]}>
                <View style={styles.marginBottom}>
                    <TextInput label="Name" mode='outlined' placeholder="Name" onChangeText={(name:any) => setName(name)} />
                </View>
                <View style={styles.marginBottom}>
                    <SelectList
                        setSelected={(val: any) => setType(val)}
                        data={data}
                        save="key"
                        placeholder="Type"
                        inputStyles={styles.selectTextColor}
                        boxStyles={styles.selectStyle}
                        dropdownTextStyles={styles.selectTextColor}
                    />
                </View>
                <View style={styles.marginBottom}>
                    <SelectList
                        setSelected={(val: any) => setCategory(val)}
                        data={data}
                        save="value"
                        placeholder="Category"
                        inputStyles={styles.selectTextColor}
                        boxStyles={styles.selectStyle}
                        dropdownTextStyles={styles.selectTextColor}
                    />
                </View>
                <View style={styles.marginBottom}>
                    <SelectList
                        setSelected={(val: any) => setSubCategory(val)}
                        data={data}
                        save="value"
                        placeholder="Sub Category"
                        inputStyles={styles.selectTextColor}
                        boxStyles={styles.selectStyle}
                        dropdownTextStyles={styles.selectTextColor}
                    />
                </View>
                <View style={styles.marginBottom}>
                    <SelectList
                        setSelected={(val: any) => setGauge(val)}
                        data={data}
                        save="value"
                        placeholder="Gauge"
                        inputStyles={styles.selectTextColor}
                        boxStyles={styles.selectStyle}
                        dropdownTextStyles={styles.selectTextColor}
                    />
                </View>
                <View style={styles.marginBottom}>
                    <SelectList
                        setSelected={(val: any) => setManufacturer(val)}
                        data={data}
                        save="value"
                        placeholder="Manufacturer"
                        inputStyles={styles.selectTextColor}
                        boxStyles={styles.selectStyle}
                        dropdownTextStyles={styles.selectTextColor}
                    />
                </View>
                <View style={styles.marginBottom}>
                    <SelectList
                        setSelected={(val: any) => setSupplier(val)}
                        data={data}
                        save="value"
                        placeholder="Supplier"
                        inputStyles={styles.selectTextColor}
                        boxStyles={styles.selectStyle}
                        dropdownTextStyles={styles.selectTextColor}
                    />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Product Id" mode='outlined' placeholder="Product Id" onChangeText={(prodNo:any) => setProductNo(prodNo)}/>
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Description" mode='outlined' placeholder="Description" onChangeText={(desc:any) => setDescription(desc)} />
                </View>

                <View style={styles.marginBottom}>
                    <TextInput label="Quantity" mode='outlined' placeholder="Quantity" onChangeText={(qty:any) => setQuantity(qty)}/>
                </View>
                <View style={styles.marginBottom}>
                    <SelectList
                        setSelected={(val: any) => setUnit(val)}
                        data={data}
                        save="value"
                        placeholder="Measurement Unit"
                        inputStyles={styles.selectTextColor}
                        boxStyles={styles.selectStyle}
                        dropdownTextStyles={styles.selectTextColor}
                    />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Min Stock" mode='outlined' placeholder="Min stock" onChangeText={(min:any) => setMinStock(min)} />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Max Stock" mode='outlined' placeholder="Max stock" onChangeText={(max:any) => setMaxStock(max)}/>
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Stock Date" mode='outlined' placeholder="stock Date" value={stockDate?stockDate:""} 
                    right={<TextInput.Icon icon={()=><IonIcon name="calendar-outline" size={30}/>} onPress={showStockDate} />}
                    />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Manufacturing Date" mode='outlined' placeholder="Manufacturing Date" value={manufacturingDate?manufacturingDate:""}  
                    right={<TextInput.Icon icon={()=><IonIcon name="calendar-outline" size={30}/>} onPress={showManufacturingDate} />}/>
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Expiry Date" mode='outlined' placeholder="Expiry Date" value={expiryDate?expiryDate:""} 
                    right={<TextInput.Icon icon={()=><IonIcon name="calendar-outline" size={30}/>} onPress={showExpiryDate} />}
                     />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Purchase price" mode='outlined' placeholder="Purchase price" />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Sale price" mode='outlined' placeholder="Sale price" onChangeText={(name:any) => setName(name)}/>
                </View>

                <View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                       
                    />
                </View>
                <View style={styles.marginBottom}>
                    <TouchableOpacity style={styles.touchableButton} onPress={() => {searchFromServer()}}>
                        <Text style={styles.healthPalWhite}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )

}

export default CreateItem;