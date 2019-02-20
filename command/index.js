#!/usr/bin/env node

const dbm = require('./src/dbm');
const argv = require('yargs')
  .usage('Usage: $0 [commmand]')
  .argv;
const generator = require('./src/generator');

if (argv.generate) {
  console.log(generator.password('normal'));
}

if (argv.sync) {
  console.log(generator.password('normal'));
}

if (argv.get) {
  const results = dbm.get(argv.get);
  console.log(results.password);
}
