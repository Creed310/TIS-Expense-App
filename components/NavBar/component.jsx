import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'


const NavBar = (props) => 
{
  const navigation = props.navigation
  const homePage = props.homePage
  const onPressLeft = props.onPressLeft
  const onPressRight = props.onPressRight

  let add_icon = require('../../assets/add_box_FILL0_wght100_GRAD0_opsz40.png')
  let add_fill_icon = require('../../assets/add_FILL0_wght100_GRAD0_opsz40.png')
  let back_icon = require('../../assets/arrow_back_ios_FILL0_wght100_GRAD0_opsz24.png')
  let filter_icon = require('../../assets/filter_alt_FILL0_wght100_GRAD0_opsz40.png')
  let iconLeft_style = homePage === true ? {} : {marginTop:12}

  let [iconLeft, iconRight] = homePage === true ? [filter_icon, add_icon] : [back_icon, add_fill_icon]
  return (
    <View style = {
      {
        backgroundColor: 'white',
        height: 90,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}>
      <View style = {
        {
          flexDirection: 'row',
          flex: 1, 
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginBottom: 5
        }}>

      <TouchableOpacity onPress = {() => onPressLeft()}>
        <Image style = {iconLeft_style}
              source = {iconLeft} />
      </TouchableOpacity>
      
      <TouchableOpacity onPress = {() => onPressRight()}>
        <Image source = {iconRight} />
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default NavBar

const styles = StyleSheet.create({

})