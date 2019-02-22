const inquirer = require('inquirer');

const dbm = require('./dbm');
const fetch = require('./fetch');
const encryptUtils = require('./encrypt-utils');
const tokenManager = require('./token-manager');

function getPasswordByTitle(title) {
  const result = dbm.get(title);
  if (result) {
    return encryptUtils.decrypt(result.password);
  } else {
    fetch.fetchPasswordsPromise().then((data) => {
      dbm.write(data);
      const results = data.Items.filter(item => {
        return item.title === title;
      });

      if (results) {
        return encryptUtils.decrypt(results[0].password);
      } else {
        return '';
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
      message: 'master password',
    }
    ])
    .then(answers => {
      configMasterPassword(answers.masterPassword, callback);
    });
}

function configMasterPassword(masterPassword, callback) {
  let hashPassword = encryptUtils.hashString(masterPassword);
  encryptUtils.configIv({
    iv: hashPassword
  });
  tokenManager.setUserToken(hashPassword);
  callback();
}

function listAllTitle() {
  return dbm.getAllTitle();
}

module.exports.getPasswordByTitle = getPasswordByTitle;
module.exports.askMasterPassword = askMasterPassword;
module.exports.configMasterPassword = configMasterPassword;
module.exports.listAllTitle = listAllTitle;
