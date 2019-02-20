#!/usr/bin/env node


const creator = require('./src/create');
const fetch = require('./src/fetch');
const dbm = require('./src/dbm');
const argv = require('yargs')
  .usage('Usage: $0 [commmand]')
  .argv;
const generator = require('./src/generator');

if (argv.generate) {
  console.log(generator.password('normal'));
}

if (argv.fetch) {
  fetch.passwords();
}

if (argv.create) {
  creator.creator();
}

if (argv.get) {
  const results = dbm.get(argv.get);
  if (results) {
    console.log(results.password);
  } else {
    console.log({});
  }
}
