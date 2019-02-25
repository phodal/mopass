import Mopass from 'mopass-common'

function fetchPasswordsInBackground(password, callback) {
  let mopassKey
  const hashString = Mopass.EncryptUtil.hashString(password)
  console.log(callback)

  chrome.storage.sync.get(['mopassKey'], function(items: { mopassKey }) {
    if (!items.mopassKey) {
      callback({ status: 400, body: 'no key, please go to options' })
    }
    mopassKey = Mopass.EncryptUtil.encParse(items.mopassKey)

    Mopass.EncryptUtil.configIv({ iv: password })
    Mopass.TokenManager.setUserToken(hashString)

    Mopass.Fetch.fetchPasswordsPromise().then((response) => {
      savePasswords(response.data.Items)
      callback({ status: 200 })
    })
  })
}

function savePasswords(passwords: any) {
  chrome.storage.sync.set({
    passwords: passwords
  })
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message && message.type === 'page') {
    fetchPasswordsInBackground(message.info, sendResponse)
  }
})

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

