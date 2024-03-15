import React, { useState, useEffect } from 'react';
import { TextInput, Portal, Button, PaperProvider, Modal, DefaultTheme,  ActivityIndicator, MD2Colors  } from 'react-native-paper';
import { View, Image, Alert, TouchableOpacity, Text, Pressable, ScrollView, Appearance } from 'react-native';
import { styles } from '../../styles/Styles';
import { validatePhone, mailValidation, showToast, createAlert, setStatusBar, showLoading, localNotification } from '../../services/CommonService';
import { Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { SelectList } from 'react-native-dropdown-select-list'
import { postToServerWithToken, postToServer, getFromServerWithToken } from '../../services/RemoteService';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedInUser, GenericQueryAll, GenericDeleteAll } from '../../databases/allSchemas';
import Toast from 'react-native-toast-message';

const screenWidth = Dimensions.get("window").width;

const CreateItem = (props: any) => {
    const [statusBar, changeStatusBar] = useState(setStatusBar('#5F9B42', 'light-content', true, false));

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // const userData = useSelector((state:any) => state.userDataReducer.userDataList[0])
    const [userData, setUerData] = useState({});

    const [selected, setSelected] = React.useState("");


    const [typeModal, setVisible] = React.useState(false);
    const [carModal, setCatModal] = React.useState(false);
    const [subCarModal, setSubCatModal] = React.useState(false);
    const [gaugeModal, setGaugeModal] = React.useState(false);
    const [subManufactureModal, setManufacturerModal] = React.useState(false);
    const [supplierModal, setSupplierModal] = React.useState(false);
    const [unitModal, setUnitModal] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };



    const [name, setName] = useState(null);
    const [type, setType] = useState(null);
    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [gauge, setGauge] = useState(null);
    const [manufacturer, setManufacturer] = useState(null);
    const [supplier, setSupplier] = useState(null);
    const [measurementUnit, setUnit] = useState(null);
    const [productNo, setProductNo] = useState(null);
    const [description, setDescription] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [minStock, setMinStock] = useState(null);
    const [maxStock, setMaxStock] = useState(null);
    const [stockDate, setStockDate] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);
    const [manufacturingDate, setManufacturingDate] = useState(null);
    const [purchasePrice, setPurchasePrice] = useState(null);
    const [sellingPrice, setSellingPrice] = useState(null);
    const [productTypeList, setProductTypeList] = useState([]);
    const [productCategoryList, setProductCategoryList] = useState([]);
    const [productSubCategoryList, setProductSubCategoryList] = useState([]);
    const [productManufacturerList, setProductManufacturerList] = useState([]);
    const [productSupplierList, setProductSupplierList] = useState([]);
    const [productMeasurementList, setProductMeasurementList] = useState([]);
    const [productGaugeList, setProductGaugeList] = useState([]);

    const [typeName, setTypeName] = useState(null);
    const [typeDesc, setTypeDesc] = useState(null);

    const [catName, setCatName] = useState(null);
    const [catDesc, setCatDesc] = useState(null);

    const [subCatCat, setSubCatCat] = useState(null);
    const [subCatName, setSubCatName] = useState(null);
    const [subCatDesc, setSubCatDesc] = useState(null);

    const [gaugeName, setGaugeName] = useState(null);
    const [gaugeDesc, setGaugeDesc] = useState(null);

    const [countryList, setCountryList] = useState(null);

    const [manName, setManName] = useState(null);
    const [manCountry, setManCountry] = useState(null);
    const [manEmail, setManEmail] = useState(null);
    const [manAddress, setManAddress] = useState(null);
    const [manWebsite, setManWebsite] = useState(null);
    const [manContact, setManContact] = useState(null);
    const [manDesc, setManDesc] = useState(null);

    const [supName, setSupName] = useState(null);
    const [supCountry, setSupCountry] = useState(null);
    const [supEmail, setSupEmail] = useState(null);
    const [supAddress, setSupAddress] = useState(null);
    const [supWebsite, setSupWebsite] = useState(null);
    const [supContact, setSupContact] = useState(null);
    const [supDesc, setSupDesc] = useState(null);

    const [unitName, setUnitName] = useState(null);
    const [unitDesc, setUnitDesc] = useState(null);

    const [totalPurchase, setTotalPurchase] = useState(0);
    const [totalSales, setTotalSales] = useState(0);

    const [dateType, setDateType] = useState("");

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

    const checkOutSelected = () => {
        console.log(type)
    }
    const handleConfirm = (date: any) => {
        if (dateType == 'STOCK_DATE') {
            setStockDate(date.toString())
        } else if (dateType == 'MANUFACTURING_DATE') {
            setManufacturingDate(date.toString())
        } else if (dateType == 'EXPIRY_DATE') {
            setExpiryDate(date.toString())
        }
        hideDatePicker();
    };

    const determineDatePicker = (type: any) => {
        setDateType(type)
    }


    const searchFromServer = () => {

        let postData = {
            searchWord: "searchWord",
        }

        postToServerWithToken('get-suppliers', postData, "GET", userData?.token)?.then((data: any) => {
            // createAlert("Response", JSON.stringify(data))
            console.log(data);
            if (data.status) {
                // setSearchResult(data.returnObject);
            } else {

            }
        }).catch(err => {

        })
    }


    /**
     * get product types
     * @returns 
     */
    const getProductTypes = (userData) => {
        getFromServerWithToken('get-product-types', {}, 'get', userData?.token)?.then((data: any) => {
            if (data?.status) {
                setProductTypeList(data?.data.map((item: any) => { return { key: item.id, value: item.name } }))
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }


    /**
     * get product category
     */
    const getProductCategory = (userData) => {
        getFromServerWithToken('get-product-categories', {}, 'get', userData?.token)?.then((data: any) => {
            if (data?.status) {
                setProductCategoryList(data?.data.map((item: any) => { return { key: item.id, value: item.name } }))
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }


    const getProductSubCategory = (catId: any) => {
        getFromServerWithToken('get-product-sub-categories', {}, 'get', userData?.token)?.then((data: any) => {
            if (data?.status) {
                setProductSubCategoryList(data?.data.map((item: any) => { return { key: item.id, value: item.name } }))
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }


    const getManufacturers = (userData) => {
        getFromServerWithToken('get-manufacturers', {}, 'get', userData?.token)?.then((data: any) => {
            if (data?.status) {
                setProductManufacturerList(data?.data.map((item: any) => { return { key: item.id, value: item.name } }))
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }


    const getSuppliers = (userData) => {
        getFromServerWithToken('get-suppliers', {}, 'get', userData?.token)?.then((data: any) => {
            if (data?.status) {
                setProductSupplierList(data?.data.map((item: any) => { return { key: item.id, value: item.name } }))
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }

    const getMeasurementUnit = (userData) => {
        getFromServerWithToken('get-measurement-unit', {}, 'get', userData?.token)?.then((data: any) => {
            if (data?.status) {
                setProductMeasurementList(data?.data.map((item: any) => { return { key: item.id, value: item.name } }))
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }

    const getCountries = (userData) => {
        getFromServerWithToken('get-countries', {}, 'get', userData?.token)?.then((data: any) => {
            if (data?.status) {
                setCountryList(data?.data.map((item: any) => { return { key: item.id, value: item.name } }))
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }

    const getGauge = (userData) => {
        getFromServerWithToken('get-product-gauge', {}, 'get', userData?.token)?.then((data: any) => {
            if (data?.status) {
                setProductGaugeList(data?.data.map((item: any) => { return { key: item.id, value: item.name } }))
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }

    const onSubmitType = () => {
        let postData = {
            name: typeName,
            description: typeDesc,
            status: 'Active',
        }
        postToServerWithToken('create-product-type', postData, 'post', userData?.token)?.then((data: any) => {
            if (data?.status) {
                createAlert('Success', data?.message);
                setVisible(false)
                getProductTypes(userData);
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }

    const onSubmitCat = () => {
        let postData = {
            name: catName,
            description: catDesc,
            status: 'Active',
        }
        postToServerWithToken('create-product-category', postData, 'post', userData?.token)?.then((data: any) => {
            if (data?.status) {
                createAlert('Success', data?.message);
                setCatModal(false)
                getProductCategory(userData)
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }


    const onSubmitSubCat = () => {
        let postData = {
            category_id: subCatCat,
            name: subCatName,
            description: subCatDesc,
            status: 'Active',
        }
        postToServerWithToken('create-product-sub-category', postData, 'post', userData?.token)?.then((data: any) => {
            if (data?.status) {
                createAlert('Success', data?.message);
                setSubCatModal(false)
                getProductSubCategory();
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }

    const onSubmitGauge = () => {
        let postData = {
            name: gaugeName,
            description: gaugeDesc,
            status: "Active"
        }
        postToServerWithToken('create-product-gauge', postData, 'post', userData?.token)?.then((data: any) => {
            if (data?.status) {
                createAlert('Success', data?.message);
                setGaugeModal(false)
                getGauge(userData)
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }


    const onSubmitManufacturer = () => {
        let postData = {
            name: manName,
            country_id: manCountry,
            website: manWebsite,
            address: manAddress,
            email: manEmail,
            phone_number: manContact,
            description: manDesc,
            status: "Active",
        }

        postToServerWithToken('create-manufacturer', postData, 'post', userData?.token)?.then((data: any) => {
            if (data?.status) {
                createAlert('Success', data?.message);
                setManufacturerModal(false)
                getManufacturers(userData);
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }

    const onSubmitSupplier = () => {
        let postData = {
            name: supName,
            country_id: supCountry,
            website: supWebsite,
            address: supAddress,
            email: supEmail,
            phone_number: supContact,
            description: supDesc,
            status: "Active",
        }
        postToServerWithToken('create-supplier', postData, 'post', userData?.token)?.then((data: any) => {
            if (data?.status) {
                createAlert('Success', data?.message);
                setSupplierModal(false)
                getSuppliers(userData)
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }

    const onSubmitUnit = () => {
        let postData = {
            name: unitName,
            description: unitDesc,
            status: "Active"
        }
        postToServerWithToken('create-measurement-unit', postData, 'post', userData?.token)?.then((data: any) => {
            if (data?.status) {
                createAlert('Success', data?.message);
                setUnitModal(false)
                getMeasurementUnit(userData)
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }

    const onSubmit = () => {
        let postData = {
            name: name,
            category_id: category,
            sub_category_id: subCategory,
            manufacturer_id: manufacturer,
            supplier_id: supplier,
            product_no: productNo,
            description: description,
            quantity: quantity,
            min_quantity: minStock,
            max_quantity: maxStock,
            measurement_unit_id: measurementUnit,
            purchase_price: purchasePrice,
            date: new Date(stockDate),
            selling_price: sellingPrice,
            discount: null,
            manufactured_date: new Date(manufacturingDate),
            expiry_date: new Date(expiryDate),
            type_id: type,
            gauge_id: gauge,
        }
        console.log('***************************************')
        console.log(postData)

        postToServerWithToken('create-product', postData, 'post', userData?.token)?.then((data: any) => {
            if (data?.status) {
                createAlert('Success', data?.message);
                setName(null);
                setType(null);
                setCategory(null);
                setSubCategory(null);
                setGauge(null);
                setManufacturer(null);
                setSupplier(null);
                setUnit(null);
                setProductNo(null);
                setDescription(null);
                setQuantity(null);
                setMinStock(null);
                setMaxStock(null);
                setStockDate(null);
                setExpiryDate(null);
                setManufacturingDate(null);
                setPurchasePrice(null);
                setSellingPrice(null);
            } else {
                createAlert("Process Failed", data?.message);
            }
        }).catch(err => {

        })
    }


    const showStockDate = () => {
        determineDatePicker('STOCK_DATE')
        showDatePicker()
    }

    const showManufacturingDate = () => {
        determineDatePicker('MANUFACTURING_DATE')
        showDatePicker()
    }

    const showExpiryDate = () => {
        determineDatePicker('EXPIRY_DATE')
        showDatePicker()
    }

    const computeTotalPurchasePrice=()=>{
        setTotalPurchase(quantity*purchasePrice)
    }

    const computeTotalSalePrice=()=>{
        setTotalSales(quantity*sellingPrice)
    }

    const lightTheme = {
        ...DefaultTheme,
        mode: 'light',
    };


    useEffect(() => {
        GenericQueryAll(LoggedInUser).then((results) => {
            setUerData(results[0])
            getProductTypes(results[0]);
            getProductCategory(results[0]);
            getManufacturers(results[0]);
            getSuppliers(results[0]);
            getMeasurementUnit(results[0]);
            getGauge(results[0]);
            getCountries(results[0]);
        }).catch((error) => { });

    }, []);




    return (
        <PaperProvider theme={lightTheme}>
            <ScrollView style={styles.backgroundWhite}>

                <View style={[styles.padding]}>
                    <View style={styles.marginBottom}>
                        <TextInput label="Name" mode='outlined' placeholder="Name" onChangeText={(name: any) => setName(name)} />
                    </View>
                    <View style={[styles.marginBottom, styles.row]}>
                        <View style={styles.flex09}>
                            <SelectList
                                setSelected={(val: any) => setType(val)}
                                data={productTypeList}
                                save="key"
                                placeholder="Type"
                                inputStyles={styles.selectTextColor}
                                boxStyles={styles.selectStyle}
                                dropdownTextStyles={styles.selectTextColor}
                            />
                        </View>
                        <View style={styles.flex01}>
                            <TouchableOpacity style={styles.touchableButton} onPress={showModal}>
                                <IonIcon color="#fff" name="add" size={20} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={[styles.marginBottom, styles.row]}>
                        <View style={styles.flex09}>
                            <SelectList
                                setSelected={(val: any) => setCategory(val)}
                                data={productCategoryList}
                                save="key"
                                placeholder="Category"
                                inputStyles={styles.selectTextColor}
                                boxStyles={styles.selectStyle}
                                dropdownTextStyles={styles.selectTextColor}
                            />
                        </View>
                        <View style={styles.flex01}>
                            <TouchableOpacity style={styles.touchableButton} onPress={() => setCatModal(true)}>
                                <IonIcon color="#fff" name="add" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.marginBottom, styles.row]}>
                        <View style={styles.flex09}>
                            <SelectList
                                setSelected={(val: any) => setSubCategory(val)}
                                data={productSubCategoryList}
                                save="key"
                                placeholder="Sub Category"
                                inputStyles={styles.selectTextColor}
                                boxStyles={styles.selectStyle}
                                dropdownTextStyles={styles.selectTextColor}
                            />
                        </View>
                        <View style={styles.flex01}>
                            <TouchableOpacity style={styles.touchableButton} onPress={() => setSubCatModal(true)}>
                                <IonIcon color="#fff" name="add" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.marginBottom, styles.row]}>
                        <View style={styles.flex09}>
                            <SelectList
                                setSelected={(val: any) => setGauge(val)}
                                data={productGaugeList}
                                save="key"
                                placeholder="Gauge"
                                inputStyles={styles.selectTextColor}
                                boxStyles={styles.selectStyle}
                                dropdownTextStyles={styles.selectTextColor}
                            />
                        </View>
                        <View style={styles.flex01}>
                            <TouchableOpacity style={styles.touchableButton} onPress={() => setGaugeModal(true)}>
                                <IonIcon color="#fff" name="add" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.marginBottom, styles.row]}>
                        <View style={styles.flex09}>
                            <SelectList
                                setSelected={(val: any) => setManufacturer(val)}
                                data={productManufacturerList}
                                save="key"
                                placeholder="Manufacturer"
                                inputStyles={styles.selectTextColor}
                                boxStyles={styles.selectStyle}
                                dropdownTextStyles={styles.selectTextColor}
                            />
                        </View>
                        <View style={styles.flex01}>
                            <TouchableOpacity style={styles.touchableButton} onPress={() => setManufacturerModal(true)}>
                                <IonIcon color="#fff" name="add" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.marginBottom, styles.row]}>
                        <View style={styles.flex09}>
                            <SelectList
                                setSelected={(val: any) => setSupplier(val)}
                                data={productSupplierList}
                                save="key"
                                placeholder="Supplier"
                                inputStyles={styles.selectTextColor}
                                boxStyles={styles.selectStyle}
                                dropdownTextStyles={styles.selectTextColor}
                            />
                        </View>
                        <View style={styles.flex01}>
                            <TouchableOpacity style={styles.touchableButton} onPress={() => setSupplierModal(true)}>
                                <IonIcon color="#fff" name="add" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.marginBottom}>
                        <TextInput label="Product Id" mode='outlined' placeholder="Product Id" onChangeText={(prodNo: any) => setProductNo(prodNo)} />
                    </View>
                    <View style={styles.marginBottom}>
                        <TextInput label="Description" mode='outlined' placeholder="Description" onChangeText={(desc: any) => setDescription(desc)} />
                    </View>

                    <View style={styles.marginBottom}>
                        <TextInput keyboardType='numeric' label="Quantity" mode='outlined' placeholder="Quantity" onChangeText={(qty: any) =>{ setQuantity(qty); computeTotalSalePrice(); computeTotalPurchasePrice()}} />
                    </View>
                    <View style={[styles.marginBottom, styles.row]}>
                        <View style={styles.flex09}>
                            <SelectList
                                setSelected={(val: any) => setUnit(val)}
                                data={productMeasurementList}
                                save="key"
                                placeholder="Measurement Unit"
                                inputStyles={styles.selectTextColor}
                                boxStyles={styles.selectStyle}
                                dropdownTextStyles={styles.selectTextColor}
                            />
                        </View>
                        <View style={styles.flex01}>
                            <TouchableOpacity style={styles.touchableButton} onPress={() => setUnitModal(true)}>
                                <IonIcon color="#fff" name="add" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.marginBottom}>
                        <TextInput keyboardType='numeric' label="Min Stock" mode='outlined' placeholder="Min stock" onChangeText={(min: any) => setMinStock(min)} />
                    </View>
                    <View style={styles.marginBottom}>
                        <TextInput keyboardType='numeric' label="Max Stock" mode='outlined' placeholder="Max stock" onChangeText={(max: any) => setMaxStock(max)} />
                    </View>
                    <View style={styles.marginBottom}>
                        <TextInput label="Stock Date" mode='outlined' placeholder="stock Date" value={stockDate ? stockDate : ""}
                            right={<TextInput.Icon icon={() => <IonIcon color={(Appearance.getColorScheme() === 'dark') ? '#000' : ''} name="calendar-outline" size={30} />} onPress={showStockDate} />}
                        />
                    </View>
                    <View style={styles.marginBottom}>
                        <TextInput label="Manufacturing Date" mode='outlined' placeholder="Manufacturing Date" value={manufacturingDate ? manufacturingDate : ""}
                            right={<TextInput.Icon icon={() => <IonIcon color={(Appearance.getColorScheme() === 'dark') ? '#000' : ''} name="calendar-outline" size={30} />} onPress={showManufacturingDate} />} />
                    </View>
                    <View style={styles.marginBottom}>
                        <TextInput label="Expiry Date" mode='outlined' placeholder="Expiry Date" value={expiryDate ? expiryDate : ""}
                            right={<TextInput.Icon icon={() => <IonIcon color={(Appearance.getColorScheme() === 'dark') ? '#000' : ''} name="calendar-outline" size={30} />} onPress={showExpiryDate} />}
                        />
                    </View>
                    <View style={[styles.marginBottom, styles.row]}>
                        <View style={styles.flex06}>
                            <TextInput keyboardType='numeric' label="Unit Purchase price" mode='outlined' placeholder="Unit Purchase price" onChangeText={(price: any) => {setPurchasePrice(price); computeTotalPurchasePrice()}} />
                        </View>
                        <View style={styles.flex04}>
                        {/* <TextInput label="Total Purchase price" mode='outlined' disabled={true} value={totalPurchase?totalPurchase:""} placeholder="Total Purchase price" onChangeText={(price: any) => {setTotalPurchase(price)}} /> */}
                        <Text>{totalPurchase}</Text>
                        </View>
                    </View>
                    <View style={[styles.marginBottom, styles.row]}>
                        <View style={styles.flex06}>
                            <TextInput keyboardType='numeric' label="Unit Sale price" mode='outlined'  placeholder="Unit Sale price" onChangeText={(price: any) => {setSellingPrice(price); computeTotalSalePrice()}} />
                        </View>
                        <View style={styles.flex04}>
                        {/* <TextInput  label="Total Sale price" disabled={true} mode='outlined' value={totalSales?totalSales:totalSales} placeholder="Unit sale price" onChangeText={(price: any) => setTotalSales(price)} /> */}
                        <Text>{totalSales}</Text>
                        </View>
                        {/* <ActivityIndicator animating={true} color={MD2Colors.red800} /> */}
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
                        <TouchableOpacity style={styles.touchableButton} onPress={() => { onSubmit() }}>
                            <Text style={styles.healthPalWhite}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Modals starts here  */}
                    <View>
                        <Portal>
                            <Modal visible={typeModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <Text>Create Product Type.</Text>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Name" mode='outlined' placeholder="Name" onChangeText={(name: any) => setTypeName(name)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Description" mode='outlined' placeholder="Description" onChangeText={(desc: any) => setTypeDesc(desc)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TouchableOpacity style={styles.touchableButton} onPress={() => { onSubmitType() }}>
                                        <Text style={styles.healthPalWhite}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <Modal visible={carModal} onDismiss={() => setCatModal(false)} contentContainerStyle={containerStyle}>
                                <Text>Create Product Category.</Text>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Name" mode='outlined' placeholder="Name" onChangeText={(name: any) => setCatName(name)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Description" mode='outlined' placeholder="Description" onChangeText={(desc: any) => setCatDesc(desc)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TouchableOpacity style={styles.touchableButton} onPress={() => { onSubmitCat() }}>
                                        <Text style={styles.healthPalWhite}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <Modal visible={subCarModal} onDismiss={() => setSubCatModal(false)} contentContainerStyle={containerStyle}>
                                <Text>Create Product Sub Category.</Text>
                                <View style={[styles.marginBottom]}>
                                    <SelectList
                                        setSelected={(val: any) => setSubCatCat(val)}
                                        data={productCategoryList}
                                        save="key"
                                        placeholder="Category"
                                        inputStyles={styles.selectTextColor}
                                        boxStyles={styles.selectStyle}
                                        dropdownTextStyles={styles.selectTextColor}
                                    />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Name" mode='outlined' placeholder="Name" onChangeText={(name: any) => setSubCatName(name)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Description" mode='outlined' placeholder="Description" onChangeText={(desc: any) => setSubCatDesc(desc)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TouchableOpacity style={styles.touchableButton} onPress={() => { onSubmitSubCat() }}>
                                        <Text style={styles.healthPalWhite}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <Modal visible={gaugeModal} onDismiss={() => setGaugeModal(false)} contentContainerStyle={containerStyle}>
                                <Text>Create Product Gauge.</Text>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Name" mode='outlined' placeholder="Name" onChangeText={(name: any) => setGaugeName(name)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Description" mode='outlined' placeholder="Description" onChangeText={(desc: any) => setGaugeDesc(desc)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TouchableOpacity style={styles.touchableButton} onPress={() => { onSubmitGauge() }}>
                                        <Text style={styles.healthPalWhite}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <Modal visible={subManufactureModal} onDismiss={() => setManufacturerModal(false)} contentContainerStyle={containerStyle}>
                                <Text>Create Product Manufacturer.</Text>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Name" mode='outlined' placeholder="Name" onChangeText={(name: any) => setManName(name)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <SelectList
                                        setSelected={(val: any) => setManCountry(val)}
                                        data={countryList}
                                        save="key"
                                        placeholder="Country"
                                        inputStyles={styles.selectTextColor}
                                        boxStyles={styles.selectStyle}
                                        dropdownTextStyles={styles.selectTextColor}
                                    />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Email" mode='outlined' placeholder="Email" onChangeText={(email: any) => setManEmail(email)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Address" mode='outlined' placeholder="Address" onChangeText={(address: any) => setManAddress(address)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Website" mode='outlined' placeholder="Website" onChangeText={(web: any) => setManWebsite(web)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Phone No." mode='outlined' placeholder="Phone No." onChangeText={(contact: any) => setManContact(contact)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Description" mode='outlined' placeholder="Description" onChangeText={(desc: any) => setManDesc(desc)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TouchableOpacity style={styles.touchableButton} onPress={() => { onSubmitManufacturer() }}>
                                        <Text style={styles.healthPalWhite}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <Modal visible={supplierModal} onDismiss={() => setSupplierModal(false)} contentContainerStyle={containerStyle}>
                                <Text>Create Product Supplier.</Text>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Name" mode='outlined' placeholder="Name" onChangeText={(name: any) => setSupName(name)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <SelectList
                                        setSelected={(val: any) => setSupCountry(val)}
                                        data={countryList}
                                        save="key"
                                        placeholder="Country"
                                        inputStyles={styles.selectTextColor}
                                        boxStyles={styles.selectStyle}
                                        dropdownTextStyles={styles.selectTextColor}
                                    />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Email" mode='outlined' placeholder="Email" onChangeText={(email: any) => setSupEmail(email)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Address" mode='outlined' placeholder="Address" onChangeText={(address: any) => setSupAddress(address)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Website" mode='outlined' placeholder="Website" onChangeText={(web: any) => setSupWebsite(web)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Phone No." mode='outlined' placeholder="Phone No." onChangeText={(contact: any) => setSupContact(contact)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Description" mode='outlined' placeholder="Description" onChangeText={(desc: any) => setSupDesc(desc)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TouchableOpacity style={styles.touchableButton} onPress={() => { onSubmitSupplier() }}>
                                        <Text style={styles.healthPalWhite}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <Modal visible={unitModal} onDismiss={() => setUnitModal(false)} contentContainerStyle={containerStyle}>
                                <Text>Create Product Unit.</Text>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Name" mode='outlined' placeholder="Name" onChangeText={(name: any) => setUnitName(name)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TextInput label="Description" mode='outlined' placeholder="Description" onChangeText={(desc: any) => setUnitDesc(desc)} />
                                </View>
                                <View style={styles.marginBottom}>
                                    <TouchableOpacity style={styles.touchableButton} onPress={() => { onSubmitUnit() }}>
                                        <Text style={styles.healthPalWhite}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </Portal>
                    </View>
                    {/* Modals ends here  */}

                </View>
            </ScrollView>
        </PaperProvider>
    )

}

export default CreateItem;