// Do you want to sync to Server ?

const inquirer = require('inquirer');
const dbm = require('./dbm');

function validatePassword(data) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(data);
}

function creator() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'length',
        message: 'password title',
        validate: dbm.checkTitleDuplicate
      },
      {
        type: 'password',
        name: 'length',
        mask: true,
        message: 'your password',
        validate: validatePassword
      }
    ])
    .then(answers => {
      console.log(answers);
    });
}

module.exports.creator = creator;

