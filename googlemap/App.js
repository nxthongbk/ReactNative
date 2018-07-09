import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import RootNavigator from './navigation/RootNavigator.js';
import Routes from './utils/Routes';
import DialogComponent from './component/dialog/Dialog';
import NetworkStatus from './component/networkStatus/NetworkStatus';
import store from './redux/store';

export default class App extends Component<{}> {

  constructor() {
    super();
  }

  render() {
    return (
        <Provider store={store}>
          <View style={styles.container}>
            <NetworkStatus/>
            <DialogComponent/>
            <RootNavigator
                onNavigationStateChange={Routes.onNavigationStateChange}/>
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
