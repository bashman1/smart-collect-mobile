import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { View, Image, TouchableOpacity, Text, ScrollView, Appearance } from 'react-native';
import { styles } from '../../styles/Styles';
import { validatePhone, mailValidation, showToast, createAlert, setStatusBar, showLoading, localNotification } from '../../services/CommonService';
import { Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SelectList } from 'react-native-dropdown-select-list'

const screenWidth = Dimensions.get("window").width;

const CreateItem = (props: any) => {
    const [statusBar, changeStatusBar] = useState(setStatusBar('#5F9B42', 'light-content', true, false));

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [selected, setSelected] = React.useState("");

    // const [formData, setFormData]=useState({});
    const [name, setName]=useState(null);
    const [type, setType]=useState(null);

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
        // console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    useEffect(() => {

    });




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
                        setSelected={(val: any) => setSelected(val)}
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
                        setSelected={(val: any) => setSelected(val)}
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
                        setSelected={(val: any) => setSelected(val)}
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
                        setSelected={(val: any) => setSelected(val)}
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
                        setSelected={(val: any) => setSelected(val)}
                        data={data}
                        save="value"
                        placeholder="Supplier"
                        inputStyles={styles.selectTextColor}
                        boxStyles={styles.selectStyle}
                        dropdownTextStyles={styles.selectTextColor}
                    />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Product Id" mode='outlined' placeholder="Product Id" />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Description" mode='outlined' placeholder="Description" />
                </View>

                <View style={styles.marginBottom}>
                    <TextInput label="Quantity" mode='outlined' placeholder="Quantity" />
                </View>
                <View style={styles.marginBottom}>
                    <SelectList
                        setSelected={(val: any) => setSelected(val)}
                        data={data}
                        save="value"
                        placeholder="Measurement Unit"
                        inputStyles={styles.selectTextColor}
                        boxStyles={styles.selectStyle}
                        dropdownTextStyles={styles.selectTextColor}
                    />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Min Stock" mode='outlined' placeholder="Min stock" />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Max Stock" mode='outlined' placeholder="Max stock" />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Stock Date" mode='outlined' placeholder="stock Date" onFocus={showDatePicker} />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Manufacturing Date" mode='outlined' placeholder="Manufacturing Date" onFocus={showDatePicker} />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Expiry Date" mode='outlined' placeholder="Expiry Date" onFocus={showDatePicker} />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Purchase price" mode='outlined' placeholder="Purchase price" />
                </View>
                <View style={styles.marginBottom}>
                    <TextInput label="Sale price" mode='outlined' placeholder="Sale price" />
                </View>

                <View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        locale="en_GB"
                    />
                </View>
                <View style={styles.marginBottom}>
                    <TouchableOpacity style={styles.touchableButton} onPress={() => {checkOutSelected()}}>
                        <Text style={styles.healthPalWhite}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )

}

export default CreateItem;