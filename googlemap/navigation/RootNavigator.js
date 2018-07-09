import React from 'react';
import {
  DrawerNavigator,
  StackNavigator,
} from 'react-navigation';

// import LoginScene from '../scenes/Login';
// import SignupScene from '../scenes/Signup';
import HomeScene from '../scenes/Home';



// const HomeStack = StackNavigator({
//   Home: {
//     screen: Home
//   }
// });

const HomeStack = StackNavigator({
  Home: {
    screen: HomeScene,
  },
}, {
  headerMode: 'screen',
});

// // Test stack
// const SignupStack = StackNavigator({
//   Signup: {
//     screen: SignupScene,
//   },
// }, {
//   headerMode: 'screen',
// });

export default RootNavigator = StackNavigator({
  Home: {
    screen: HomeStack,
  },
}, {
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
});
