import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import Routes from '../utils/Routes';

class SignupScene extends Component {
  static navigationOptions = ({navigation}) => ({
    // header: null,
    headerTitle: 'Sign up',
    headerRight: (navigation.state.params && navigation.state.params.headerRight)
  });

  constructor(props) {
    super(props);

    this.rightButtonTap = this.rightButtonTap.bind(this);
  }

  renderNavbarRightButton() {
    return (<TouchableOpacity onPress={this.rightButtonTap}><Text>TAP</Text></TouchableOpacity>);
  }

  rightButtonTap() {
    Alert.alert("Hello", "This is the alert message.");
  }

  componentDidFocus() {
    console.log('SIGNUP FOCUS')
  }

  componentDidLeave() {
    console.log('SIGNUP LEAVE')
  }

  componentDidMount() {
    Routes.addListener(this.props.navigation.state, 'focus', this.componentDidFocus);
    Routes.addListener(this.props.navigation.state, 'leave', this.componentDidLeave);

    this.props.navigation.setParams({
      headerRight: this.renderNavbarRightButton()
    });
  }

  componentWillUnmount() {
    Routes.removeListener(this.props.navigation.state, 'focus', this.componentDidFocus);
    Routes.removeListener(this.props.navigation.state, 'leave', this.componentDidLeave);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Hello, this is Signup scene</Text>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('LoginMain');
            }}
            style={{paddingVertical: 5, paddingHorizontal: 15, borderWidth: 1, borderColor: '#cccccc'}}>
            <Text>GO BACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SignupScene;
