#!/usr/bin/env node


const creator = require('./src/create');
const fetch = require('./src/fetch');
const dbm = require('./src/dbm');
const Utils = require('./src/utils');
const argv = require('yargs')
  .usage('Usage: $0 [commmand]')
  .argv;
const generator = require('./src/generator');

if (argv.generate) {
  console.log(generator.password('normal'));
}

if (argv.fetch) {
  fetch.passwords(argv.fetch);
}

if (argv.create) {
  creator.creator();
}

if (argv.get) {
  const results = dbm.get(argv.get);
  if (results) {
    Utils.pbcopy(results.password).then(function () {
      console.log(`200: Copied to clipboard!`);
    }).catch(function (e) {
      console.error(new Error(`500: Could Not Copy To Clipboard!`));
    })
  } else {
    console.log('404: not password');
  }
}
