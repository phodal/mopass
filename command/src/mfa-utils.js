const otplib = require('otplib');

function getMFAPassword(secret) {
  return otplib.authenticator.generate(secret)
}

module.exports.getMFAPassword = getMFAPassword
