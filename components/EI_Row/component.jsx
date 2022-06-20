import { View, Text, SafeAreaView, Pressable, Image, TouchableOpacity } from 'react-native'
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

    // categoryColour is darker
    // const categoryTextColor = type === "expense" ?  "#F13939" : "#5DC44D"

    // // valueColour is lighter
    // const valueTextColor = type === "expense" ? "#FC5B3E": "#A2D869"


    const [categoryTextColor, valueTextColor, backgroundColour, sign] = type === "expense" ? ["#F13939", "#FC5B3E", "#F2DAC9", "-"] : ["#38C422", "#82C422","#E1F2C9", "+"]

    // make each row a pressable here so can modify.

    useEffect(() =>
    {
        console.log(props)
    },[])
  
      return (
        <View style = {
            {
                backgroundColor: backgroundColour,
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                paddingVertical: 5,
                paddingHorizontal: 15 
            }
        }>
                <View style = {
                    {
                        backgroundColor: backgroundColour,
                        flexDirection: 'row', 
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingEnd: 10
                    }}>
                    <View style = 
                    {
                        {
                            padding: 10
                        }
                    }>
                        <Text style = {
                            {
                                fontSize: 30, 
                                color: categoryTextColor,
                            }
                            }>
                            {category}
                        </Text>
                        <View style = {
                            {
                                backgroundColor: backgroundColour,
                                marginVertical: 5
                            }
                            }>
                            <Text style = {
                                {
                                    fontSize: 20, 
                                    color: valueTextColor,
                                }
                                }>
                                {sign} ₹{value}
                            </Text> 
                        </View>
                    </View>
                <TouchableOpacity onPress = {() => onPress()}>
                        <Image style = {
                            {
                                width: 30, 
                                height: 30,
                                backgroundColor: backgroundColour
                            }
                            } 
                            source = {require("../../assets/menu_FILL0_wght100_GRAD0_opsz48.png")}>
                        </Image>      
                </TouchableOpacity>
            </View>
                
                
        </View>
  )
}

export default EI_Row
