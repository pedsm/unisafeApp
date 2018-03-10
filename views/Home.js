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

  render() {
    return (
      <Text>HoMe</Text>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
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