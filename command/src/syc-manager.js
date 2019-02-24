const inquirer = require('inquirer')

const dbm = require('./dbm')
const fetch = require('./fetch')
const encryptUtils = require('./encrypt-utils')
const tokenManager = require('./token-manager')

function getPasswordByTitle(title, callback) {
  const result = dbm.get(title)
  if (result) {
    return encryptUtils.decrypt(result.password)
  } else {
    fetch.fetchPasswordsPromise().then((response) => {
      if (!response.data) {
        console.log('not remote password')
        callback();
      }

      dbm.write(response.data)
      const results = response.data.Items.filter(item => {
        if (item.title + '' === title + '') {
          return item
        }
      })

      if (results && results.length > 0) {
        let decrypt = encryptUtils.decrypt(results[0].password)
        return callback(decrypt);
      } else {
        return callback('title not work');
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
    iv: hashPassword
  })
  tokenManager.setUserToken(hashPassword)
  callback()
}

function listAllTitle() {
  return dbm.getAllTitle()
}

module.exports.getPasswordByTitle = getPasswordByTitle
module.exports.askMasterPassword = askMasterPassword
module.exports.configMasterPassword = configMasterPassword
module.exports.listAllTitle = listAllTitle
