import React from "react";
import {Text, View, StyleSheet, TextInput, Pressable} from 'react-native'
import { useState, useEffect } from "react"
import * as SQLite from 'expo-sqlite'
import { openDatabase } from "expo-sqlite";
import { FlatList, SafeAreaView } from "react-native";
import TypeCatRow from "../components/TypeCatRow/component";

const db = SQLite.openDatabase("TISETApp.db")

const UpdateCategoryScreen = ({navigation, route}) =>
{

    const type = route.params.type
    const backgroundColor = type === 'expense' ? '#ffb3b3' : '#dcffcc'
    const [UpdateCategory, setUpdateCategory] = useState('')
    const [UC_FlatList, setUC_Flatlist] = useState([])

    const ViewTable = () =>
    {
        db.transaction((trx) =>
        {
            trx.executeSql('SELECT * FROM category_type_table', [], (trx, res) =>
            {
                const UC_Table = []
                for (let i = 0; i<res.rows.length; i++)
                {
                    // here filter categories according to type
                    if(res.rows.item(i).type == type)
                    {
                        UC_Table.push(res.rows.item(i))
                    }
                }
                setUC_Flatlist(UC_Table)
            })
        })
    }
    
    
    useEffect(() =>
    {
        ViewTable()
        db.transaction((trx) =>
        {
            trx.executeSql('SELECT COUNT(*) FROM exp_inc_table', [], (trx, res) =>
            {
                console.log("Value is", res)
            }),
            (err) =>
            {
                console.log("err")
            }
        })
    }, [UC_FlatList])

    return(
        <View style = {[styles.container, {backgroundColor : backgroundColor}]}>
            <SafeAreaView>
                <Text style = {{fontSize: 22}, {textAlign: 'center'}}>
                    You can choose to update the following categories
                </Text>
            </SafeAreaView>
            <SafeAreaView style = {{height: '75%'}}>
                <FlatList   
                    data = {UC_FlatList}
                    renderItem={({ item }) => <TypeCatRow type = {item.type} id = {item.id} category = {item.category}
                                                onPress = {() => 
                                                {   
                                                    // navigate to an UpdateCategoryValue page with a certain id if pressed
                                                    navigation.navigate('UpdateCategoryValue', {item: {item}})    
                                                }}/>} />
                </SafeAreaView>
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

export default UpdateCategoryScreen