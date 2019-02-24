const CryptoJS = require('crypto-js');

let iv: any;

function isExistKeyAndIv(key: string, iv: string) {
  if (!key || !iv) {
    console.log('not key or iv');
    return false;
  }

  return true;
}

function decrypt(word: string, key: any) {
  if (!isExistKeyAndIv(key, iv)) {
    return;
  }

  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

function encrypt(word: any, key: any) {
  if (!isExistKeyAndIv(key, iv)) {
    return;
  }

  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
  return encrypted.ciphertext.toString().toUpperCase();
}

function configIv(config: any) {
  iv = CryptoJS.enc.Utf8.parse(config.iv);
}

function hashString(str: string) {
  return CryptoJS.MD5(str).toString();
}

export default {
  decrypt,
  encrypt,
  configIv,
  hashString
}
