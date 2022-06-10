import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, TextInput, Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("TISETApp.db")

const UpdateCategoryValueScreen = ({navigation, route}) =>
{
    //QUESTION have to dereference twice? why is it getting passed like this

    const item = route.params.item.item
    const type = item.type
    const OldCategory = item.category
    const id = item.id

    const backgroundColor = type === 'expense' ? '#ffb3b3' : '#dcffcc'

    const [UpdateCategoryValue, setUpdateCategoryValue] = useState('')
    useEffect(() =>
    {
    })

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
                    if ((res.rows.item(i).category == UpdateCategoryValue) && (res.rows.item(i).type == type))
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

    const updateCategory = () =>
    {
        checkCategory()

        db.transaction((trx) =>
        {
            trx.executeSql('UPDATE category_type_table SET category = ? WHERE id = ?', [UpdateCategoryValue, id], () =>
            {
                console.log(UpdateCategoryValue);
                alert("The category has been successfully modified.")
            },
            () =>
            {
                alert("The category could not be modified.")
            })
        })
        navigation.pop()
    }
    return (
        <SafeAreaView style = {[styles.container, {backgroundColor: backgroundColor}]}>
            <Text>
                You are about to modify
                <Text> </Text>
                <Text style = {{fontWeight: 'bold'}}>
                    {OldCategory}
                </Text>
            </Text>
            <View>
                <TextInput style = {styles.input} placeholder = "New Category Name" onChangeText = {(NewCategory) =>
                {
                    setUpdateCategoryValue(NewCategory)
                }} />
            </View>
            <View>
                <Pressable style = {{backgroundColor: "#A7A0A0"}}
                    onPress = {() => updateCategory()}>
                    <Text> Update </Text>
                </Pressable>
            </View>
        </SafeAreaView>
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
          }
    }
)
export default UpdateCategoryValueScreen