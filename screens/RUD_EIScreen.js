import { View, Text, Image, SafeAreaView, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'

import * as SQLite from 'expo-sqlite'
import NavBar from '../components/NavBar/component'
const db = SQLite.openDatabase("TISETApp.db")

const RUD_EIScreen = ({navigation, route}) => 
{

    const item = route.params.item.item
    const type = item.type
    const category = item.category
    const value = item.value
    const date_of_entry = item.date_of_entry
    const rc_id = item.rc_id

    const ei_value_text = type === "expense" ? "Expense" : "Income"
    const RUD_EIScreenText = `${ei_value_text} Details`
    const AlertScreenText = type === "expense" ? "Expense added." : "Income added."
    // const AddCategoryText = `Add a category of type ${type}`
    // const UpdateCategoryText = `Update a category of type ${type}`

    const [valueChange, setValueChange] = useState(value)
    const [categoryChange, setCategoryChange] = useState(category)
    const [dateChange, setDateChange] = useState(date_of_entry)

    const top_background_color = type === 'expense' ? '#F2DAC9' : '#E1F2C9'
    const text_color = type == 'expense' ? '#FC5B3E' : '#82C422'

    const update_category = () =>
    {
        db.transaction((trx) =>
        {
            trx.executeSql('UPDATE exp_inc_table SET category = ? WHERE rc_id = ?;', [categoryChange, rc_id],
            () =>
            {
                //console.log("category updated succesfully")
                alert("Category updated successfully.")
                navigation.pop()
            },
            () =>
            {
                alert("Category could not be updated.")
                navigation.pop()
                //console.log('could not update category.')
            })
        })
    }

    const update_value = () =>
    {
        db.transaction((trx) =>
        {
            trx.executeSql('UPDATE exp_inc_table SET value = ? WHERE rc_id = ?;', [valueChange, rc_id],
            () =>
            {
                //console.log("category updated succesfully")
                alert("Value updated successfully.")
                navigation.pop()
            },
            () =>
            {
                alert("Value could not be updated.")
                navigation.pop()
                //console.log('could not update category.')
            })
        })
    }

    const update_date = () =>
    {
        db.transaction((trx) =>
        {
            trx.executeSql('UPDATE exp_inc_table SET date_of_entry = ? WHERE rc_id = ?;', [dateChange, rc_id],
            () =>
            {
                //console.log("category updated succesfully")
                alert("Date updated successfully.")
                navigation.pop()
            },
            () =>
            {
                alert("Date could not be updated.")
                navigation.pop()
                //console.log('could not update category.')
            })
        })
    }

    useEffect(() =>
    {
        console.log(item)
    })

    return (
            <View style = {{flex: 1, backgroundColor: 'grey'}}>

                <NavBar navigation = {navigation} homePage = {false} onPressLeft = {() => navigation.pop()} 
                />
                   
                    <View style =
                    {
                        {
                            flex: 0.15,
                            backgroundColor: "white",
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 30,
                        }    
                    }>
                        <Text style = {
                            { 
                                fontSize: 35, 
                                textAlign: 'center', 
                                fontWeight: '400',
                                color: text_color
                                }
                                }>{RUD_EIScreenText}</Text>
                    </View>
            
                <View style = {
                    {
                        flex: 1, 
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        justifyContent: 'center',

                        }
                    }>
                        <View style =
                        {
                            {
                                flex:1,
                                backgroundColor: 'white',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }
                        }>
                            <View style = 
                            {
                                {
                                    backgroundColor: 'white',
                                    marginHorizontal: 20,
                                    flexDirection: 'column'
                                }
                            }>
                                <Text
                                style = {{fontSize: 30, fontWeight: '200'}}>
                                Value
                                </Text>
                                <View style = {{flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <View style = {{flexDirection: 'row'}}>
                                        <Text style = {{fontWeight: '400', color: text_color, fontSize: 40}}>
                                        ₹
                                        </Text>
                                        <TextInput onEndEditing = {() => setValueChange(value)} 
                                                    onChangeText = {(newValue) => setValueChange(newValue)}
                                                    style = {{fontWeight: '300', color: text_color, fontSize: 40}}>
                                        <Text>
                                        {valueChange}
                                        </Text>
                                        </TextInput>
                                    </View>
                                   <TouchableOpacity onPress = {() => update_value()}>
                                    <Image 
                                    style = {{width: 30, height: 30, paddingRight: 40, marginRight: 10}}
                                    source = {require('../assets/add_box_FILL0_wght100_GRAD0_opsz40.png')} />
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                        
                        </View>
                            
                        <View style =
                        {
                            {
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                marginHorizontal: 20,
                                height: '50%'
                            }
                        }>
                            <View style = 
                            {
                                {
                                    backgroundColor: 'white',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }
                            }>
                                <View>
                                    <Text
                                    style = {{fontSize: 30, fontWeight: '200'}}>
                                    Category
                                    </Text>
                                    <TextInput onEndEditing = {() => setCategoryChange(category)} 
                                                    onChangeText = {(newCategory) => setCategoryChange(newCategory)}>
                                        <Text style = {{fontWeight: '300', color: text_color, fontSize: 40}}>
                                        {categoryChange}
                                        </Text>
                                    </TextInput>
                                </View>
                                <TouchableOpacity
                                    onPress = {() => update_category()}>
                                <Image 
                                    style = {{width: 30, height: 30, paddingRight: 40, marginRight: 10}}
                                    source = {require('../assets/add_box_FILL0_wght100_GRAD0_opsz40.png')} />
                                </TouchableOpacity>
                                
                                    
                            </View>
                            
                            <View>

                            </View>
                        </View>

                        
                 </View>

                  <View style = {
                    {
                        flex: 1, 
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        }
                    }>
                    <View style = {{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
                        <View style = {{height: '50%', marginHorizontal: 20, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style = {{flexDirection: 'column'}}>
                            <Text
                                    style = {{fontSize: 30, fontWeight: '200'}}>
                                    Date of {ei_value_text}
                                    </Text>
                                    <TextInput onEndEditing = {() => setDateChange(date_of_entry)} 
                                                    onChangeText = {(newDate) => setDateChange(newDate)}>
                                        <Text style = {{fontWeight: '300', color: text_color, fontSize: 40}}>
                                        {dateChange}
                                        </Text>
                                    </TextInput>

                            </View>
                            <TouchableOpacity
                                    onPress = {() => update_date()}>
                                <Image 
                                    style = {{width: 30, height: 30, paddingRight: 40, marginRight: 10}}
                                    source = {require('../assets/add_box_FILL0_wght100_GRAD0_opsz40.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style = {{flex: 1, backgroundColor: 'white'}}>

                    </View>
                 </View>


                 <SafeAreaView style = {
                     {

                         backgroundColor: "white"
                     }
                     }>
                 </SafeAreaView>
            </View> 
  )
}

export default RUD_EIScreen

