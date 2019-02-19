// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
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

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

console.log(timeStamp + upperCase + lowerCase + makeSpecialString(3));
console.log(uuidv4());
