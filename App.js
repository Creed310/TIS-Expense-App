import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from './screens/HomeScreen'
import AddScreen from './screens/AddScreen';
import AddCategoryScreen from './screens/AddCategoryScreen';
import UpdateCategoryScreen from './screens/UpdateCategoryScreen';
import UpdateCategoryValueScreen from './screens/UpdateCategoryValueScreen';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite'
const Stack = createNativeStackNavigator()

const db = SQLite.openDatabase("TISETApp.db")

const App = () => {

  useEffect(() =>
  {
    db.transaction((trx) =>
      {
        trx.executeSql('CREATE TABLE IF NOT EXISTS exp_inc_table (rc_id INTEGER PRIMARY KEY AUTOINCREMENT, type VARCHAR2(20), value INTEGER(10), category VARCHAR2(20))', [], () => {console.log("expense table works")}, () => {})
        trx.executeSql('CREATE TABLE IF NOT EXISTS category_type_table (id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR2(20), type VARCHAR2(20))', [], () => {console.log ("category table exists")}, () => {console.log("can't")})
      }, [])
  })
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "Home"
          component = {HomeScreen} />

        <Stack.Screen
          name = "Add"
          component = {AddScreen} />

        <Stack.Screen
          name = "AddCategory"
          component = {AddCategoryScreen} />

        <Stack.Screen 
          name = "UpdateCategory"
          component = {UpdateCategoryScreen} />

        <Stack.Screen
          name = "UpdateCategoryValue"
          component = {UpdateCategoryValueScreen} />

      </Stack.Navigator>
    </NavigationContainer>
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