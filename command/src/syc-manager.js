const dbm = require('./dbm');
const fetch = require('./fetch');
const encryptUtils = require('./encrypt-utils');

function getPasswordByTitle(title) {
  const result = dbm.get(title);
  if (result) {
    return encryptUtils.decrypt(result.password);
  } else {
    fetch.fetchPasswordsPromise().then((data) => {
      dbm.write(data);
      const results = data.Items.filter(item => {
        return item.title === title;
      });

      if (results) {
        return encryptUtils.decrypt(results[0].password);
      } else {
        return '';
      }
    })
  }
}

module.exports.getPasswordByTitle = getPasswordByTitle;
