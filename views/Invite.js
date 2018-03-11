import React from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    FlatList,
    Text,
    AsyncStorage,
    TouchableHighlight
} from 'react-native'
import MiniRow from '../components/miniRow'
import Avatar from '../components/avatar'
import {url} from  '../configs'

export default class Invite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: "",
            friends: [],
            invitedList: []
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
    inArray(elem, arr) {
        return arr.indexOf(elem) !== -1
    }

    async addFriend(phone) {
        try {
            const response = await fetch(`${url}group/request`, {
                method: 'POST',
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                body: JSON.stringify({
                    groupId: this.props.navigation.state.params.groupId,
                    phone
                })
            })
            console.log(JSON.stringify({
                groupId: this.props.navigation.state.params.groupId,
                phone
            }))
            const json = await response.json()
            this.setState((prev) => {
                let state = { ...prev }
                state.invitedList.push(phone)
                return state
            })
            // console.log(json)
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        const { groupId } = this.props.navigation.state.params
        return (
            <View style={{ backgroundColor: 'white', height: '100%' }}>
                <View style={{ padding: 15, flexDirection:'row' }}>
                    {this.state.friends
                        .filter(friend => this.inArray(friend.phone, this.state.invitedList))
                        .map((a, i) => (<Avatar key={i} mini={true}>{a.initials}</Avatar>))}
                </View>
                <Text style={styles.h1}>Invite your friends: </Text>

                <TextInput
                    placeholder="filter..."
                    style={styles.textField}
                    onChangeText={(text) => this.setState((prev, _) => Object.assign(prev, {
                        query: text
                    }))}
                />
                <FlatList
                    style={{}}
                    data={
                        this.state.friends.filter(
                            friend => friend.name.match(new RegExp(this.state.query, 'gi')) !== null
                                && !this.inArray(friend.phone, this.state.invitedList))
                    }
                    renderItem={(item) => (
                        <TouchableHighlight onPress={() => { this.addFriend.bind(this)(item.item.phone) }}>
                            <MiniRow friend={item.item} />
                        </TouchableHighlight>
                    )}
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
    },
    textField: {
        padding: 10,
    }
})