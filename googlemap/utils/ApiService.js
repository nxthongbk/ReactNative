import { DialogApi } from '../component/dialog/Dialog';

let inFlightAuthRequest = null;
let numberOfRetried = 0;
let maxRetry = 3;

const TOKEN_IMGUR = '83d5b88f58402a9992afc51ab29671dc7f70125c';
const DOMAIN = 'https://eu.airvantage.net/api';
export default class ApiService {
  constructor() {
    this.requests = [];
  }

  static _toastError(e) {
    let res = e.response;
    console.log('_toastError', res);

    let message = e.message || '';
    console.log('_toastError message', message);
    if (res && res.status === 404) {
      DialogApi.alertError(`${res.status} - Request not found`);
    }
    else if (res && res.status === 500) {
      DialogApi.alertError(`500 - Server Internal Error`);
    }
    else if (res && res.status === 400) {
      DialogApi.alertError(
          `${res.status}${message ? ` - ${message}` : ''}`);
    } else {
      DialogApi.alertError(
          `${message.length > 0 ? message : 'Uncaught error'}`);
    }
  }

  static async _getToken() {
    // const { token } = await AuthFactory.getToken();
    // return token;
    return ''
  }

  static async _getRefreshToken() {
    return null;
  }

  static async _recall(request, resolve, reject, config) {
    request.config.headers = await this._generateHeader();
    fetch(request.url, request.config).then(async (response) => {
      try {
        delete request.config.headers;
        await this._checkStatus(response, resolve, request, reject, config);
      }
      catch (e) {
        console.log('RECALL catch....', e);
        reject(e);
      }
    });
  }

  static async _checkStatus(response, resolve, request, reject, config) {
    if (response.status >= 200 && response.status < 300) {
      // If response is ok then return response
      return resolve(response.json());
    } else {
      let jsonResult;

      // If response is not ok
      if (response.status === 401) {
        numberOfRetried++;
        if (numberOfRetried > maxRetry) {
          numberOfRetried = 0;
          let err = new Error('Reached maximum retry!!! LOGGED OUT!');

          if (reject) {
            reject(err);
            return;
          }

          // Throw error
          throw error;
        }
        // and this response status is 401
        if (inFlightAuthRequest) { // Check if there is already a promise get new token
          // then handle the promise callback
          inFlightAuthRequest.then(async () => {
            // when promise get new token resolved, re-call the request
            // await this._recall(request, resolve, reject, config);
          }, (err) => {
            console.log('inFlightAuthRequest error 1', err);
          }).catch((e) => {
            console.log('inFlightAuthRequest catch 1', e);
          });
          return;
        }
        try {
          // get new token by refresh token
          // await this._refreshToken(reject);

          // then handle the promise callback
          inFlightAuthRequest.then(async () => {
            // when promise get new token resolved, re-call the request
            // await this._recall(request, resolve, reject, config);
          }, (err) => {
            console.log('inFlightAuthRequest error 2', err);
          }).catch((e) => {
            console.log('inFlightAuthRequest catch 2', e);
          });
        } catch (e) {
          reject(e);
        }

        return response;
      }
      else if (response.status === 400) {
        console.log('Response', response);
        try {
          jsonResult = await response.json();
          console.log('Response Json Result', jsonResult);
        } catch (e) {
          console.log('_checkStatus await response.json()', e);
        }
        console.log('Response json', jsonResult);
      }

      let error = new Error(jsonResult ? jsonResult.errors[0] : '');
      error.response = response;
      if (!config || !config.disabledToast) {
        //TODO translate error key here, implement later
        this._toastError(error);
      }

      if (reject) {
        reject(jsonResult);
        return;
      }

      // Throw error
      throw error;
    }
  }

