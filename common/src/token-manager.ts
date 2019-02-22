let token: string;

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

function setUserToken(t: string) {
  token = t;
}

let TokenManager = {
  getUserToken: getUserToken,
  setUserToken: setUserToken,
  getAuthToken: getAuthToken,
  setAuthToken: setAuthToken,
  createToken: createToken
}

export default TokenManager
