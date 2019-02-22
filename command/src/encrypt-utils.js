const CryptoJS = require('crypto-js');
const fs = require("fs");

const generator = require('./generator');

let iv;

function isExistKeyAndIv(key, iv) {
  if (!key || !iv) {
    console.log('not key or iv');
    return false;
  }

  return true;
}

function decrypt(word) {
  if (!isExistKeyAndIv(readKey(), iv)) {
    return;
  }

  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, readKey(), {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

function encrypt(word) {
  if (!isExistKeyAndIv(readKey(), iv)) {
    return;
  }

  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, readKey(), {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
  return encrypted.ciphertext.toString().toUpperCase();
}

function configIv(config) {
  iv = CryptoJS.enc.Utf8.parse(config.iv);
}

function readKey() {
  try {
    return fs.readFileSync(__dirname + '/.mopass.key');
  } catch {
    console.log('not key');
  }
}

function createKey() {
  return fs.writeFileSync(__dirname + '/.mopass.key', generator.createKey());
}

function configKey(key) {
  return fs.writeFileSync(__dirname + '/.mopass.key', key);
}

module.exports.decrypt = decrypt;
module.exports.encrypt = encrypt;
module.exports.configIv = configIv;
module.exports.createKey = createKey;
module.exports.configKey = configKey;
