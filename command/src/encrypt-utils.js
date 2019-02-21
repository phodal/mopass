const CryptoJS = require('crypto-js');

let key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");
let iv;

function isExistKeyAndIv(key, iv) {
  if(!key || !iv) {
    console.log('not key or iv');
    return false;
  }

  return true;
}

function decrypt(word) {
  if (!isExistKeyAndIv(key, iv)) {
    return;
  }

  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

function encryptUtils(word) {
  if (!isExistKeyAndIv(key, iv)) {
    return;
  }

  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

function configKey(config) {
  // key = CryptoJS.enc.Utf8.parse(config.key);
  iv = CryptoJS.enc.Utf8.parse(config.iv);
}

module.exports.decrypt = decrypt;
module.exports.encrypt = encryptUtils;
module.exports.configKey = configKey;
