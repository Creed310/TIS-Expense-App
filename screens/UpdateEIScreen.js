import { View, Text, Image, SafeAreaView, Pressable, TextInput} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import EI_Input from '../components/EI_Input/component'
import EI_Button from '../components/EI_Button/component'
//import { openDatabase } from 'react-native-sqlite-storage'
import UpdateScreen from './AddCategoryScreen'
import * as SQLite from 'expo-sqlite'
import EICat_Button from '../components/EICat_Button/component'

const db = SQLite.openDatabase("TISETApp.db")

const UpdateEIScreen = ({navigation, route}) => 
{
    const item = route.params.item.item
    const category = item.category
    const value = item.value
    const type = item.type
    const rc_id = item.rc_id

    const [updateEICategory, setupdateEICategory] = useState('')
    const [updateEIValue, setupdateEIValue] = useState(0)

    const updateEI = () =>
    {
        // db.transaction((txn) =>
        // {
        //     txn.executeSql('SELECT type, category FROM category_type_table', [], (trx, res) =>
        //     {
        //         const TypeCat = []
        //         for (let i = 0; i<res.rows.length; i++)
        //         {
        //             console.log("entry")
        //             TypeCat.push([res.rows.item(i).type, res.rows.item(i).category])       
        //         }
        //         if(TypeCat.includes([type, category]))
        //         {
        //             console.log("TypeCat")
        //         }
        //     })
        // })
        
        db.transaction((trx) =>
        {
            trx.executeSql('SELECT * FROM category_type_table',[], (trx, res) =>
            {
                for (let i = 0; i<res.rows.length; ++i)
                {
                    if(updateEICategory == res.rows.item(i).category && type == res.rows.item(i).type)
                    {
                        console.log(updateEICategory, updateEIValue, rc_id)
                        trx.executeSql('UPDATE exp_inc_table SET category = ?, value = ? WHERE rc_id = ?', [updateEICategory, updateEIValue, rc_id], (trx, res) =>
                        {
                            console.log('updated successfully')
                        }, () =>
                        {
                            console.log('was not updated')
                        })
                    }
                }
            },
            () =>
            {
                console.log("err")
            })
        })
    }
    
    const backgroundColor = type === 'expense' ? '#ffb3b3' : '#dcffcc'
    const textStr = type === 'expense' ? "spent" : "earned"
    
    useEffect(() =>
    {
        console.log(type)
    }, [])

    return (
    <SafeAreaView style = {[styles.container, {backgroundColor: backgroundColor}]}>
        <SafeAreaView>
            <Text style = {{fontSize: 20, textDecorationLine: 'underline'}}> You're about to modify an {type} where you have {textStr} ₹{value} in category '{category}'</Text>
        </SafeAreaView>
        
        <SafeAreaView style = {{marginBottom: 40}}>
            <Text style = {{fontSize: 20}}>
                Enter the new category
            </Text>
            <View>
                <TextInput style = {styles.input} placeholder = "New Category" onChangeText = {(newCat) =>
                {
                    setupdateEICategory(newCat)
                }}>
                </TextInput>
            </View>

            <Text style = {{fontSize: 20}}>
                Enter the new value
            </Text>
            <View>
                <TextInput style = {styles.input} placeholder = "New Value" onChangeText = {(newVal) =>
                {
                    setupdateEIValue(newVal)
                }}>
                </TextInput>
            </View>
            
        </SafeAreaView>

        <SafeAreaView>
                <Pressable onPress = {() => 
                                        {updateEI()
                                        // alert(`${type} modified successfully.`)
                                        navigation.pop()}}>
                    <Text style = {{backgroundColor: "grey", width: "100%"}}>
                        Update
                    </Text>
                </Pressable>
            </SafeAreaView>

    </SafeAreaView>
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
        input: {
            backgroundColor: 'white',
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }
    }
)
export default UpdateEIScreen

