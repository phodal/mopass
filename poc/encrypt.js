var CryptoJS = require("crypto-js");
console.log(CryptoJS.HmacSHA1("Message", "Key"));
console.log(CryptoJS.SHA256("Message"));
console.log(CryptoJS.MD5("Message"));
console.log(CryptoJS.HmacMD5("Message", "Key"));