import React from 'react'
import {
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class Settings extends React.Component {
    logout() {
        AsyncStorage.removeItem('token')
            .then(() => {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Splash' })],
                });
                this.props.navigation.dispatch(resetAction);
            })
            .catch(err => console.error(err))
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Settings:</Text>
                <Text style={styles.subHeader}>Settings:</Text>
                <Button
                    title="Logout"
                    color="red"
                    onPress={this.logout.bind(this)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 30
    },
    header: { fontSize: 32, marginBottom: 12 },
    subHeader: { fontSize: 16 },
})