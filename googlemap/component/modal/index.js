import React from 'react';
import {
  Text,
  View,
  FlatList,TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import index from '../../scenes/Home';
import MapView from 'react-native-maps';


const flatListData = [
  {
    'key':'1',
    'name': 'Tuyến số 01',
    'route': 'Bến Thành- BX Chợ Lớn',
  },
  {
    'key':'2',
    'name': 'Tuyến số 02',
    'route': 'Bến Thành- BX Miền Tây',
  },
  {
    'key':'3',
    'name': 'Tuyến số 03',
    'route': 'Bến Thành- Thạnh Lộc',
  },
  {
    'key':'4',
    'name': 'Tuyến số 04',
    'route': 'Bến Thành- Cộng Hòa- An Sương',
  },
  {
    'key':'5',
    'name': 'Tuyến số 05',
    'route': 'Bến xe Chợ Lớn - Biên Hòa',
  },
  {
    'key':'6',
    'name': 'Tuyến số 06',
    'route': 'Bến xe Chợ Lớn- Đại học Nông Lâm',
  },
  {
    'key':'7',
    'name': 'Tuyến số 07',
    'route': 'Bến xe Chợ Lớn- Gò vấp',
  },
  {
    'key':'8',
    'name': 'Tuyến số 08',
    'route': 'Bến xe Quận 8- Đại học Quốc Gia',
  },
  {
    'key':'9',
    'name': 'Tuyến số 09',
    'route': 'Chợ Lớn - Bình Chánh - Hưng Long',
  },
  {
    'key':'10',
    'name': 'Tuyến số 10',
    'route': 'Đại học Quốc Gia- Bến xe Miền Tây',
  },
  {
    'key':'11',
    'name': 'Tuyến số 11',
    'route': 'Đầm Sen - Bến Thành - Thảo Điền',
  },
  {
    'key':'12',
    'name': 'Tuyến số 12',
    'route': 'Bến Thành - Thác Giang Điền',
  },

  {
    'key':'13',
    'name': 'Tuyến số 13',
    'route': 'Công Viên 23/9 - Bến xe Củ Chi',
  },
  {
    'key':'14',
    'name': 'Tuyến số 14',
    'route': 'Miền Đông- 3 tháng 2- Miền Tây',
  },
  {
    'key':'15',
    'name': 'Tuyến số 15',
    'route': 'Bến Phú Định- Đầm Sen',
  },
  {
    'key':'dfsfsgfrgdffsdfsdsd',
    'name': null,
    'route': null,
  },

];

export default class MyModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  renderItem(item, index) {
    return (
        <View style={{backgroundColor:'#c9c9ab',flex:1}}>
          <TouchableOpacity onPress={()=>{{}}}>
            <View style={{
              borderRadius:4,
              flex: 1,margin:3,
              backgroundColor: 'white'
            }}>
              <Text style={{fontSize: 22,textAlign:'center',fontWeight: 'bold',}}>{item.name}</Text>
              <Text style={{textAlign:'center',paddingTop:4,fontSize: 14}}>{item.route}</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
  }

  renderContent() {
    const { wrapper } = styles;
    return (
        <View style={wrapper}>
          <View style={{ padding: 5 }}>
            <Text style={{ fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold',}}>Chọn
              tuyến xe buýt</Text>

            <FlatList data={flatListData}
                        renderItem={({ item, index }) => this.renderItem(item, index)}
              />
          </View>
        </View>
    );
  }

  toggleModal() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    const { show } = this.state;
    return (
        <Modal
            animationInTiming={50}
            isVisible={show}
            onBackdropPress={this.toggleModal}
            onSwipe={this.toggleModal}
        >
          <View style={{ flexDirection: 'row' }}>
            {this.renderContent()}
          </View>
        </Modal>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  wrapper: {
    flex: 1,
    margin: 20,
    borderWidth: 0,
    borderRadius: 6,
    backgroundColor: '#1abc9c',
  },
  headerContainer: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#fff',
  },
  headerContentStyle: {
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  counterContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
  },

  buttonContainer: {
    marginVertical: 10,
    alignItems: 'center',
    paddingVertical: 5,
  },
  textButton: {
    color: '#fff',
    backgroundColor: 'blue',
    fontWeight: '600',
    fontSize: 14,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  text1: {
    color: 'white',
//    textAlign:'center',
    fontSize: 40,

  },

  wrapper1: {
    flex: 1,
    margin: 120,
    borderWidth: 0,
    borderRadius: 6,
    backgroundColor: '#2034bc',
  },
};

