import React from 'react'
import {
    View,
    Text
} from 'react-native'
import Avatar from './avatar'

export default function MiniRow(props) {
    const { name, initials } = props.friend
    return (
        <View style={{
            backgroundColor: 'white',
            padding: 10,
            margin:10,
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            flex: 1,
            flexDirection: 'row'
        }}>
            <Avatar mini={true}>{initials}</Avatar>
            <Text style={{
                fontSize: 18,
            }}>
                {name}
            </Text>
        </View>
    )
}