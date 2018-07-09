//import liraries
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { Polyline,Marker } from 'react-native-maps';
import ActionButton from 'react-native-action-button';
//import Icon from 'react-native-vector-icons/Ionicons';
import MyModal from '../../component/modal';
import LocationFactory from '../../factories/LocationFactory';
import { Icon } from 'react-native-elements'
import {firebaseApp} from '../../component/Firebase/config';

class HomeScene extends Component {

  static navigationOptions = {
    headerTitle: 'Bus Map',
    headerTintColor: '#fff',
    headerTitleStyle: {
      flex: 1,
      fontSize: 20,
      fontWeight: '400',
      backgroundColor: '#1abc9c',
      alignSelf: 'center',
      paddingTop: 12,

    },
    headerStyle: {
      borderBottomColor: '#fff',
      borderBottomWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: '#1abc9c',

    },
  };

  constructor() {
    super();
    this.toggleModal = this.toggleModal.bind(this);
    this.itemRef= firebaseApp.database();
     this.state = {
       coordinate:
        {
         latitude: 10.893324,
         longitude: 106.770576,
       },
     };
  }

  toggleModal() {
    this.refs.MyModal.toggleModal();
  }


  getData(){
    const lat = this.itemRef.ref('ToaDo').child('KinhDo').on('value',function(kinhdo) {
      console.log('kinhdo',kinhdo);
    });
    const lng = this.itemRef.ref('ToaDo').child('ViDo').on('value',function(vido) {
      console.log('vido',vido);
    });
    this.setState({
      coordinate:{
        latitude:lat,
        longitude:lng,
      }
    })

  }

  async componentDidMount() {
    //await LocationFactory.getDataFromAddress();
   await this.getData();

    /*setTimeout(() => {
        console.log('sda');
        this.setState({
          coordinate:
              {
                latitude:this.lat,// this.props.Location.lat,
                longitude:this.lng,//this.props.Location.lng,
              },
          coordinate2:{
            latitude: 10.393324,
            longitude: 106.957633,
          }

      });
    }, 0);
*/
  }


  render() {
    return (

        <View style={{ flex: 1 }}>
          <View style={styles.container}>

            <MapView style={styles.map} region={{
              latitude: 10.893324,
              longitude: 106.770576,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
                     showsUserLocation={true}
                     showsMyLocationButton={true}
                     showsCompass={true}
                     followsUserLocation={true}
                     loadingEnabled={true}
                     toolbarEnabled={true}
                     zoomEnabled={true}
                     rotateEnabled={true}
                     scrollEnabled={true}
                     showsTraffic={true}

            >

             <Marker
                  coordinate={this.state.coordinate}
                  image={require('../../Icon/bus.png')}
              title={'Tuyến Số 1'}/>


              <Polyline
                  coordinates={[
                    { latitude: 10.851326, longitude: 106.776779 },
                    { latitude: 10.857906, longitude: 106.787864 },
                    { latitude: 10.856051, longitude:  106.788942 },
                  ]}
                  strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                  strokeColors={[
                    '#7F0000',
                    '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                    '#B24112',
                    '#E5845C',
                    '#238C23',
                    '#7F0000'
                  ]}
                  strokeWidth={6}
              />
            </MapView>

            <ActionButton buttonColor='#1abc9c'>
              <ActionButton.Item buttonColor='#3498db' title="Tìm đường"
                                 onPress={()=>{}}>
                <Icon name='border-color' type='Ionicons' style={styles.actionButtonIcon}/>
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#1abc9c' title="Tìm tuyến xe buýt"
                                 onPress={this.toggleModal}>
                <Icon name='search' type='EvilIcons'
                      style={styles.actionButtonIcon}/>
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
});

const mapStateToProps = state => {
  const { Location } = state;

  console.log('Location', Location);

  return {
    Location,
  };
};

export default connect(mapStateToProps, null)(HomeScene);