import {syncs} from '../realm/schemas';
import AppSettings from '../utils/AppSettings';
import {NetworkStatusApi} from '../components/networkStatus/NetworkStatus';

export default class SyncService {
  static tasks = [];
  static delay = AppSettings.syncDelay;
  static isExecuting = false;
  static lastExecutionTime = null;
  static timer = null;

  static syncNow() {
    this.executeTasks();
  }

  static init() {
    // Add task for each schema
    syncs.forEach(s => {
      if (s) {
        this.addTask(s);
      }
    });
    this.isExecuting = true;
    console.log('[SYNC] START SYNC');
    this.executeTasks();

    // listen internet connection change
    NetworkStatusApi.addEventListener((isConnected) => {
      if (!isConnected) {
        this.isExecuting = false;
        if (this.timer) {
          clearTimeout(this.timer);
        }
        return;
      }
      if (isConnected && !this.isExecuting) {
        this.executeTasks();
      }
    });
  }

  static executeTasks() {
    try {
      // clear the timeout to prevent unexpected syncing
      if (this.timer) {
        clearTimeout(this.timer);
      }

      // check internet connection
      NetworkStatusApi.hasConnection(() => {
        console.log('[SYNC] executeTasks()');
        this.tasks.forEach((t) => {
          t.task();
        });

        console.log('[SYNC] DONE');

        this.lastExecutionTime = new Date();

        this.timer = setTimeout(() => {
          this.executeTasks();
        }, this.delay);
      }, () => {
        // no internet connection
        this.isExecuting = false;
      });
    }
    catch (e) {
      console.log('[SYNC] executeTasks() ERROR', e);
      this.isExecuting = false;
    }
  }

  static addTask(task) {
    this.tasks.push({
      task: task
    });
  }
}