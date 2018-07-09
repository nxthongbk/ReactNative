import ApiService from '../utils/ApiService';
import {RealmService} from '../realm/Provider';
import {SCHEMA} from '../realm/schemas';
import SyncFactory from './SyncFactory';

export default class UserFactory extends SyncFactory {
  // required for sync
  static getSchemaName() {
    return SCHEMA.USER;
  }

  static async currentUser() {
    try {
      return null;
    }
    catch (e) {
      return null;
    }
  }

  static async getRemoteData() {
   
  }
}