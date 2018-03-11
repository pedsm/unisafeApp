import React from 'react'
import { View, StyleSheet, TextInput, FlatList, Text, AsyncStorage } from 'react-native'
import {url} from  '../configs'

export default class Invite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: "",
            friends: []
        }
    }

    async fetchFriends() {
        const token = await AsyncStorage.getItem('token')
        const response = await fetch(`${url}friends/${token}`)
        const friendsList = await response.json()

        this.setState((prev, props) => {
            let state = {...prev}
            state.friends = friendsList
            return state
        })
    }

    componentWillMount() {  
        this.fetchFriends.bind(this)()
    }

    render() {
        const { groupId } = this.props.navigation.state.params
        return(
            <View>
                <Text style={styles.h1}>Invite your friends: {groupId}</Text>
                <TextInput 
                    style={this.state.error === true
                        ? styles.errorTextField
                        : styles.textField}
                    onChangeText={(text) => this.setState((prev, _) => Object.assign(prev, {
                        query: text
                    }))}
                />
                <FlatList 
                    style={{}}
                    data={this.state.friends}
                    renderItem={(item) => (<Text>{JSON.stringify(item.item)}</Text>)}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 24,
        padding: 24
    }
})