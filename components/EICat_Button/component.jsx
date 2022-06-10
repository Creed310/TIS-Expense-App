import { View, Text, Pressable } from 'react-native'
import React from 'react'

const EICat_Button = (props) =>
{
  const button_type = props.type
  const button_text = props.text
  const button_onpress = props.onPress


  return (
    <View>
      <Pressable onPress = {() => button_onpress()}> 
        <Text style = {{backgroundColor: "#A7A0A0"}}>{button_text}</Text>
      </Pressable>
    </View>
  )
}


export default EICat_Button