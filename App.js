import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from './screens/HomeScreen'
import AddScreen from './screens/AddScreen';
import AddCategoryScreen from './screens/AddCategoryScreen';
import UpdateCategoryScreen from './screens/UpdateCategoryScreen';
import UpdateCategoryValueScreen from './screens/UpdateCategoryValueScreen';

const Stack = createNativeStackNavigator()

const App = () => {
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