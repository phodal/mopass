const axios = require('axios');
const dbm = require('./dbm');
const TokenManager = require('./token-manager');

axios.defaults.baseURL = 'https://spm.wdsm.io';
axios.defaults.headers.common['Authorization'] = TokenManager.getAuthToken();

function fetchPasswords() {
  fetchPasswordsPromise()
    .then(function (response) {
      dbm.write(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
}

function fetchPasswordsPromise() {
  return axios.get('https://spm.wdsm.io/sync?token=' + TokenManager.getUserToken());
}

function create(pwdInfo) {
  console.log('create to server....');
  axios.post('https://spm.wdsm.io/sync', {
    title: pwdInfo.title,
    password: pwdInfo.password,
    token: TokenManager.getUserToken()
  })
    .then(function (response) {
      dbm.create(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
}

module.exports.fetchPasswords = fetchPasswords;
module.exports.create = create;
module.exports.fetchPasswordsPromise = fetchPasswordsPromise;
