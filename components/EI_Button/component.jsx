import { View, Text, Pressable } from 'react-native'
import React from 'react'

const EI_Button = (props) =>
{
  const button_type = props.type
  const button_text = props.text
  const button_onpress = props.onPress

  let backgroundColor = button_type === "expense" ? "red" : "green"

  return (
    <View>
      <Pressable onPress = {() => button_onpress()}> 
        <Text style = {{backgroundColor: backgroundColor}}>{button_text}</Text>
      </Pressable>
      
    </View>
  )
}


export default EI_Button