// Do you want to sync to Server ?


const inquirer = require('inquirer');
const { from } = require('rxjs');

const dbm = require('./dbm');
const encryptUtils = require('./encrypt-utils');

function validatePassword(data) {
  // return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(data);
  return data.length >= 8;
}

function creator() {
  const pwdInfo = {
    title: '',
    password: ''
  };
  const questions = [{
    type: 'input',
    name: 'title',
    message: 'password title',
    validate: dbm.checkTitleDuplicate
  }, {
    type: 'password',
    name: 'password',
    mask: true,
    message: 'your password',
    validate: validatePassword
  }];

  const observable = from(questions);
  inquirer.prompt(observable).ui.process.subscribe(
    function(ans) {
      if (ans.name === 'title') {
        pwdInfo.title = ans.answer;
      }
      if (ans.name === 'password') {
        pwdInfo.password = encryptUtils.encrypt(ans.answer);
      }
    },
    function(err) {
      console.log('Error: ', err);
    },
    function() {
      dbm.create(pwdInfo);
    });
}

module.exports.creator = creator;

