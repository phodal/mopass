import Mopass from 'mopass-common';

const mopassKey = localStorage.getItem('mopass.key')
const password = localStorage.getItem('mopass.test')
const hashString = Mopass.EncryptUtil.hashString(password);

Mopass.EncryptUtil.configIv({iv: hashString});
Mopass.TokenManager.setUserToken(hashString);

Mopass.Fetch.fetchPasswordsPromise().then((response) => {
  let firstPassword = response.data.Items[0].password
  console.log(firstPassword, mopassKey);
  var result = Mopass.EncryptUtil.decrypt(firstPassword, mopassKey);
  console.log(result);
});

function polling() {
  setTimeout(polling, 1000 * 30);
}

polling();

