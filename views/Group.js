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

  componentWillMount() {
    this.syncContacts.bind(this)
  }

 

  async fetchGroup() {

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

  updateSafe() {

  }

  emergency() {
      /* TODO */
  }

  render() {
    const { header, container, logo } = styles
    const { user, group } = this.state
    return (
      <Fragment>
        <Modal
          sytle={styles.bottomModal}
          isVisible={this.state.showModal}
        >
          <View style={styles.modalView}>
            <Text style={styles.title}>View Group</Text>
           
            
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
          
          <FlatList
            style={{}}
            data={group}
            renderItem={(item) => (<RowEntry person={item.item} />)}
            keyExtractor={(item, index) => index}
          />
          
          <View style={container}>
          <Button
            title="Go"
            color="limegreen"
            onPress={this.updateSafe.bind(this)}
          />
          <Button
            title="Safe"
            color="limegreen"
            onPress={this.updateSafe.bind(this)}
          />
            <Button
              title="Emergency"
              color="red"
              onPress={this.emergency.bind(this)}
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