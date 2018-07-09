//import liraries
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import MyText from "../components/myText/MyText";
import Routes from '../utils/Routes';

class LoginScene extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
  }

  componentDidFocus(){
    console.log('LOGIN FOCUS')
  }

  componentDidLeave(){
    console.log('LOGIN LEAVE')
  }

  componentDidMount(){
    Routes.addListener(this.props.navigation.state, 'focus', this.componentDidFocus);
    Routes.addListener(this.props.navigation.state, 'leave', this.componentDidLeave);
  }

  componentWillUnmount(){
    Routes.removeListener(this.props.navigation.state, 'focus', this.componentDidFocus);
    Routes.removeListener(this.props.navigation.state, 'leave', this.componentDidLeave);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MyText>Login screen</MyText>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('SignupMain');
        }} style={{paddingVertical: 5, paddingHorizontal: 15, borderWidth: 1, borderColor: '#cccccc'}}>
          <MyText>GO FOWARD</MyText>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default LoginScene;
