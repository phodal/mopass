#!/usr/bin/env node

const inquirer = require('inquirer');
const argv = require('yargs')
  .usage('Usage: $0 [commmand]')
  .argv;
const generator = require('./src/generator');

if (argv.generate) {

  let password = generator.password(answers);
  console.log(password);

  var validateLength = function (data) {
    console.log(data);
    return /\d/.test(data);
  };

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'length',
        message: 'password length',
        validate: validateLength
      },
      {
        type: 'list',
        name: 'type',
        message: 'choice password type',
        choices: ['secure', 'normal']
      }])
    .then(answers => {
      let password = generator.password(answers);
      console.log(password);
    });
}

function getUserHome() {
  return process.env.HOME || process.env.USERPROFILE;
}

console.log(getUserHome())
