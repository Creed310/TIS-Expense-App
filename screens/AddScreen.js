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

const AddScreen = ({navigation, route}) => 
{
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const date_of_entry = mm + '-' + dd + '-' + yyyy

    const type = route.params.type
    const AddScreenText = `You're adding an ${type}.`
    const AlertScreenText = type === "expense" ? "Expense added." : "Income added."
    // const AddCategoryText = `Add a category of type ${type}`
    // const UpdateCategoryText = `Update a category of type ${type}`

    const top_background_color = type === 'expense' ? '#F2DAC9' : '#E1F2C9'
    // const border_color = type == 'expense' ? '#FC5B3E' : '#82C422'
    const [value, setValue] = useState(0)    
    const [category, setCategory] = useState('') 

    const ei_value_text = type === "expense" ? "spent" : "earned"

    const addEI = () =>
    {
            if(!value)
        {
            alert("You need to enter a value.")
            return
        }

            if(!category)
        {
            alert("You need to select a category.")
            return
        }

        db.transaction((trx) =>
        {
            trx.executeSql('INSERT INTO exp_inc_table (type, value, category, date_of_entry) VALUES (?, ?, ?, ?);', [type, value, category, date_of_entry],
            () =>
            {
                alert(AlertScreenText)
                navigation.pop()
            },
            () =>
            {
                alert(`Could not add ${type}.`)
                navigation.pop()
            })
            
        })
    }

    let category_menu = []

    const view_category_menu = () =>
    {
        db.transaction((trx) =>
        {
            trx.executeSql('SELECT category FROM category_type_table WHERE type = ?', [type],
            (tx, res) =>
            {
                for (let i = 0; i<res.rows.length; i++)
                {
                    category_menu.push(res.rows.item(i).category)
                }
                console.log("viewing successful")
            },
            () =>
            {
                console.log("cannot view")
            })
        })
    }

    useEffect(
        () =>
        {  // view_category_menu()
            console.log(date_of_entry)
            db.transaction((trx) =>
            {
                trx.executeSql('SELECT * FROM category_type_table', [], (tx, res) =>
                {
                    console.log(res)
                },
                (err) =>
                {
                    console.log("cannot")
                })
            })
        }, [category_menu]
    )
    return (
            <View style = {{flex: 1, backgroundColor: 'grey'}}>

                <NavBar navigation = {navigation} homePage = {false} onPressLeft = {() => navigation.pop()} 
                onPressRight = 
                {() =>
                    {
                        addEI()
                    }
                }/>
                   
                    <View style =
                    {
                        {
                            backgroundColor: top_background_color,
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 30,
                        }    
                    }>
                        <Text style = {
                            { 
                                fontSize: 25, 
                                textAlign: 'center', 
                                fontWeight: '500'
                                }
                                }>{AddScreenText}</Text>
                    </View>
            
                <View style = {
                    {
                        flex: 1, 
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        justifyContent: 'center',

                        }
                    }>

                    <Text
                    style = {
                        {
                            fontSize: 20,
                            fontWeight: '300',
                            marginLeft: 25,
                            marginTop: 30
                        }
                    }>
                        Select an {type} category.
                    </Text>
                    <View style = {
                        {
                            flex: 1,
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            width: '100%',
                            marginBottom: 20,
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }
                    }> 
                        
                        <SelectDropdown 
                            defaultButtonText = "Select"
                            disabled = {false}
                            onSelect = {(category) =>
                            {
                                setCategory(category)
                            }}
                            buttonStyle = {{
                                backgroundColor: '#edeff0',
                                width: '75%',
                            }}
                            dropdownIconPosition = 'right'
                            data = {["aaa", "bbb"]}/>

                            <View>
                                <Menu>
                                    <MenuTrigger> 
                                    <Image style = {{height: 25 ,width: 25}}
                                     source = {require('../assets/17764.png')}/>
                                    </MenuTrigger>

                                    <MenuOptions>
                                        <MenuOption text = 'Add a category' onSelect = {() => navigation.navigate('AddCategory', {type: type})}
                                                                                                 style = {{padding: 15}}/>
                                        <MenuOption text = 'Modify a category' onSelect = {() => navigation.navigate('ModifyCategory', {type: type})}
                                                                                style = {{padding: 15}}/>
                                        <MenuOption text = 'Delete a category' onSelect = {() => navigation.navigate('DeleteCategory', {type: type})} 
                                                                                style = {{padding: 15}}/>
                                    </MenuOptions>

                                </Menu>
                            </View>
                            

                        {/* <SelectDropdown renderDropdownIcon = 
                        {() => <Image style = {{height: 25 ,width: 25}}
                            source = {require('../assets/17764.png')}/>} 
                            data = {["adada", "bababa"]} 
                            buttonStyle = {{width: 40}}
                            dropdownStyle = {{width: '50%'}}
                            
                            rowStyle = {{}}/> */}

                        
                
                    </View>
                    <View style = {
                        {
                            backgroundColor: 'white',
                            flexDirection: 'column',
                            flex: 1,
                            justifyContent: 'space-evenly',
                        }
                    }>
                        <Text style = {
                            {
                                fontSize: 20,
                                marginLeft: 25,
                                marginBottom: 15,
                                fontWeight: '300',
                            }
                        }>
                            How much have you {ei_value_text}?
                        </Text>

                            <View style =
                            {
                                {
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginLeft: 25,
                                    marginBottom: 40,
                                    paddingTop: 25
                                }
                            }>
                                <Text 
                                style = 
                                {
                                    {
                                        fontSize: 18,
                                        paddingRight: 18
                                    }
                                }>
                                ₹
                                    </Text>
                                <TextInput
                                    placeholder = "Enter a value"
                                    onChangeText = 
                                    {(value) =>
                                        {
                                            setValue(value)
                                        }
                                    }
                                    style = {
                                        {
                                            //marginTop: 30,
                                            //marginBottom: 50,
                                            //marginLeft: 25,
                                            backgroundColor: '#f0f2f5',
                                            borderWidth: 0.5,
                                            padding: 10,
                                            width: '50%',
                                            height: '100%'
                                        }
                                    }/>
                            </View>
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

export default AddScreen

