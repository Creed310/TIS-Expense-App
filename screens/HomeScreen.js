import { View, Text, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'


//import { openDatabase } from 'react-native-sqlite-storage'
import * as SQLite from 'expo-sqlite'

import EI_Button from '../components/EI_Button/component'
import EI_Row from '../components/EI_Row/component'
import NavBar from '../components/NavBar/component'
import EI_InfoBar from '../components/EI_InfoBar/component'

const db = SQLite.openDatabase("TISETApp.db")

// Creation of DB and Viewing of Expenses would be done here. 

const HomeScreen = ({navigation}) => 
{

    
    const [FlatListEITable, setFlatListEITable] = useState([])
    const [ExpenseTotal, setExpenseTotal] = useState(0)
    const [IncomeTotal, setIncomeTotal] = useState(0)

    let info_bar_stats = () =>
    {
        db.transaction((txn) => 
        {
            txn.executeSql('SELECT category, value FROM exp_inc_table', [], (tx, res) =>
            {
                for (let i = 0; i<res.rows.length; i++)
                {
                    if(res.rows.item(i).category == "expense")
                    {
                        setExpenseTotal(ExpenseTotal + res.rows.item(i).value)
                    }
                    else if(res.rows.item(i).category == "income")
                    {
                        setIncomeTotal(IncomeTotal + res.rows.item(i).value)
                    }
                }
            },
            (err) =>
            {
                console.log(err)
            })
        })
    }

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
        //console.log(IncomeTotal)
        info_bar_stats()
        viewTable()
        // console.log("changes,", FlatListEITable)
        // QUESTION - used FlatListEITable here as the variable to check when refreshing, but when console logging it, it gets called repeatedly too fast, better way to solve?
    }, [FlatListEITable])

    return (
    <View style = {{flex: 1}}>

        <NavBar navigation = {navigation} homePage = {true} onPressRight = {() => navigation.navigate('Add')}/>

        <EI_InfoBar navigation = {navigation} expense_total = {ExpenseTotal} income_total = {IncomeTotal}/>


        <SafeAreaView style = {{flex: 1}}>
            <View style = {{flex: 1, backgroundColor: 'white'}}>
                <FlatList
                    data = {FlatListEITable}
                    renderItem = {({ item }) => <EI_Row id = {item.id} 
                                                        type = {item.type} 
                                                        category = {item.category} 
                                                        value = {item.value} 
                                                        date_of_entry = {item.date_of_entry}
                                                        onPress = {() =>
                                                        {
                                                            navigation.navigate('RUD_EIScreen', 
                                                            {item: {item}})
                                                        }}
                                                        />}>
                </FlatList>
            </View>
        </SafeAreaView>

        {/* <View>

            <EI_Button text = "Add an Expense" type = "expense" onPress = {() => 
                {
                    navigation.navigate('Add', { type: "expense"})
                }} />

            <EI_Button text = "Add an Income" type = "income" onPress = {() => 
                {
                    navigation.navigate('Add', { type: "income"})
                }} />    
        </View> */}

        
        {/* <View style = {{height: '75%'}}>
            <FlatList   
                data = {FlatListEITable}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <EI_Row type = {item.type} id = {item.rc_id} category = {item.category} value = {item.value} 
                                        onPress = {() => 
                                            {   
                                                // navigate to an UpdateCategoryValue page with a certain id if pressed
                                                navigation.navigate('UpdateEI', {item: {item}})    
                                            }}/>} />
        </View> */}
    </View>
  )
}


export default HomeScreen
