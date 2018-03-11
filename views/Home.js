import React, { Fragment } from 'react'
import {
  Platform,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Button,
  AsyncStorage,
  ActivityIndicator,
  ListView
} from 'react-native'
import Modal from 'react-native-modal'
import { NavigationActions } from 'react-navigation'
import Avatar from '../components/avatar'
import RowEntry from '../components/rowEntry'
import { url } from '../configs'

const Row = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: 'assets/icon.png' }} style={styles.photo} />
    <Text style={styles.text}>
      {`${props.name} ${props.name}`}
    </Text>
  </View>
);

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      error: false,
      showModal: false,
      groups: [],
      user: {
        initials: "?",
        name: "Loading...",
        phone: "Loading...",
        token: "",
      }
    };
  }

  async fetchUser() {
    const phone = await AsyncStorage.getItem('token')
    const result = await fetch(`${url}friend/${phone}`)
    const json = await result.json()
    this.setState((prev, props) => {
      let state = { ...prev }
      state.user = json
      return state
    })
  }

  async fetchGroups() {
    const phone = await AsyncStorage.getItem('token')
    const result = await fetch(`${url}groups/${phone}`)
    const json = await result.json()
    this.setState((prev, props) => {
      let state = { ...prev }
      state.groups = json
      return state
    })
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

  async addGroup() {
    const { postcode } = this.state
    const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}/validate`)
    const json = await response.json()
    const valid = json.result
    if(valid  === false) {
      console.log(`${postcode} is not a valid postcode`)
      this.setState(prev => Object.assign(prev, { error: true }))
      return
    }

    const apiResponse = await fetch(`${url}group`, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({
        phone: this.state.user.phone,
        postcode
      })
    })
    const apiJson = await apiResponse.json()
    console.log(`Move to next screen ${JSON.stringify(apiJson)}`)
    this.switchModal.bind(this)()
    this.props.navigation.push('Invite', {groupId: apiJson.groupId})
  }

  switchModal() {
        this.setState((prev, _) => {
          const state = { ...prev }
          state.showModal = !prev.showModal
          return state
        })
      }

  componentDidMount() {
        this.fetchUser.bind(this)()
    this.fetchGroups.bind(this)()
      }

  render() {
        const { header, container, logo } = styles
    const { user, groups } = this.state
    return(
      <Fragment>
            <Modal
              sytle={styles.bottomModal}
              isVisible={this.state.showModal}
            >
          <View style={styles.modalView}>
            <Text style={styles.title}>Add a group</Text>
            <Text style={{ marginBottom: 20 }}>Please enter your postcode:</Text>
            <TextInput
              style={this.state.error === true
                ? styles.errorTextField
                : styles.textField}
              onChangeText={(text) => this.setState((prev, _) => Object.assign(prev, {
                postcode: text
              }))}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ width: 100 }}>
                <Button
                  title="cancel"
                  color="red"
                  onPress={this.switchModal.bind(this)}
                />
              </View>
              <View style={{ width: 100 }}>
                <Button
                  title="create"
                  color="limegreen"
                  onPress={this.addGroup.bind(this)}
                />
              </View>
            </View>
          </View>
        </Modal>
        <View>
          <View style={header}>
            <View>
              <Avatar>{user.initials}</Avatar>
            </View>
            <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 18 }}>{user.name}</Text>
              <Text style={{ color: '#333' }}>{user.phone}</Text>
            </View>
          </View>
          <Button
            title="New group"
            color="limegreen"
            onPress={this.switchModal.bind(this)}
          />
          <FlatList
            style={{}}
            data={groups}
            renderItem={(item) => (<RowEntry group={item.item} />)}
            keyExtractor={(item, index) => index}
          />
          <View style={container}>
            <Button
              title="Logout"
              color="red"
              onPress={this.logout.bind(this)}
            />
          </View>
        </View>
      </Fragment >
    )
  }
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 30,
    backgroundColor: '#eee',
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderBottomColor: "#fafafa"
  },
  loader: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10
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
  modalView: {
    backgroundColor: 'white',
    padding: 22,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 32,
  },
  textField: {
    height: 45,
    fontSize: 20,
    alignSelf: 'center',
    width: '90%',
    padding: 10,
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 20,
    borderColor: 'lightgrey',
    borderWidth: Platform.OS === 'ios' ? 1 : 0
  },
  errorTextField: {
    height: 45,
    fontSize: 20,
    alignSelf: 'center',
    width: '90%',
    padding: 10,
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    color: 'red'
  }
})