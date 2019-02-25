import Mopass from 'mopass-common'

let mopassKey
const password = localStorage.getItem('mopass.test')
const hashString = Mopass.EncryptUtil.hashString(password)

chrome.storage.sync.get({
  mopassKey: ''
}, function(items: { mopassKey }) {
  mopassKey = Mopass.EncryptUtil.encParse(items.mopassKey)
})

Mopass.EncryptUtil.configIv({ iv: password })
Mopass.TokenManager.setUserToken(hashString)

Mopass.Fetch.fetchPasswordsPromise().then((response) => {
  savePasswords(response.data.Items)
  getPasswordByTitle('ji', function(passwordItem) {
    const password = Mopass.EncryptUtil.decrypt(passwordItem.password, mopassKey)
    console.log(password)
  })
})

function savePasswords(passwords: any) {
  chrome.storage.sync.set({
    passwords: passwords
  })
}

function getPasswordByTitle(title: any, callback) {
  return chrome.storage.sync.get(['passwords'], function(items) {
    const results = items.passwords.filter(item => {
      if (item.title + '' === title + '') {
        return item
      }
    })

    callback(results[0])
  })
}

