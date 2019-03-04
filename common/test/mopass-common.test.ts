const CryptoJS = require('crypto-js')
import EncryptUtil from '../src/encrypt.util'
import TokenManager from '../src/token-manager'

describe('Encrypt test', () => {
  let encryptKey: any
  beforeEach(function() {
    EncryptUtil.configIv('master word')
    encryptKey = CryptoJS.enc.Utf8.parse('80fe4087-b8da-432a-b003-028667625b7b')
  })

  it('should encrypt and decrypt to same words', () => {
    let word = 'phodal'
    let encryptWord = EncryptUtil.encrypt(word, encryptKey)
    let decryptWord = EncryptUtil.decrypt(encryptWord, encryptKey)

    expect(decryptWord).toEqual(word)
  })

  it('should enable hash string', () => {
    let hashString = EncryptUtil.hashString('phodal')
    expect(hashString).toEqual('a1eb5e02c050ae0e0bcfe8354df35fc0')
  })
})

describe('Token Manager', () => {
  it('should get/set token', () => {
    let token = EncryptUtil.hashString('phodal')
    TokenManager.setUserToken(token)
    expect(TokenManager.getUserToken()).toEqual(token)
  })
})
