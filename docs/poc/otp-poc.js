const otplib = require('otplib');

const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD'
// Alternatively: const secret = otplib.authenticator.generateSecret();

const token = otplib.authenticator.generate(secret);

console.log(token);
