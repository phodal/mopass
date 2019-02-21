const uuid = require('uuid');

var upperCase = Math.random().toString(36).substring(2, 6).toUpperCase();
var lowerCase = Math.random().toString(36).substring(2, 6);
var timeStamp = ('' + new Date().getTime()).substr(11, 3);

function makeSpecialString(strLength) {
  var text = "";
  var possible = `!"#$%&'()*+,-./:;<=>?@[\]^_\`{|}~`;

  for (var i = 0; i < strLength; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function createKey() {
  return uuid.v4();
}

function generatePassword(params) {
  if (params === 'normal') {
    return timeStamp + upperCase + lowerCase + makeSpecialString(3);
  }
}

module.exports = {
  password: generatePassword,
  createKey: createKey
};
