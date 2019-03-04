const CryptoJS = require('crypto-js')
import EncryptUtil from '../src/encrypt.util'

describe('Dummy test', () => {
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
})
