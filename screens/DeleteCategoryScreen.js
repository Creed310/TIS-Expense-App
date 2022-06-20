import { View, Text, Image, SafeAreaView, Pressable, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, Picker} from 'react-native'
import EI_Input from '../components/EI_Input/component'
import EI_Button from '../components/EI_Button/component'
//import { openDatabase } from 'react-native-sqlite-storage'
import * as SQLite from 'expo-sqlite'
import EICat_Button from '../components/EICat_Button/component'
import NavBar from '../components/NavBar/component'
const db = SQLite.openDatabase("TISETApp.db")

import SelectDropdown from 'react-native-select-dropdown'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'

const DeleteCategoryScreen = ({navigation, route}) => 
{

    const type = route.params.type
    const AddCategoryScreenText = `You're adding an ${type}.`
    const AlertScreenText = type === "expense" ? "Expense added." : "Income added."
    // const AddCategoryText = `Add a category of type ${type}`
    // const UpdateCategoryText = `Update a category of type ${type}`

    const top_background_color = type === 'expense' ? '#F2DAC9' : '#E1F2C9'
    // const border_color = type == 'expense' ? '#FC5B3E' : '#82C422'   
    const [newCategory, setnewCategory] = useState('') 
    const [does_category_exist, setDCE] = useState()

    const ei_value_text = type === "expense" ? "spent" : "earned"


    return (
            <View style = {{flex: 1, backgroundColor: top_background_color}}>

                <NavBar navigation = {navigation} homePage = {false} onPressLeft = {() => navigation.pop()} />
                   
                    <View style =
                    {
                        {
                            backgroundColor: top_background_color,
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 45,
                        }    
                    }>
                    </View>
            
                <View style = {
                    {
                        flex: 0.5, 
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingLeft: 20

                        }
                    }>

                    <Text
                    style = {
                        {
                            fontSize: 20,
                            fontWeight: '300',
                            marginVertical: 35,
                        }
                    }>
                        Deleting an {type} category.
                    </Text>

                    <View style = {{flexDirection: 'row', flex: 0.5, height: '50%', backgroundColor: 'white'}}>
                        <SelectDropdown 
                            defaultButtonText = "Select"
                            buttonStyle = {
                                {
                                    width: '70%',
                                    height: '70%'
                                }
                            }/>

                        <TouchableOpacity style = {
                            {
                                backgroundColor: top_background_color, 
                                marginHorizontal: 20,
                                height: '70%',
                                justifyContent: 'center',
                                paddingHorizontal: 10
                            }
                            }
                            onPress = {() =>{
                                            delete_category()
                                            }}>
                            <Text> Delete </Text>
                        </TouchableOpacity>
                    </View>
                 </View>

                 <SafeAreaView style = {
                     {
                         flex: 1,
                         backgroundColor: "white"
                     }
                     }>
                     <View style = {
                         {
                             flex: 1,
                             backgroundColor: "#f5f5f5"
                         }
                     }>

                        
                        </View>
                 </SafeAreaView>
            </View> 
  )
}

export default DeleteCategoryScreen

