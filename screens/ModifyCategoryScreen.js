import { View, Text, Image, SafeAreaView, Pressable, TouchableOpacity, TextInput, FlatList} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, Picker} from 'react-native'
import EI_Input from '../components/EI_Input/component'
import EI_Button from '../components/EI_Button/component'
//import { openDatabase } from 'react-native-sqlite-storage'
import * as SQLite from 'expo-sqlite'

import NavBar from '../components/NavBar/component'
const db = SQLite.openDatabase("TISETApp.db")

import SelectDropdown from 'react-native-select-dropdown'

const ModifyCategoryScreen = ({navigation, route}) => 
{

    const type = route.params.type
    const AddCategoryScreenText = `You're adding an ${type}.`
    const AlertScreenText = type === "expense" ? "Expense added." : "Income added."
    // const AddCategoryText = `Add a category of type ${type}`
    // const UpdateCategoryText = `Update a category of type ${type}`

    const top_background_color = type === 'expense' ? '#F2DAC9' : '#E1F2C9'
    // const border_color = type == 'expense' ? '#FC5B3E' : '#82C422'   
    const [newCategory, setnewCategory] = useState('') 
    const [oldCategory, setoldCategory] = useState('')
    const [ct_id, setCT_ID] = useState(0)

    const [oldCategoryFL, setOldCategoryFL] = useState([])

    const ei_value_text = type === "expense" ? "spent" : "earned"

    const view_old_categories = () =>
    {
        db.transaction((trx) =>
        {
            trx.executeSql('SELECT ct_id, category FROM category_type_table WHERE type = ?;', [type], 
            (tx, res) =>
            {
                if(res.rows.length > 0)
                {
                    const old_category_array = []
                    // console.log("result", res)
                    for (let i = res.rows.length-1; i>=0; i--)
                    {   
                        // console.log("getting pushed", res.rows.item(i).category)
                        old_category_array.push(res.rows.item(i).category)
                    }
                    setOldCategoryFL(old_category_array)
                }
            },
            () =>
            {
                console.log("could not find any categories")
            })
        })
    }

    //returning undefined when modifying and then returning to this screen.

    // const getCT_ID = () =>
    // {
    //     db.transaction((trx) =>
    //     {
    //         trx.executeSql('SELECT ct_id FROM category_type_table WHERE category = ? AND type = ?;', [oldCategory, type], 
    //         async (tx, res) => 
    //             {
    //                 if(res.rows.length>0)
    //                 {
    //                     console.log("found the category", res.rows.item(0).ct_id)
    //                     setCT_ID(res.rows.item(0).ct_id)
    //                 }
    //             }, 
    //         (err) =>
    //          {console.log("could not find the category")})
    //     })
    // }

    const getCT_ID = () =>
    {
        return new Promise((resolve, reject) =>
            {
                db.transaction((tx) => 
                {
                    tx.executeSql('SELECT ct_id FROM category_type_table WHERE category = ? AND type = ?;', [oldCategory, type],
                    (trx, res) => 
                    {
                        if(res.rows.length>0)
                        {
                            resolve(res)
                        }
                    },
                    () => 
                    {
                        console.log("could not set CT_ID")
                    })
            })
        })
    }
  
    const modify_category = () =>
    {
        db.transaction((trx) =>
        {
            trx.executeSql('UPDATE category_type_table SET category = ? where ct_id = ?;', [newCategory, ct_id],
            (tx, res) => 
            {
                if(res.rowsAffected > 0)
                {
                    console.log("updation successful")
                    alert('Updation of category successful.')
                    navigation.pop()
                }
            }, 
            (err) => {console.log("updation unsuccessful")})
        })
    }

    useEffect(() =>
    {
        view_old_categories()

        //getCT_ID()
        getCT_ID().then(
            (res) => 
            {
                setCT_ID(res.rows.item(0).ct_id)
                console.log("found the category", res.rows.item(0).ct_id)
            })
    }, [ct_id])
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
                        flex: 1, 
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
                        Modifying an {type} category.
                    </Text>

                    <View style = {{flex: 0.5, height: '50%', backgroundColor: 'white'}}>
                        <SelectDropdown 
                            data = {oldCategoryFL}
                            defaultButtonText = "Select"
                            onSelect = {(oldCategory) =>
                            {
                                    //get ct_id from searching for the table
                                
                                setCT_ID(getCT_ID())
                                setoldCategory(oldCategory)
                            }}
                            buttonStyle = {
                                {
                                    width: '75%'
                                }
                            }/>
                    </View>

                            <View>
                            <Text style = {{fontWeight: '300', fontSize: 20, paddingVertical: 30}}> 
                            What is the new name of the category?
                                </Text>
                                </View>
                    {/* <SelectDropdown 
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
                            data = {["aaa", "bbb"]}/> */}


                    <View style = 
                    {{
                        flexDirection: 'row',
                        alignItems: 'center', 
                        backgroundColor: 'white'}}>
                        
                        <TextInput
                        placeholder = "Enter a value"
                        onChangeText = 
                        {(newCategory) =>
                            {
                                setnewCategory(newCategory)
                            }
                        }
                        style = {
                            {
                                backgroundColor: '#f0f2f5',
                                borderWidth: 0.5,
                                padding: 10,
                                borderColor: 'black',
                                width: '70%'
                            }
                        }/>
                        

                        <TouchableOpacity style = {
                            {
                                backgroundColor: top_background_color, 
                                marginHorizontal: 20,
                                padding: 10,
                            }
                            }
                            onPress = {() =>{
                                                getCT_ID()
                                                modify_category()
                                            }}>
                            <Text> Modify </Text>
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

export default ModifyCategoryScreen



