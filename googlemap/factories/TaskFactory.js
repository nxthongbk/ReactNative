import ApiService from '../utils/ApiService';
import {RealmService} from '../realm/Provider';
import {SCHEMA} from '../realm/schemas';
import UserFactory from './UserFactory';
import SyncFactory from './SyncFactory';

export default class TaskFactory extends SyncFactory {
  // required for sync
  static getSchemaName() {
    return SCHEMA.TASK;
  }

  static async getRemoteData() {
    try {
      // api call
      return null;
    }
    catch (e) {
      return null;
    }
  }

  static async getAll() {
    try {
      const data = await RealmService.getAll(SCHEMA.TASK);
      return RealmService.toPlains(SCHEMA.TASK, data);
    } catch (e) {
      console.log('[ERROR] TaskFactory getAll()', e);
      return [];
    }
  }
}