const fs = require('fs')

function readConfigByFile(path) {

  try {
    var otps = fs.readFileSync(__dirname + '/' + path).toString()
    if (!otps) {
      console.log('not data')
      return
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
      console.log(pwdInfos)
    } catch (e) {
      console.log('parse otp error:' + e)
    }
  } catch (e) {
    console.log('readConfigError' + e)
  }
}

readConfigByFile('andotp.json')
