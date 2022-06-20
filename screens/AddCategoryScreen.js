import { View, Text, Image, SafeAreaView, Pressable, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'

//import { openDatabase } from 'react-native-sqlite-storage'
import * as SQLite from 'expo-sqlite'
import NavBar from '../components/NavBar/component'
const db = SQLite.openDatabase("TISETApp.db")


const AddCategoryScreen = ({navigation, route}) => 
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

    // QUESTION: ASYNCHRONOUS WAITING WHEN QUERYING THE DATABASE.

    // const check_existing_category = () =>
    // {
    //     // console.log("when clicking check existing category", newCategory)
    //     db.transaction(async (trx) =>
    //     {
    //         trx.executeSql('SELECT category FROM category_type_table WHERE type = ? AND category = ?', [type, newCategory], 
    //         async (tx, res) =>
    //         {
    //             console.log(res)
    //             if(res.rows.length > 0)
    //             {
    //                 // there are rows for which this category exists.

    //                 setDCE(true)
    //             }
    //             else if (res.rows.length == 0)
    //             {
    //                 // there are no rows for this particular category

    //                 setDCE(false)
    //             }
    //         }, 
    //         (err) =>
    //         {
    //             alert("The category either exists or could not be added.")
    //         })
            
    //     })
    // }

    const add_new_category = () =>
    {
        // if(does_category_exist)
        // {
        //     console.log("category exists, CANNOT be added")
        // }
        // else
        {
            // console.log("category does not exist, CAN be added")
            db.transaction((trx) =>
            {
                trx.executeSql('INSERT INTO category_type_table (type, category) VALUES (?, ?)', [type, newCategory],
                (tx, res) =>
                {
                    alert('New category added succesfully.')
                    navigation.pop()
                    //console.log("added")
                },
                () =>
                {
                    alert('New category could not be added.')
                    navigation.pop()
                    // console.log("could not be added")
                })
            })

        }
        
    }

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
                        Adding a new {type} category.
                    </Text>

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
                                console.log("this is the new category", newCategory)
                                // check_existing_category()
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
                                marginHorizontal: 30,
                                padding: 10,
                            }
                            }
                            onPress = {() =>{
                                            add_new_category()
                                            }}>
                            <Text> Add </Text>
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

export default AddCategoryScreen

