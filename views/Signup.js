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
} from 'react-native'
import Modal from 'react-native-modal'
import { url } from '../configs'

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    //   .catch(err => console.error(err))
    this.state = {
      user: '',
      pass: '',
      loading: false,
      showModal: false,
      msg: ""
    }
  }

  signup() {
      /* TODO: signup the user */
  }
  

  render() {
    return (
      <View style={styles.container} >
         <Text>UniSafe Signup</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  label: {
    alignSelf: 'center',
  },
  textField: {
    height: 45,
    fontSize: 20,
    alignSelf: 'center',
    width: '90%',
    padding:10,
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 20,
    borderColor: 'lightgrey',
    borderWidth: Platform.OS === 'ios' ? 1 : 0
  },
  modalView: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  loader: {
    margin: 30,
  }
})