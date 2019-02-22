const uuid = require('uuid');

const upperCase = Math.random().toString(36).substring(2, 6).toUpperCase();
const lowerCase = Math.random().toString(36).substring(2, 6);
const timeStamp = ('' + new Date().getTime()).substr(11, 3);

function makeSpecialString(strLength: number) {
  let text = "";
  const possible = `!"#$%&'()*+,-./:;<=>?@[\]^_\`{|}~`;

  for (let i = 0; i < strLength; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function createKey() {
  return uuid.v4();
}

function generatePassword(params: string) {
  if (params === 'normal') {
    return timeStamp + upperCase + lowerCase + makeSpecialString(3);
  }
}

let Generator = {
  password: generatePassword,
  createKey: createKey
}

export default Generator;
