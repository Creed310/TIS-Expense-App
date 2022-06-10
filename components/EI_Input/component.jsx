import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const EI_Input = (props) =>
{

    const ktype = props.ktype
    const placeholder = props.placeholder
    const onChangeText = props.onChangeText
  return (
    <TextInput
        style = {styles.input}
        placeholder={placeholder}
        keyboardType={ktype}
        onChangeText = {onChangeText}
    />
  )
}

const styles = StyleSheet.create({
    input: {
      backgroundColor: 'white',
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

export default EI_Input