  static _convertToQueryString(obj) {
    obj = obj || {};
    let result = [];
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        result.push(`${i}=${obj[i]}`);
      }
    }
    return result.join('&');
  }

  static _generateHeader() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  static async _refreshToken() {
    let mess = 'You\'re no longer logged in, please sign out and sign in again!';
    let refreshToken = await this._getRefreshToken();
    if (!refreshToken) {
      let er = new Error(mess);
      await this._toastError(er);
      throw er;
    }
    try {
      console.log('Get new token..');
      inFlightAuthRequest = this.get('/api/auth', {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).then(async (res) => {
        // await UserFactory.setTokens(res.data.access_token,
        // res.data.refresh_token);
        return res;
      }, (err) => {
        console.log('get new token error', err);
      }).catch((e) => {
        console.log('get new token catch', e);
      });
    } catch (e) {
      console.log('get new token failed');
      let er = new Error(mess);
      this._toastError(er);
      throw er;
    }
  }

  static _catch(e) {
    console.log('API call error', e.response);
    if (e && e.response && e.response.status === 401) {
      console.log('Token was expired, getting new token now');
    }
    else {
      const err = new Error('Error');
      err.response = e.response;
      throw err;
    }
  }

  static async get(url, qs, config) {
    let self = this;
    let queryString = this._convertToQueryString(qs);
    let header = this._generateHeader();
    let requestUrl = `${DOMAIN}${url}${queryString.length ?
        ('?' + queryString) :
        ''}`;
    let requestConfig = {
      method: 'GET',
      headers: header,
    };
    return new Promise((resolve, reject) => {
      console.log('GET ' + requestUrl, requestConfig);
      fetch(requestUrl, requestConfig).then(async (response) => {
        try {
          delete requestConfig.headers;
          await this._checkStatus(response, resolve, {
            url: requestUrl,
            config: requestConfig,
          }, reject, config);
        }
        catch (e) {
          console.log('GET catch....', e);
          reject(e);
        }
      }).catch((e) => {
        console.log('GET catch.... 3', e);
        self._toastError(e);
        reject(e);
      });
    });
  }

  static async post(url, body, qs, config) {
    let self = this;
    let queryString = this._convertToQueryString(qs);
    let header = this._generateHeader();
    let requestUrl = `${DOMAIN}${url}${queryString.length ?
        ('?' + queryString) : ''}`;
    console.log(requestUrl);
    let requestConfig = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(body),
    };
    return new Promise((resolve, reject) => {
      console.log('POST ', requestUrl, requestConfig);
      fetch(requestUrl, requestConfig).then(async (response) => {
        try {
          delete requestConfig.headers;
          await this._checkStatus(response, resolve, {
            url: requestUrl,
            config: requestConfig,
          }, reject, config);
        }
        catch (e) {
          console.log('POST catch....', e);
          reject(e);
        }
      }).catch((e) => {
        console.log('POST catch.... 3', e);
        self._toastError(e);
        reject(e);
      });
    });
  }

  static async patch(url, body, qs, config) {
    let self = this;
    let queryString = this._convertToQueryString(qs);
    let header = this._generateHeader();
    let requestUrl = `${DOMAIN}${url}${queryString.length ?
        ('?' + queryString) :
        ''}`;
    let requestConfig = {
      method: 'PATCH',
      headers: header,
      body: JSON.stringify(body),
    };
    return new Promise((resolve, reject) => {
      console.log('PATCH ' + requestUrl, requestConfig);
      fetch(requestUrl, requestConfig).then(async (response) => {
        try {
          delete requestConfig.headers;
          await this._checkStatus(response, resolve, {
            url: requestUrl,
            config: requestConfig,
          }, reject, config);
        }
        catch (e) {
          console.log('PATCH catch....', e);
          reject(e);
        }
      }).catch((e) => {
        console.log('PATCH catch.... 3', e);
        self._toastError(e);
        reject(e);
      });
    });
  }

  static async put(url, body, qs, config) {
    let self = this;
    let queryString = this._convertToQueryString(qs);
    let header = this._generateHeader();
    let requestUrl = `${DOMAIN}${url}${queryString.length ?
        ('?' + queryString) :
        ''}`;
    let requestConfig = {
      method: 'PUT',
      headers: header,
      body: JSON.stringify(body),
    };
    return new Promise((resolve, reject) => {
      console.log('PUT ' + requestUrl, requestConfig);
      fetch(requestUrl, requestConfig).then(async (response) => {
        try {
          delete requestConfig.headers;
          await this._checkStatus(response, resolve, {
            url: requestUrl,
            config: requestConfig,
          }, reject, config);
        }
        catch (e) {
          console.log('PUT catch....', e);
          reject(e);
        }
      }).catch((e) => {
        console.log('PUT catch.... 3', e);
        self._toastError(e);
        reject(e);
      });
    });
  }

  static async delete(url, body, qs, config) {
    let self = this;
    let queryString = this._convertToQueryString(qs);
    let header = this._generateHeader();
    let requestUrl = `${DOMAIN}${url}${queryString.length ?
        ('?' + queryString) :
        ''}`;
    let requestConfig = {
      method: 'DELETE',
      headers: header,
      body: JSON.stringify(body),
    };
    return new Promise((resolve, reject) => {
      console.log('DELETE ' + requestUrl, requestConfig);
      fetch(requestUrl, requestConfig).then(async (response) => {
        try {
          delete requestConfig.headers;
          await this._checkStatus(response, resolve, {
            url: requestUrl,
            config: requestConfig,
          }, reject, config);
        }
        catch (e) {
          console.log('DELETE catch....', e);
          reject(e);
        }
      }).catch((e) => {
        console.log('DELETE catch.... 3', e);
        self._toastError(e);
        reject(e);
      });
    });
  }

  static async uploadImage(imageUri) {
    let header = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${TOKEN_IMGUR}`,
    };
    let self = this;
    let photo = {
      uri: imageUri,
      type: 'image/jpeg',
      name: `${new Date().getTime().toString()}.jpg`,
    };

    let body = new FormData();
    body.append('image', photo);

    const requestConfig = {
      method: 'POST',
      body: body,
      headers: header,
    };

    let requestUrl = 'https://api.imgur.com/3/image';

    return new Promise((resolve, reject) => {
      fetch(requestUrl, requestConfig).then(async (response) => {
        try {
          delete requestConfig.headers;
          await this._checkStatus(response, resolve, {
            url: requestUrl,
            config: requestConfig,
          }, reject);
        }
        catch (e) {
          console.log('Upload catch....', e);
          reject(e);
        }
      }).catch((e) => {
        console.log('Upload catch.... 3', e);
        self._toastError(e);
        reject(e);
      });
    });
  }
}