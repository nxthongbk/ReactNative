/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import MyModal from './component/modal';

//type Props = {};
export default class App extends Component {

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this)

  }

  // toggleModal = () => {
  //
  // };

  toggleModal() {
  this.refs.MyModal.toggleModal();
  }


  render() {

    return (

        <View style={{ flex: 1 }}>

            <View style={{ flex: 1, backgroundColor: '#1abc9c' }}>
              <Text style={styles.text1}>Busmap</Text>

          </View>
          <View style={styles.container}>
            <MapView style={styles.map} region={{
              latitude: 10.872232,
              longitude: 106.770576,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
                     provider="google"
                     showsUserLocation={true}
                     showsMyLocationButton={true}
                     showsCompass={true}
                     followsUserLocation={true}
                     loadingEnabled={true}
                     toolbarEnabled={true}
                     zoomEnabled={true}
                     rotateEnabled={true}
                     scrollEnabled={true}
                //  pitchEnabled={true}
                //  toolbarEnabled={true}
                //  moveOnMarkerPress={true}
                //  showsScale={true}
            >

            </MapView>
            <ActionButton buttonColor='#1abc9c'>
              <ActionButton.Item buttonColor='#3498db' title="Tìm đường"
                                 onPress={this.toggleModal}>
                <Icon style={styles.actionButtonIcon}/>
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#1abc9c' title="Tìm tuyến xe buýt"
                                 onPress={() => {
                                 }}>
                <Icon style={styles.actionButtonIcon}/>
              </ActionButton.Item>
            </ActionButton>
            <MyModal ref="MyModal"/>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,

  },
  actionButtonIcon: {
    fontSize: 22,
    height: 25,
    color: 'white',
  },

  text1: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
  },

});
