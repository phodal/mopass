#!/usr/bin/env node

const chalk = require('chalk');
const argv = require('yargs')
  .usage('Usage: $0 [commmand]')
  .command('create', 'create a password in local and server')
  .command('fetch', 'fetch all password from server')
  .command('get', 'get password by title')
  .command('generate', 'generate a new password')
  .argv;

const generator = require('./src/generator');
const creator = require('./src/create');
const fetch = require('./src/fetch');
const syncManager = require('./src/syc-manager');
const encryptUtils = require('./src/encrypt-utils');
const Utils = require('./src/utils');

if (argv.generate) {
  console.log(generator.password('normal'));
}

if (argv.fetch) {
  syncManager.askMasterPassword(function () {
    fetch.fetchPasswords();
  })
}

if (argv.create) {
  syncManager.askMasterPassword(function () {
    creator.creator();
  });
}

if (argv.createKey) {
  encryptUtils.createKey();
}

if (argv.list) {
  const titles = syncManager.listAllTitle();
  if (titles.length < 0) {
    return;
  }

  for (let i = 0; i < titles.length; i++) {
    console.log(chalk.red(i + 1) + '. ' + chalk.underline.bgBlue(titles[i]));
  }
}

if (argv.get) {
  syncManager.askMasterPassword(function () {
    const password = syncManager.getPasswordByTitle(argv.get);
    if (password) {
      Utils.pbcopy(password).then(function () {
        console.log(`200: Copied to clipboard!`);
      }).catch(function (e) {
        console.error(new Error(`500: Could Not Copy To Clipboard!`));
      })
    } else {
      console.log('404: not password');
    }
  });
}
