import { StackNavigator } from 'react-navigation'

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
      title: 'Home',
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