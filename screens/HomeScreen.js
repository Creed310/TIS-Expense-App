import { View, Text, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'


//import { openDatabase } from 'react-native-sqlite-storage'
import * as SQLite from 'expo-sqlite'

import EI_Button from '../components/EI_Button/component'
import EI_Row from '../components/EI_Row/component'

const db = SQLite.openDatabase("TISETApp.db")

// Creation of DB and Viewing of Expenses would be done here. 

const HomeScreen = ({navigation}) => 
{

    const [FlatListEITable, setFlatListEITable] = useState([])

    // const createTable = () =>
    // {
    //     db.transaction((trx) => 
    //     {
    //         // trx.executeSql('CREATE TABLE IF NOT EXISTS exp_inc_table (rc_id INTEGER PRIMARY KEY AUTOINCREMENT, type VARCHAR2(20), value INTEGER(10), category VARCHAR2(20))', [], () => {}, () => {})
    //         // trx.executeSql('SELECT * FROM exp_inc_table', [], (trx, res) => {console.log(res.rows.item(1))}, () => {console.log("error")})
    //         // trx.executeSql("INSERT INTO exp_inc_table (type, value, category) VALUES (?, ?, ?)", ['expense', 32, 'rec'], () => {console.log("inserted"), () => {console.log("not inserted")}})
    //     })
    // }

    const viewTable = () =>
    {
        db.transaction((trx) =>
        {
            trx.executeSql('SELECT * FROM exp_inc_table', [], (trx, res) =>
            {
                const FLTemp = []
                for(let i = 0; i<res.rows.length; i++)
                {
                    FLTemp.push(res.rows.item(i))
                }
                setFlatListEITable(FLTemp)
            })
        })
    }

    // const listItemView = (item) => {
    //     return (
    //       <View
    //         key={item.rc_id}
    //         style={{ backgroundColor: 'white', padding: 20 }}>
    //         <Text>ID: {item.rc_id}</Text>
    //         <Text>Type: {item.type}</Text>
    //         <Text>Category: {item.category}</Text>
    //         <Text>Value: {item.value}</Text>
    //       </View>
    //     );
    //   };
        
    useEffect(() =>
    {
        viewTable()
        // QUESTION - used FlatListEITable here as the variable to check when refreshing, but when console logging it, it gets called repeatedly too fast, better way to solve?
    }, [FlatListEITable])

    return (
    <SafeAreaView style = {styles.container}>

        <View>

            <Text style = {styles.headerText}>
                TIS Expense Tracker Application
            </Text>

            {/* <Image 
                style = { styles.headerIcon }
                source = { require('../assets/FinanceIcon.png')} />
         */}
        </View>

        <View>

            <EI_Button text = "Add an Expense" type = "expense" onPress = {() => 
                {
                    navigation.navigate('Add', { type: "expense"})
                }} />

            <EI_Button text = "Add an Income" type = "income" onPress = {() => 
                {
                    navigation.navigate('Add', { type: "income"})
                }} />    
        </View>

        <SafeAreaView style = {{height: '75%'}}>
            <FlatList   
                data = {FlatListEITable}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <EI_Row type = {item.type} id = {item.rc_id} category = {item.category} value = {item.value} 
                                        onPress = {() => 
                                            {   
                                                // navigate to an UpdateCategoryValue page with a certain id if pressed
                                                navigation.navigate('UpdateEI', {item: {item}})    
                                            }}/>} />
        </SafeAreaView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create(
    {
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#fff',
          },
          headerIcon: {
            width: 100,
            height: 100,
            marginLeft:50,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
        headerContainer:
        {
            alignSelf: 'center'
        },
            headerText:
            {
                fontWeight: '600',
                fontSize: 20
            },
        // headerIcon:
        // {
        //     width: 100,
        //     height: 100,
        //     justifyContent: 'center',
        //     alignContent: 'center',
        //     flex:1,
        // }
    }
)
export default HomeScreen
