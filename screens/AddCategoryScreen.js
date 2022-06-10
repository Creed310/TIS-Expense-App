import React from "react";
import {Text, View, StyleSheet, TextInput, Pressable} from 'react-native'
import { useState, useEffect } from "react"
import * as SQLite from 'expo-sqlite'
import { openDatabase } from "expo-sqlite";

const db = SQLite.openDatabase("TISETApp.db")

const AddCategoryScreen = ({navigation, route}) =>
{

    const type = route.params.type
    const backgroundColor = type === 'expense' ? '#ffb3b3' : '#dcffcc'
    const [NewCategory, setNewCategory] = useState('')


    const checkCategory = () =>
    {
        db.transaction((trx) =>
        {   
            // should check for category and type, can't share the same memory pool when checking if the category already exists. 
            trx.executeSql('SELECT type, category FROM category_type_table', [], (trx, res) =>
            {
                for (let i = 0; i < res.rows.length; ++i)
                {
                    // can check here itself
                    if ((res.rows.item(i).category == NewCategory) && (res.rows.item(i).type == type))
                    {
                        alert("The category already exists for this type.")
                        return
                    }
                }
                // here check if the category and expense type already exist in the array
                // one way - look up the type column (array) first, see what categories are associated and then check.
            }, (err) => {console.log('error')})
        })
    }

    const addCategory = () =>
    {
        checkCategory() 

        if (!NewCategory)
        {
            alert('Please enter a new category.')
            return
        }
        db.transaction((trx) =>
        {
            trx.executeSql('INSERT INTO category_type_table (category, type) VALUES (?, ?)', [NewCategory, type], 
            () => { alert('The category has been successfully added.') 
                    console.log('the category has been successfully inserted') }, () => { console.log(' The category could not be inserted. ')})
        })
    }
                
    return(
        <View style = {[styles.container, {backgroundColor: backgroundColor}]}>
            <Text>
                Add a new {type} category 
            </Text>
            <TextInput 
                style = {styles.input}
                placeholder = "category name"
                keyboardType = 'default'
                onChangeText = {(NewCategory) =>
                {
                    setNewCategory(NewCategory)
                }}>
            </TextInput>
            <View>
                <Pressable 
                    style = {{backgroundColor: "grey"}}
                    onPress = {() =>
                    {
                        addCategory()
                        navigation.pop()
                    }}>
                    <Text> Add </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'white',
          },
          input: {
            backgroundColor: 'white',
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          },
    })

export default AddCategoryScreen