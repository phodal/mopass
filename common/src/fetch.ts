const axios = require('axios');
const TokenManager = require('./token-manager');

axios.defaults.baseURL = 'https://spm.wdsm.io';
axios.defaults.headers.common['Authorization'] = TokenManager.getAuthToken();

function fetchPasswordsPromise() {
  return axios.get('https://spm.wdsm.io/sync?token=' + TokenManager.getUserToken());
}

function createPasswordPromise(pwdInfo: PasswordInfo) {
  return axios.post('https://spm.wdsm.io/sync', {
    title: pwdInfo.title,
    password: pwdInfo.password,
    token: TokenManager.getUserToken()
  });
}

export default {
  fetchPasswordsPromise: fetchPasswordsPromise,
  createPasswordPromise: createPasswordPromise
}
