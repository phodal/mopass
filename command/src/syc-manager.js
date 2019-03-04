const inquirer = require('inquirer')

const dbm = require('./dbm')
const fetch = require('./fetch')
const encryptUtils = require('./encrypt-utils')
const tokenManager = require('./token-manager')
const mfaUtils = require('./mfa-utils')

function getPassword(result, callback) {
  let decrypt = encryptUtils.decrypt(result.password)
  if (result.type === 'mfa') {
    callback(mfaUtils.getMFAPassword(decrypt))
  } else {
    callback(decrypt)
  }
}

function getPasswordByTitle(title, callback) {
  const result = dbm.get(title)
  if (result) {
    return getPassword(result, callback)
  } else {
    fetch.fetchPasswordsPromise().then((response) => {
      if (!response.data) {
        console.log('not remote password')
        callback()
      }

      dbm.write(response.data)
      const results = response.data.Items.filter(item => {
        if (item.title + '' === title + '') {
          return item
        }
      })

      if (results && results.length > 0) {
        let result = results[0]
        return getPassword(result, callback)
      } else {
        return callback('title not work')
      }
    })
  }
}

function askMasterPassword(callback) {
  inquirer.prompt(
    [{
      type: 'password',
      name: 'masterPassword',
      mask: true,
      message: 'master password'
    }
    ])
    .then(answers => {
      configMasterPassword(answers.masterPassword, callback)
    })
}

function configMasterPassword(masterPassword, callback) {
  let hashPassword = encryptUtils.hashString(masterPassword)
  encryptUtils.configIv({
    iv: masterPassword
  })
  tokenManager.setUserToken(hashPassword)
  callback()
}

function listAllTitle() {
  return dbm.getAllTitle()
}

function deleteByTitle(title) {
  const result = dbm.getItemByTitle(title)
  if (result) {
    fetch.deletePasswordPromise({
      id: result.id
    }).then((response) => {
      console.log('200! delete success')
      console.log(response.data)
    }, (error) => {
      console.log('500! ERROR')
      console.log(error.response.data)
    })
  } else {
    console.log('Error, not exist password in local')
  }
}

module.exports.getPasswordByTitle = getPasswordByTitle
module.exports.askMasterPassword = askMasterPassword
module.exports.configMasterPassword = configMasterPassword
module.exports.listAllTitle = listAllTitle
module.exports.deleteByTitle = deleteByTitle
