import React from 'react'
import { 
  Platform,
  Image,
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  TextInput,
  Button,
  AsyncStorage,
  ActivityIndicator,
  ListView
} from 'react-native'
import Modal from 'react-native-modal'
import { NavigationActions } from 'react-navigation'
import { url } from '../configs'

const Row = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: 'assets/icon.png'}} style={styles.photo} />
    <Text style={styles.text}>
      {`${props.name} ${props.name}`}
    </Text>
  </View>
);

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ 
      rowHasChanged: (r1, r2) => r1 !== r2 }); 
    this.state = {
      groups: ds.cloneWithRows([{name:'group 1'}, {name:'group 2'},{name:'group 3'}]),
    };
  }

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
    const { header, container, logo } = styles
    return (
      <View>
        <View style={container}>
          <Text>Hello</Text>
          <Button
            title="Logout"
            color="red"
            onPress={this.logout.bind(this)}
          />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  logo: {
    width: '90%',
    height: 50,
    resizeMode: 'contain'
  },
  header: {
    padding: 20,
    backgroundColor: '#eee',
    alignItems: 'center'
  },
  container: {
    padding: 12,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
})