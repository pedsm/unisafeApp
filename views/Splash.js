import React from 'react'
import {
    Platform,
    View,
    AsyncStorage,
    ActivityIndicator,
    StyleSheet,
    Button,
} from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class Splash extends React.Component {
    constructor(props) {
        super(props)
        console.log('Checking for token')
        AsyncStorage.getItem('token')
            .then((token) => {
                if (token == null) {
                    console.log('Token not found, sending user to login screen')
                    // this.props.navigation.push('Login')
                    this.sendToScreen('Login')
                } else {
                    console.log('Token found, sending user to calendar view' + token)
                    // this.props.navigation.push('Home')
                    this.sendToScreen('Home')
                }
            })
            .catch(err => console.error(err))
    }
    
    /**
     * Sends to new screen reseting the stack in a very dodgy way
     */
    sendToScreen(screen) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: screen })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    logout() {

    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator 
                    size={Platform.OS === 'ios' ? 1 : 50}
                    color="lightblue"
                    styles={styles.loader}
                /> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
})