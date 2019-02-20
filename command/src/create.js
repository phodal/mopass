// Do you want to sync to Server ?

const inquirer = require('inquirer');
const dbm = require('./dbm');
const { from } = require('rxjs');

function validatePassword(data) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(data);
}

function creator() {
  const questions = [{
    type: 'input',
    name: 'length',
    message: 'password title',
    validate: dbm.checkTitleDuplicate
  }, {
    type: 'password',
    name: 'length',
    mask: true,
    message: 'your password',
    validate: validatePassword
  }];

  const observable = from(questions);
  inquirer.prompt(observable).ui.process.subscribe(
    function(ans) {
      console.log('Answer is: ', ans);
    },
    function(err) {
      console.log('Error: ', err);
    },
    function() {
      console.log('Completed');
    });
}

module.exports.creator = creator;

