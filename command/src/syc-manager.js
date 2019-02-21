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
      encryptUtils.configKey({
        iv: answers.masterPassword
      });
      let token = encryptUtils.encrypt(answers.masterPassword);
      tokenManager.setUserToken(token);
      callback();
    });
}

function listAllTitle() {
  const titles = dbm.getAllTitle();
  console.log(titles);
}

module.exports.getPasswordByTitle = getPasswordByTitle;
module.exports.askMasterPassword = askMasterPassword;
module.exports.listAllTitle = listAllTitle;
