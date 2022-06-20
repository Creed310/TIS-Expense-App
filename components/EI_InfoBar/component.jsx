import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'


const EI_InfoBar = (props) => {

const navigation = props.navigation
//   let IncomeTotal = props.income_total
//   let ExpenseTotal = props.expense_total

  return (
      <View style = {{flexDirection: 'row',
                     backgroundColor: 'white',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                     paddingHorizontal: 20}}>

        <TouchableOpacity onPress = {() => {navigation.navigate('Add', { type: "expense" })}}>
        <Image style = {
                {
                    tintColor: 'red',
                    width: 35,
                    height: 35
                }
            }
            source = {require('../../assets/[removal.ai]_tmp-62a9bef33c7f9.png')} />
        </TouchableOpacity>
  
          
            
    <View style = {
    {
        display: 'flex',
        backgroundColor: 'white',
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: '70%',
    }}>
        <View style =
        {
            {
                flexDirection: 'row',
                backgroundColor: 'white',
            }
        }>

            <Text style = {
            {
                textAlign: 'center',
                fontSize: 25,
                fontWeight: '500',
                color: '#323030'
            }
            }>
            Income
            </Text>

            <Text>  </Text>

            <Text style = {
                {
                    textAlign: 'center',
                    fontSize: 25,
                    fontWeight: '500',
                    color: '#A2D869'

                }}>
            + ₹ 20,100
            </Text>
        </View>

      <View style =
      {
          {
              flexDirection: 'row',
              backgroundColor: 'white'
          }
      }>

          <Text style = {
          {
              textAlign: 'center',
              fontSize: 25,
              fontWeight: '500',
              color: '#323030'
          }
          }>
          Expense
          </Text>

          <Text>  </Text>

          <Text style = {
              {
                  textAlign: 'center',
                  fontSize: 25,
                  fontWeight: '500',
                  color: '#FC5B3E'

              }}>
          - ₹ 20,111
          </Text>

          

         </View>


        </View>
        
        <TouchableOpacity onPress = {() => {navigation.navigate('Add', { type: "income" })}}>
            <Image
            style = {
                {
                    tintColor: 'green',
                    width: 35,
                    height: 35
                }
            }
            source = {require('../../assets/clipart789909.png')} />
          </TouchableOpacity>

      </View>
      
  )
}

export default EI_InfoBar