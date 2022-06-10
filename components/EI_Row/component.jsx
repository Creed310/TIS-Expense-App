import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Update_Button } from '../Update_Button/component'

const EI_Row = (props) =>
{
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
    const type = props.type
    const category = props.category
    const value = props.value
    const id = props.id

    const rowBackgroundColor = type === "expense" ? "#ff6961" : "#D3FA8E"
    const rowTextColor = type === "expense" ? "#851E15": "#226703"

    // make each row a pressable here so can modify.
    
  return (
    <SafeAreaView style = {styles.rowContainer}>
        <SafeAreaView style = {styles.row}>

            <Text style = {{backgroundColor: rowBackgroundColor, fontSize: 30, color: rowTextColor}}>{id} {category} {value} {type} 
            </Text>

        </SafeAreaView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create(
{
        rowContainer:
        {
            width: "100%",
        },
        row:
        {

        }
})

export default EI_Row