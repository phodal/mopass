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

      return pwdInfos
    } catch (e) {
      console.log('parse otp error:' + e)
    }
  } catch (e) {
    console.log('readConfigError' + e)
  }
}

function buildBatchItems(items) {
  let results = []
  const timestamp = new Date().getTime()
  console.log('.....')
  console.log(items)

  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    results.push({
      'PutRequest': {
        'Item': {
          'password': {
            'S': item.password
          },
          'token': {
            'S': item.token
          },
          'title': {
            'S': item.title
          },
          'id': {
            'S': '3244'
          },
          'createdAt': {
            'S': timestamp
          },
          'updatedAt': {
            'S': timestamp
          }

        }
      }
    })
  }

  return results
}

let data = readConfigByFile('andotp.json')
var result = buildBatchItems(data)
console.log(result)


