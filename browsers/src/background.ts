import Mopass from 'mopass-common'

let mopassKey

function fetchPasswordsInBackground(password, callback) {
  const hashString = Mopass.EncryptUtil.hashString(password)

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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request && request.type === 'page') {
    fetchPasswordsInBackground(request.info, function(data) {
      sendResponse(data)
    })
  } else if (request && request.type === 'decrypt') {
    const result = Mopass.EncryptUtil.decrypt(request.info, mopassKey)
    sendResponse({
      status: 200,
      body: result
    })
  }

  return true;
})
