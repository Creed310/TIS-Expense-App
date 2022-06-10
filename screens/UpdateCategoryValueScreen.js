import React, { useEffect } from "react";
import { Text, View, SafeAreaView } from 'react-native'
import { StyleSheet } from 'react-native'

const UpdateCategoryValueScreen = ({navigation, route}) =>
{
    //QUESTION have to dereference twice? why is it getting passed like this

    const item = route.params.item.item
    const id = item.id

    useEffect(() =>
    {
        console.log(id)
    })
    
    return (
        <SafeAreaView style = {styles.container}>
            <Text>
                {id}
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'white',
          }
    }
)
export default UpdateCategoryValueScreen