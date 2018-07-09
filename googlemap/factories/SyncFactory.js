import Promise from '../utils/Promise';
import {GetSchemaSync} from '../realm/schemas';

let _callbacks = [];

const TYPE = {
  'SYNC': 'SYNC',
  'DATA_READY': 'DATA_READY',
};

export default class SyncFactory {
  static _syncPromise = Promise();
  static _dataReadyPromise = Promise();

  static isSynced = false;
  static isSyncing = false;

  // this method must be override
  static getSchemaName() {
    // place holder
  };

  static getCallBacks() {
    return _callbacks;
  }

  static onSyncComplete(cb) {
    _callbacks.push({name: TYPE.SYNC, cb: cb});
  }

  static removeOnSyncComplete(cb) {
    _callbacks = _callbacks.filter(c => {
      return c.name === TYPE.SYNC && c.cb !== cb;
    });
  }

  static onDataReady(cb) {
    _callbacks.push({name: TYPE.DATA_READY, cb: cb});
    if (this.isSynced) {
      cb();
    }
  }

  static removeOnDataReady(cb) {
    _callbacks = _callbacks.filter(c => {
      return c.name === TYPE.DATA_READY && c.cb !== cb;
    });
  }

  static fireCallbacks(type) {
    const callbacks = this.getCallBacks();
    callbacks.forEach(c => {
      if (c.name === type) {
        c.cb();
      }
    });
  }

  static sync() {
    const sync = GetSchemaSync(this.getSchemaName());
    if (sync) {
      sync();
    }
  }

  static _startSync() {
    this._syncPromise = Promise();
    this._dataReadyPromise = Promise();
    this._syncPromise.then(() => {
      this.fireCallbacks(TYPE.SYNC);
    });
    this._dataReadyPromise.then(() => {
      this.fireCallbacks(TYPE.DATA_READY);
    });
    this.isSyncing = true;
  }

  static _stopSync() {
    this._syncPromise.resolve();
  }

  static syncDone() {
    this.isSyncing = false;
    this._syncPromise.resolve();
  }

  static dataReadyDone(){
    this.isSynced = true;
    this._dataReadyPromise.resolve();
  }
}