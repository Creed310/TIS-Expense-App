import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React, { useEffect } from 'react'
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
    const onPress = props.onPress

    const rowBackgroundColor = type === "expense" ? "#ff6961" : "#D3FA8E"
    const rowTextColor = type === "expense" ? "#851E15": "#226703"

    const sign = type === "expense" ? "-" : "+"
    // make each row a pressable here so can modify.

    useEffect(() =>
    {
        console.log(props)
    },[])
  return (
    <SafeAreaView style = {styles.rowContainer}>
        <SafeAreaView style = {styles.row}>
            <Pressable
                onPress = {() => onPress()}>
                <Text style = {{backgroundColor: rowBackgroundColor, fontSize: 25, color: rowTextColor}}>{id} {category} {sign}{value} {type} 
                </Text>
            </Pressable>

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