import { View, Text, Image, SafeAreaView, Pressable, TouchableOpacity} from 'react-native'
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

const AddScreen = ({navigation, route}) => 
{
    // const type = route.params.type
    // const AddCategoryText = `Add a category of type ${type}`
    // const UpdateCategoryText = `Update a category of type ${type}`

    // const backgroundColor = type === 'expense' ? '#ffb3b3' : '#dcffcc'

    const [value, setValue] = useState(0)    
    const [category, setCategory] = useState('') 


    const insertToTable = () => 
    {
        // console.warn(value, category)
        if(!value)
        {
            alert("You need to enter an amount.")
            return
        }
        
        if(!category)
        {
            alert("You need to enter a valid category.")
            return
        }


        //IMPORTANT
        //here can check if category already exists or not.

        db.transaction((trx) =>
        {
            trx.executeSql('SELECT category, type FROM category_type_table', [], (trx, res) =>
            {
                for (let i = 0; i < res.rows.length; ++i)
                {
                    if(category == res.rows.item(i).category)
                    {
                        trx.executeSql('INSERT INTO exp_inc_table (type, value, category) VALUES (?, ?, ?)', [value, category], (tx, res) => { 
                            alert(`The has been added.`)
                            }, () => {console.log("err")})
                        return
                    }
                }
                console.log('not in Category-Type table')
                alert('Category does not exist.')
            },
            (err) =>
            {
                console.log("err")
            })
        })
        
        // if both exist, can make a transaction to the database.
        // db.transaction((txn) => 
        // {
        //     txn.executeSql('INSERT INTO exp_inc_table (type, value, category) VALUES (?, ?, ?)',
        //     [type, value, category], (trx, res) => 
        //     {
        //         console.log("success on insertion")
        //         alert("You have successfully added an entry!")
        //     }, (err) => {console.log("failure on insertion")})   
        // })
    }

    return (
            <View style = {{flex: 1, backgroundColor: 'grey'}}>
                <NavBar navigation = {navigation} homePage = {false} onPressLeft = {() => navigation.pop()}/>
                   
                    <View style =
                    {
                        {
                            backgroundColor: 'white',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 30,
                        }    
                    }>
                        <Text style = {{ fontSize: 25, textAlign: 'center', fontWeight: '500'}}>Adding an expense or income?</Text>
                    </View>
            
                <View style = {{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
                
                    <View style = {
                        {   
                            flex: 1, 
                            backgroundColor: '#E1F2C9',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '30%',
                            padding: 20,
                            marginHorizontal: 30
                        }}>
                            <TouchableOpacity>
                            <Image style = {
                                {
                                    tintColor: '#82C422',
                                    width: 100,
                                    height: 100

                                }}source = {require('../assets/clipart789909.png')} />
                            </TouchableOpacity>
                    </View>

                    <View style = {
                        {   
                            flex: 1, 
                            backgroundColor: '#F2DAC9',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '30%',
                            padding: 20,
                            marginHorizontal: 30
                        }}>
                            <TouchableOpacity>
                            <Image style = {
                                {
                                    tintColor: "#FC5B3E",
                                    width: 100,
                                    height: 100

                                }}source = {require('../assets/[removal.ai]_tmp-62a9bef33c7f9.png')} />
                            </TouchableOpacity>

                            <View style = {{backgroundColor: 'green'}}>

                            </View>
                    </View>
                    
                </View>
            </View> 

    //     <Text></Text>
        
    //     <View>

    //         <Text>
    //             What is the value?
    //         </Text>
        
    //         <EI_Input placeholder = "value" ktype = "numeric" 
    //         onChangeText = {(value) => {setValue(value)}}
                                        
    //                                     //  console.warn(value)}}
    //                                     //  warns instantaneously
    //                                     />
    //     </View>

    //     <View>
    //         <Text>
    //             What is the category?
    //         </Text>
    //         <EI_Input placeholder = "category" ktype = "default" 
    //         onChangeText = {(category) => {setCategory(category)}}/>

    //     </View>

    //     <View>
    //         <Pressable
    //             name = "Enter"
    //             onPress = {() => 
    //                             {
    //                                 insertToTable()
    //                                 navigation.navigate('Home')
    //                             }
    //                       }
                                    
    //             style = {{backgroundColor: 'grey'}}>
    //                 <Text> Enter </Text>
    //             </Pressable>
                
    //     </View>
    //     <View style = {{marginTop: 20}}>
            
    //         <EICat_Button onPress = {() =>
    //         {
    //             navigation.navigate('AddCategory')
    //         }} />

    //     </View>

    //     <View style = {{marginTop: 20}}>
            
    //         <EICat_Button onPress = {() =>
    //         {
    //             navigation.navigate('UpdateCategory')
    //         }} />

    //     </View>

    // </SafeAreaView>
  )
}



const styles = StyleSheet.create(
    {
        container: 
        {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }
)
export default AddScreen

