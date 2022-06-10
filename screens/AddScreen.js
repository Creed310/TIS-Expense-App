import { View, Text, Image, SafeAreaView, Pressable} from 'react-native'
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

 

const AddScreen = ({navigation, route}) => 
{

    const isCategoryPresent = (category) =>
    {
        const Categories = []
        db.transaction((txn) =>
        {
            txn.executeSql('SELECT category from exp_inc_table', [], (trx, res) =>
            {
                    for (let i = 0; i<res.rows.length; i++)
                    {
                        Categories.push(res.rows.item(i).category)
                    }            
            })
        })
        //return (Categories.includes(category))
    }

    const insertToTable = () => 
    {
        // console.warn(value, category)
        if(!value)
        {
            alert("You need to enter an amount.")
            return
        }
        
        //IMPORTANT
        //here can check if category already exists or not.

        if(!category)
        {
            alert("You need to enter a valid category.")
            return
        }

        // if both exist, can make a transaction to the database.
        db.transaction((txn) => 
        {
            txn.executeSql('INSERT INTO exp_inc_table (type, value, category) VALUES (?, ?, ?)',
            [type, value, category], (trx, res) => 
            {
                console.log("success on insertion")
                alert("You have successfully added an entry!")
            }, (err) => {console.log("failure on insertion")})       
        })
    }

    const type = route.params.type
    const AddCategoryText = `Add a category of type ${type}`
    const UpdateCategoryText = `Update a category of type ${type}`

    const backgroundColor = type === 'expense' ? '#ffb3b3' : '#dcffcc'

    const [value, setValue] = useState(0)    
    const [category, setCategory] = useState('') 

    return (
    <SafeAreaView style = {[styles.container, {backgroundColor: backgroundColor}]}>
        <Text>{type}</Text>
        
        <View>

            <Text>
                What is the {type} value?
            </Text>
            <EI_Input placeholder = "value" ktype = "numeric" 
            onChangeText = {(value) => {setValue(value)}}
                                        
                                        //  console.warn(value)}}
                                        //  warns instantaneously
                                        />
        </View>

        <View>
            <Text>
                What is the {type} category?
            </Text>
            <EI_Input placeholder = "category" ktype = "default" 
            onChangeText = {(category) => {setCategory(category)}}/>

        </View>

        <View>
            <Pressable
                name = "Enter"
                onPress = {() => 
                                {
                                    insertToTable()
                                    navigation.navigate('Home')
                                }
                          }
                                    
                style = {{backgroundColor: 'grey'}}>
                    <Text> Enter </Text>
                </Pressable>
                
        </View>
        <View style = {{marginTop: 20}}>
            
            <EICat_Button text = {AddCategoryText} onPress = {() =>
            {
                navigation.navigate('AddCategory', {type: type})
            }} />

        </View>

        <View style = {{marginTop: 20}}>
            
            <EICat_Button text = {UpdateCategoryText} onPress = {() =>
            {
                navigation.navigate('UpdateCategory', {type: type})
            }} />

        </View>

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
    }
)
export default AddScreen

