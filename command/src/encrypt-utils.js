const CryptoJS = require('crypto-js');  //引用AES源码js

let key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  // 十六位十六进制数作为密钥
let iv = CryptoJS.enc.Utf8.parse('ABC-DFA');   // 十六位十六进制数作为密钥偏移量

function decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

function encryptUtils(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

function configKey(config) {
  key = config.key;
  iv = config.iv;
}

module.exports.decrypt = decrypt;
module.exports.encrypt = encryptUtils;
module.exports.configKey = configKey;
