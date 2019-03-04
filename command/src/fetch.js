const axios = require('axios')
const dbm = require('./dbm')
const TokenManager = require('./token-manager')

axios.defaults.baseURL = 'https://spm.wdsm.io'
axios.defaults.headers.common['Authorization'] = TokenManager.getAuthToken()

function fetchPasswords() {
  fetchPasswordsPromise()
    .then(function(response) {
      dbm.write(response.data)
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.status)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
      console.log(error.config)
    })
}

function fetchPasswordsPromise() {
  return axios.get('https://spm.wdsm.io/sync?token=' + TokenManager.getUserToken())
}

function deletePasswordPromise(pwdInfo) {
  console.log(pwdInfo)
  return axios.delete('https://spm.wdsm.io/sync', {
    data: {
      id: pwdInfo.id,
      token: TokenManager.getUserToken()
    }
  })
}

function create(pwdInfo) {
  console.log('create to server....')
  let options = pwdInfo
  options.token = TokenManager.getUserToken()

  axios.post('https://spm.wdsm.io/sync', options)
    .then(function(response) {
      dbm.create(response.data)
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.status)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
      console.log(error.config)
    })
}

function update(pwdInfo) {
  console.log('create to server....')
  axios.put('https://spm.wdsm.io/sync', {
    id: pwdInfo.id,
    title: pwdInfo.title,
    password: pwdInfo.password,
    token: TokenManager.getUserToken()
  })
    .then(function(response) {
      dbm.create(response.data)
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.data)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    })
}

function batchWrite(pwdInfo) {
  console.log('create to server....')
  axios.post('https://spm.wdsm.io/batch', pwdInfo)
    .then(function(response) {

    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.data)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    })
}

module.exports.fetchPasswords = fetchPasswords
module.exports.create = create
module.exports.update = update
module.exports.batchWrite = batchWrite
module.exports.fetchPasswordsPromise = fetchPasswordsPromise
module.exports.deletePasswordPromise = deletePasswordPromise
