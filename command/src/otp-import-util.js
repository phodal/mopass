const fs = require('fs')

function readConfigByFile(path) {
  try {
    var otps = fs.readFileSync(process.cwd() + '/' + path).toString()
    if (!otps) {
      console.log('not data')
      return false
    }

    try {
      let pwdInfos = []
      otps = JSON.parse(otps)
      for (let i = 0; i < otps.length; i++) {
        const otp = otps[i]
        if (otp.type === 'TOTP') {
          pwdInfos.push({
            type: 'mfa',
            title: otp.label,
            password: otp.secret
          })
        }
      }

      return pwdInfos
    } catch (e) {
      console.log('parse otp error:' + e)
      return false;
    }
  } catch (e) {
    console.log('readConfigError' + e)
    return false;
  }
}

module.exports.readConfigByFile = readConfigByFile
