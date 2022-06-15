import { View, Text } from 'react-native'
import React from 'react'

const EI_InfoBar = ({props}) => {

//   let IncomeTotal = props.income_total
//   let ExpenseTotal = props.expense_total

  return (
    <View style = {
        {
            backgroundColor: 'white',
            padding: 30,
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <View style =
            {
                {
                    flexDirection: 'row',
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
                + ₹
                </Text>

                

            </View>
        

            <View style =
            {
                {
                    flexDirection: 'row',
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
                - ₹
                </Text>

                

            </View>

    </View>
  )
}

export default EI_InfoBar