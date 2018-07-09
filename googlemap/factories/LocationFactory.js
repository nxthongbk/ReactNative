import ApiService from '../utils/ApiService';
import axios from 'axios';
import {
  AsyncStorage,
  Alert,
} from 'react-native';
import store from '../redux/store';
import { fromLocation } from '../redux/location';

const userName = 'nxthongbk@gmail.com';
const passWord = '1_Abc_123';
const cliID = '495cf47ea7254dde8c33cde2ad5919fe';
const cliSecrect = '78c90c9033684ebcb0a0d4980d7559ec';
const tagetID = '5b5e040ebbf242fd8ca2cb1058e59217';
const lngID = 'LOCATION_PUSH_FWV3.home1.room1.Kinh_do';
const latID = 'LOCATION_PUSH_FWV3.home1.room1.Vi_do';
const tagetIDFx30 = '5b5e040ebbf242fd8ca2cb1058e59217';


export default class LocationFactory {

  static async getToken() {
    return await AsyncStorage.getItem('access_token');
  }

  static async setToken() {
    try {

      const { data } = await axios.get(
          `https://eu.airvantage.net/api/oauth/token?grant_type=password&username=${userName}&password=${passWord}&client_id=${cliID}&client_secret=${cliSecrect}`);
      await AsyncStorage.setItem('access_token', data.access_token);
      await this.getDataFromAddress();
    } catch (error) {
      console.log('[ERROR] getToken', error);
    }
  }

  static async getDataFromAddress() {
    try {
      const accessToken = await this.getToken();
      if (accessToken === null) {
        await this.setToken();
      } else {
        const lngData = await axios.get(
            `https://eu.airvantage.net/api/v1/systems/data/raw?targetIds=${tagetID}&dataIds=${lngID}&access_token=${accessToken}`);

        const latData = await axios.get(
            `https://eu.airvantage.net/api/v1/systems/data/raw?targetIds=${tagetID}&dataIds=${latID}&access_token=${accessToken}`);
        const lng = parseInt(lngData.data[tagetID][lngID][0].v) / 1000000;
        const lat = parseInt(latData.data[tagetID][latID][0].v) / 1000000;
       // alert(lat);

        store.dispatch(fromLocation.Actions.setLocation({
          lng,
          lat,
        }));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          await this.setToken();
        }
      } else {
        console.log('[ERROR] getDataFromAddress', error);

      }
    }
  }
}

