#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: $0 [commmand]')
  .argv;
const generator = require('./src/generator');

if (argv.generate) {
  console.log(generator.password('normal'));
}
