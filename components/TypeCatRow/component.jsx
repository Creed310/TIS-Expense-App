import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'

const TypeCatRow = (props) =>
{
  const id = props.id 
  const type = props.type
  const category = props.category
  const onPress = props.onPress
  
  const rowBackgroundColor = type === "expense" ? "#ff6961" : "#D3FA8E"
  return (
    <SafeAreaView style = {{ width: '100%'}}>
        <SafeAreaView>
            
            <Pressable onPress = {() => onPress()}>
                <Text style = {{backgroundColor: rowBackgroundColor, fontSize: 30, color: "black"}}>{id} {category} 
                </Text>
            </Pressable> 

        </SafeAreaView>
    </SafeAreaView>
  )
}

export default TypeCatRow