import Mopass from 'mopass-common';

const mopassKey = Mopass.EncryptUtil.encParse(localStorage.getItem('mopass.key'));
const password = localStorage.getItem('mopass.test');
const hashString = Mopass.EncryptUtil.hashString(password);

Mopass.EncryptUtil.configIv({iv: password});
Mopass.TokenManager.setUserToken(hashString);

Mopass.Fetch.fetchPasswordsPromise().then((response) => {
  console.log(response.data.Items[3])
  let firstPassword = response.data.Items[3].password
  console.log(firstPassword, mopassKey);
  var result = Mopass.EncryptUtil.decrypt(firstPassword, mopassKey);
  console.log(result);
});

function polling() {
  setTimeout(polling, 1000 * 30);
}

polling();

