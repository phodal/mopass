const axios = require('axios');
const dbm = require('./dbm');
axios.defaults.baseURL = 'https://spm.wdsm.io';
axios.defaults.headers.common['Authorization'] = 'allow';

function fetchPasswords(token) {
  axios.get('https://spm.wdsm.io/sync?token=' + token)
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

module.exports.passwords = fetchPasswords;
