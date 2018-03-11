import { StackNavigator } from 'react-navigation'
import React from 'react'
import { Image } from 'react-native'

import Login from './views/Login'
import Signup from './views/Signup'
import Splash from './views/Splash'
import Settings from './views/Settings'
import Home from './views/Home'

export default StackNavigator({
  Splash: {
    navigationOptions: {
      title: 'Loading...',
    },
    screen: Splash
  },
  Login: {
    navigationOptions: {
      title: 'Login',
    },
    screen: Login
  },
  Signup: {
    navigationOptions: {
      title: 'Signup',
    },
    screen: Signup
  },
  Home: {
    navigationOptions: {
      headerTitle:(
        <Image style={{ 
          alignSelf: 'center',
          width: '40%',
          resizeMode: 'contain',
          marginRight: "auto",
          marginLeft: "auto",
         }} source={require("./assets/logo-big.png")} />
      ),
      headerStyle: {
        backgroundColor: '#fafafa',
        alignItems: 'center'
      }
    },
    screen: Home
  },
  Settings: {
    navigationOptions: {
      title: 'Settings'
    },
    screen: Settings,
  }

})