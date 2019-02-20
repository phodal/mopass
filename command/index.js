#!/usr/bin/env node


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

if (argv.get) {
  const results = dbm.get(argv.get);
  console.log(results.password);
}
