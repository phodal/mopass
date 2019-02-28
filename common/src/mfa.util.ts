const otplib = require('otplib');

function getMFAPassword(secret: string) {
  return otplib.authenticator.generate(secret)
}

let MFAUtil = {
  getMFAPassword
}

export default MFAUtil
