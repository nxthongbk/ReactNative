import { HttpConnection, HubConnection, TransportType } from '@nois/signalr-client';
import { NetworkStatusApi } from '../components/networkStatus/NetworkStatus';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzM2E2NmRlMS1lNDg5LTQ2NjktOGZkMi1hZjgxMjQ4NWVmYmQiLCJuYmYiOjE1MTYxNzEwMDAsImV4cCI6MTUxNjI1NzQwMCwiaXNzIjoiaHR0cHM6Ly9ub2lzLmRhdGFiYXNlLndpbmRvd3MubmV0IiwiYXVkIjoiaHR0cHM6Ly9uYnVpbGRpbmcuYXp1cmV3ZWJzaXRlcy5uZXQifQ.5eQK8S_RHcRasrjTj2M1rh7Tp4GjDt43nD1QffR3XOs';

export default class SignalRService {
  static hubConnection = null;
  static httpConnection = null;
  static _token = token;
  static _isConnected = false;

  static init() {
    NetworkStatusApi.addEventListener(() => {
      if (!this._isConnected) {
        this.reconnect();
      }
    });
  }

  static connect(token) {
    console.log('[SIGNALR]', 'CONNECTING...');
    const transportType = TransportType.LongPolling;
    const hubUrl = 'https://nbuilding.azurewebsites.net/chatHub?token=' + token;
    this.httpConnection = new HttpConnection(hubUrl, { transport: transportType });
    this.hubConnection = new HubConnection(this.httpConnection);

    this.hubConnection.on('messageEvent', (data) => {
      console.log('[SIGNALR] messageEvent CALLBACK', data)
    });

    this.hubConnection.on('createGroup', ({ groupId }) => {
      console.log('[SIGNALR] createGroup CALLBACK', groupId)
    });

      this.hubConnection.start()
      .then((data) => {
        console.log('[SIGNALR] Connected!', this.httpConnection.connectionId);
        this.hubConnection.invoke('joinGroup', 'a7319358-9ef1-4604-89f2-6d74dc376a63');
        this._token = token;
        this._isConnected = true;
      }, (e) => {
        console.log('[SIGNALR] Failed!', e);
      })
      .catch((e) => {
        console.log('[SIGNALR] Catch!', e);
      });
  }

  static reconnect() {
    if (this._token) {
      this.connect(this._token);
    }
  }

  static clearToken() {
    this._token = null;
  }
}