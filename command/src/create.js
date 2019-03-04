// Do you want to sync to Server ?

const inquirer = require('inquirer')
const { from } = require('rxjs')

const dbm = require('./dbm')
const encryptUtils = require('./encrypt-utils')
const otpImportUtil = require('./otp-import-util')
const fetch = require('./fetch')
const TokenManager = require('./token-manager')

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
  }, {
    type: 'text',
    name: 'title',
    mask: true,
    message: 'your new title (N/[new Title])'
  }]

  const observable = from(questions)
  inquirer.prompt(observable).ui.process.subscribe(
    ans => {
      if (ans.name === 'password') {
        pwdInfo.password = encryptUtils.encrypt(ans.answer)
      }
      if (ans.name === 'title' && ans.answer.toLowerCase() === 'n') {
        pwdInfo.title = false
      } else {
        pwdInfo.title = ans.answer
      }
    },
    err => {
      console.log('Error: ', err)
    },
    (complete) => {
      let item = dbm.getItemByTitle(title)
      if (item) {
        pwdInfo.id = item.id
        pwdInfo.title = pwdInfo.title === false ? item.title : pwdInfo.title
        fetch.update(pwdInfo)
      } else {
        console.log('Error: title' + title + ' not exist')
      }
    })
}

function importMFAs(path) {
  let configs = otpImportUtil.readConfigByFile(path)
  if (!configs) {
    console.log('not config')
    return
  }
  configs = configs.map(config => {
    config.token = TokenManager.getUserToken()
    config.password = encryptUtils.encrypt(config.password)
    return config
  })
  fetch.batchWrite(configs)
}

module.exports.creator = creator
module.exports.createMFA = createMFA
module.exports.importMFAs = importMFAs
module.exports.update = update

