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
import { Permissions, Notifications } from 'expo';


export default class Login extends React.Component {
  constructor(props) {
    super(props)
    //   .catch(err => console.error(err))
    this.state = {
      phone: '',
      name: '',
      initials: '',
      nToken: '',
      loading: false,
      showModal: false,
      msg: ""
    }
    this.registerForPushNotificationsAsync();
  }


  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(`Notifications token is `)
    console.log(token);
    this.state.nToken = token;
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    
  }

  login() {
    console.log(this.state)
    if(this.state.loading) {
      // Don't do unnecesary work
      return
    }
    console.log('trying to login')
    console.log(`${url}user`)
    var user = {
      phone: this.state.phone,
      name: this.state.name,
      initials: this.state.initials,
      token: this.state.nToken
    };
    console.log(user);
    this.setState((prev, props) => Object.assign(prev, {loading:true}))
    fetch(`${url}user`, {
      method: 'post',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState((prev, props) => Object.assign(prev, { loading: false }))
        console.log(json)
        
          AsyncStorage.setItem('token', this.state.phone)
            .then(() => {
              this.props.navigation.push('Splash')
            })
            .catch(err => console.error(err))
        
      })
      .catch(err => console.error(err))
      
  }
  
  switchModal(iMsg) {
    this.setState((prev, _) => {
      console.log(prev)
      console.log(iMsg)
      const state = {...prev}
      state.showModal = !prev.showModal 
      state.msg = iMsg == null ? "" : iMsg
      return state
    })
  }
  closeModal() {
    this.setState((prev) => Object.assign(prev, {showModal: false}))
  }

  render() {
    return (
      <View style={styles.container} >
        <Modal 
          sytle={styles.bottomModal}
          isVisible={this.state.showModal}
        >
          <View style={styles.modalView}>
            <Text style={styles.title}>Error:</Text>
            <Text style={{marginBottom: 20}}>{this.state.msg}</Text>
            <Button
              title="close"
              onPress={this.closeModal.bind(this)}
              style={styles.loader}
            />
          </View>
        </Modal>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.textField}
          onChangeText={(text) => this.setState((prev, _) => Object.assign(prev, {
            name: text
          }))}
        />
        <Text style={styles.label}>Initials:</Text>
        <TextInput
          style={styles.textField}
          onChangeText={(text) => this.setState((prev, _) => Object.assign(prev, {
            initials: text
          }))}
        />
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.textField}
          onChangeText={(text) => this.setState((prev, _) => Object.assign(prev, {
            phone: text
          }))}
        />
        {/* <Text style={styles.label}>Password:</Text> 
        <TextInput
          secureTextEntry={true}
          style={styles.textField}
          onChangeText={(text) => this.setState((prev, _) => Object.assign(prev, {
            pass: text
          }))}
        />*/}
        <Button
          disabled={this.state.loading}
          title="Sign In"
          onPress={this.login.bind(this)}
          color="#1F2F43"
          style={styles.button}
        />
        
        {this.state.loading ? <ActivityIndicator 
          style={styles.loader}
          size={Platform.OS === 'ios' ? 1 : 50}
          color="lightblue"
        /> : <View/>}
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