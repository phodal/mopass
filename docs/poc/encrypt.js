const CryptoJS = require('crypto-js');  //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABC-DFA');   // 十六位十六进制数作为密钥偏移量

function decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

function encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

console.log(encrypt(`abcDEF12345!@#$%!"#$%&'()*+,-./:;<=>?@[]^_\`{|}~`));
console.log(decrypt('CBE4BEFD00FE16653E51FE61AACA2BBE'));
console.log(decrypt('82652AC0170BF80FF9414A3D8051D9F13C3A2A65DF1A8C06412FCA85EC96662FF51AC0E5D0421089739684811A9599F4'));
