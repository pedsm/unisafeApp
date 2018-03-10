import React from 'react';
import { StyleSheet, Text, View ,TextInput,Button} from 'react-native';
import { Constants } from 'expo';
import { DrawerNavigator } from 'react-navigation'; 

const Home = ({ navigation }) => (
  <View>
    <Text>Home</Text>
  </View>
);

const Friends = ({ navigation }) => (
  <View>
    <Text>Friends</Text>
  </View>
);

const Settings = ({ navigation }) => (
  <View>
    <Text>Settings</Text>
  </View>
);

export const DrawerRight = DrawerNavigator({
  Profile:     { screen: Profile,          },
  Settings:    { screen: Settings,         },
}, {
    drawerPosition: 'right',
});


export default class App extends React.Component {
  _handleSendButtonPress = () => {
    /*if (!this.state.inputValue) {
      return;
    }
    const textArray = this.state.dataSource._dataBlob.s1;
    textArray.push(this.state.inputValue);
    this.setState(() => ({
      dataSource: this.state.dataSource.cloneWithRows(textArray),
      inputValue: '',
    }));*/
    return;
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>UniSafe</Text>
          <TextInput
            style={styles.inputForm}
            keyboardType="numeric"            
            placeholder="Phone Number"
          />
          <Button
            onPress=""
            title="Sign Up"
            color="#85ec84"
            onPress={this._handleSendButtonPress}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formView: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
  },
  inputForm: {
    backgroundColor: '#fff',
    width: 320,
    height: 40,
    padding: 8,
    marginBottom: 8,
  },
  greenButton: {
    color: '#85ec84',
   
  }
});
