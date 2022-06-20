import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from './screens/HomeScreen'
import AddScreen from './screens/AddScreen';

import AddCategoryScreen from './screens/AddCategoryScreen';
import ModifyCategoryScreen from './screens/ModifyCategoryScreen';

import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite'
import { MenuProvider } from 'react-native-popup-menu';
import DeleteCategoryScreen from './screens/DeleteCategoryScreen';
import RUD_EIScreen from './screens/RUD_EIScreen';


const Stack = createNativeStackNavigator()

const db = SQLite.openDatabase("TISETApp.db")

const App = () => {

  useEffect(() =>
  {
    db.transaction((trx) =>
      {
        // relate two tables
        // dropdown
        // store date.

        trx.executeSql('CREATE TABLE IF NOT EXISTS "category_type_table" ("ct_id"	INTEGER,"type" TEXT,"category" TEXT,PRIMARY KEY("ct_id" AUTOINCREMENT));', [], () => {console.log ("CT table works and created")}, () => {console.log("CT table could not be created")})
        trx.executeSql('CREATE TABLE IF NOT EXISTS "exp_inc_table" ("rc_id"	INTEGER,"type"	TEXT,"value"	INTEGER,"category"	TEXT,"date_of_entry"	TEXT,PRIMARY KEY("rc_id" AUTOINCREMENT));', [], () => {console.log("EI table works and created")}, () => {console.log("EI table could not be created")});

        // for clearing

        // trx.executeSql('DROP TABLE exp_inc_table', [], () => {}, ()=>{})
        // trx.executeSql('DROP TABLE category_type_table', [], () => {}, ()=>{})
        
      }, [])
  })
  
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions = {{headerShown: false}}>
          <Stack.Screen
            name = "Home"
            component = {HomeScreen}
            />

          <Stack.Screen
            name = "Add"
            component = {AddScreen} />

          <Stack.Screen
            name = "AddCategory"
            component = {AddCategoryScreen} />

          <Stack.Screen 
            name = "ModifyCategory"
            component = {ModifyCategoryScreen} />

          <Stack.Screen
            name = "DeleteCategory"
            component = {DeleteCategoryScreen} />

            <Stack.Screen
            name = "RUD_EIScreen"
            component = {RUD_EIScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App