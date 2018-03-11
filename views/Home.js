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

async function showFirstContactAsync() {
  // Ask for permission to query contacts.
  console.log('looking for contacts...');
  const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
  if (permission.status !== 'granted') {
    // Permission was denied...
    return;
  }
  const contacts = await Expo.Contacts.getContactsAsync({
    fields: [
      Expo.Contacts.PHONE_NUMBERS,
      //Expo.Contacts.EMAILS,
    ],
    pageSize: 250, // Number of contacts to process
    pageOffset: 0, 
  });


  AsyncStorage.getItem('token')
            .then((token) => {
                ////////
                if (contacts.total > 0) {
                  //console.log(contacts)
                  contacts.data.map((contact)=>{
                   // console.log(contact.name);
                    
                    if(contact.phoneNumbers.length > 0) {
                      contact.phoneNumbers.map((number)=>{
                      //  console.log(  number.digits);
                      if(number.countryCode == 'gb') { // check phone thinks its a UK phone no

                              processedNumber = number.digits;
                              if(processedNumber.substr(0,3)=='+44') { // replace +44 with 0
                                processedNumber = '0'+processedNumber.substr(3);
                              }
                               // Request sync for this contact with this number
                    
                              fetch(`${url}friend`, {
                                method: 'post',
                                headers: new Headers({
                                  'content-type': 'application/json'
                                }),
                                body: JSON.stringify({
                                  phoneA:  token, // users phone number
                                  phoneB: processedNumber, // contact phone number
                                  
                                })
                              })
                                .then((res) => res.json())
                                .then((json) => {
                                  
                                  console.log(json)
                                  
                                  
                                })
                                .catch(err => console.error(err))
                              
                      }
                      
                       
                      })
                    }
                    //console.log(contact.phoneNumbers);
                    
                  });
              /*console.log(
                    'Your first contact is...' + 
                    'Name: '+contacts.data[0].name+'\n' +
                    'Phone numbers: '+JSON.stringify(contacts.data[0].phoneNumbers)+
                    'Emails: '+JSON.stringify(contacts.data[0].emails)
                  );*/
                }
                ////////
            })
            .catch(err => console.error(err))

  
    
    
  
}

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
  
  syncContacts() {
    showFirstContactAsync();
  }

  render() {
    return (
      <View>
        <Text>Hello</Text>
        <Button
          title="Logout"
          color="red"
          onPress={this.logout.bind(this)}
        />
        <Button
          title="Sync Contacts"
          color="red"
          onPress={this.syncContacts.bind(this)}
        />
      </View>
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