const axios = require('axios');

axios.defaults.baseURL = 'https://spm.wdsm.io';
axios.defaults.headers.common['Authorization'] = 'allow';

function getPasswords(token) {
  axios.get('https://spm.wdsm.io/sync?token=' + token)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
}


getPasswords('23432414');
