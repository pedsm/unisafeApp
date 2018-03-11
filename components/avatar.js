import React from 'react'
import {
    View,
    Text
} from 'react-native'

export default function Avatar(props) {
    if(props.mini === true) {
        return (
            <View style={{
                borderRadius: 100,
                backgroundColor: "#aaa",
                width: 30,
                height: 30,
                alignItems: 'center',
            }}>
                <Text style={{
                    position: 'relative',
                    top: 5,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#fff',
                }}>
                    {props.children}
                </Text>
            </View>
        )

    }
    return (
        <View style={{
            borderRadius: 100,
            backgroundColor: "#aaa",
            width: 70,
            height: 70,
            alignItems: 'center',
        }}>
            <Text style={{
                position: 'relative',
                top: 12,
                fontSize: 32,
                fontWeight: 'bold',
                color: '#fff',
            }}>
                {props.children}
            </Text>
        </View>
    )
}