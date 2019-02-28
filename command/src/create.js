// Do you want to sync to Server ?

const inquirer = require('inquirer')
const { from } = require('rxjs')

const dbm = require('./dbm')
const encryptUtils = require('./encrypt-utils')
const fetch = require('./fetch')

function validatePassword(data) {
  // return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(data);
  return data.length >= 8
}

function creator() {
  const pwdInfo = {
    type: 'simple',
    title: '',
    password: ''
  }
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
  }]

  const observable = from(questions)
  inquirer.prompt(observable).ui.process.subscribe(
    function(ans) {
      if (ans.name === 'title') {
        pwdInfo.title = ans.answer
      }
      if (ans.name === 'password') {
        pwdInfo.password = encryptUtils.encrypt(ans.answer)
      }
    },
    function(err) {
      console.log('Error: ', err)
    },
    function() {
      fetch.create(pwdInfo)
    })
}

function createMFA() {
  const pwdInfo = {
    type: 'mfa',
    title: '',
    password: ''
  }
  const questions = [{
    type: 'input',
    name: 'title',
    message: 'password title',
    validate: dbm.checkTitleDuplicate
  }, {
    type: 'password',
    name: 'mfa',
    mask: true,
    message: 'your mfa password',
    validate: validatePassword
  }]

  const observable = from(questions)
  inquirer.prompt(observable).ui.process.subscribe(
    function(ans) {
      if (ans.name === 'title') {
        pwdInfo.title = ans.answer
      }
      if (ans.name === 'mfa') {
        pwdInfo.password = encryptUtils.encrypt(ans.answer)
      }
    },
    function(err) {
      console.log('Error: ', err)
    },
    function() {
      fetch.create(pwdInfo)
    })
}

function update(title) {
  const pwdInfo = {
    title: title,
    password: ''
  }
  const questions = [{
    type: 'password',
    name: 'password',
    mask: true,
    message: 'your new password',
    validate: validatePassword
  }]

  const observable = from(questions)
  inquirer.prompt(observable).ui.process.subscribe(
    ans => {
      if (ans.name === 'password') {
        pwdInfo.password = encryptUtils.encrypt(ans.answer)
      }
    },
    err => {
      console.log('Error: ', err)
    },
    (complete) => {
      let item = dbm.getItemByTitle(title)
      if (item) {
        pwdInfo.id = item.id
        fetch.update(pwdInfo)
      } else {
        console.log('Error: title' + title + ' not exist')
      }
    })
}

module.exports.creator = creator
module.exports.createMFA = createMFA
module.exports.update = update

