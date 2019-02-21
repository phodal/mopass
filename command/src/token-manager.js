let token;

function createToken() {

}

function getUserToken() {
  return token;
}

function getAuthToken() {
  return "allow"
}

function setAuthToken() {

}

function setUserToken(t) {
  token = t;
}

module.exports.getUserToken = getUserToken;
module.exports.setUserToken = setUserToken;
module.exports.getAuthToken = getAuthToken;
module.exports.createToken = createToken;
