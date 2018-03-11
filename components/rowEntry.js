import React from 'react'
import {
    View,
    Text
} from 'react-native'

export default function RowEntry(props) {
    const { date, createdBy, id } = props.group
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dateObj = new Date(parseInt(date))
    const diff = Date.now() - date < 1000 * 60 * 60 * 12
    return (
        <View style={{
            padding: 30,
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            backgroundColor: diff ? 'white' : 'grey'
        }}>
            <Text style={{
                fontSize: 18,
            }}>
                Night out {weekdays[dateObj.getDay()]}
            </Text>
        </View>
    )
}