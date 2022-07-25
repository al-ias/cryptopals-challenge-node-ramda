'use strict'

const tap = require('tap')

const { fileToString } = require('../../../src/utils/file-to-string')
const logger = require('../../../src/utils/logger').getLogger({})
const { charItervalToAsciiIndexes } = require('../../../src/utils/ascii-indexes')
const { fromXEncodedStringToYEncodedString } = require('../../../src/utils/buffer-conversion')
const englishMonogramFrequency = require('../../../src/utils/english-monogram-frequency.json')

const { getEncryptingFn } = require('../../../src/5-repeating-key-xor')
const { findBestKey, getBestKeysizeFromString } = require('../../../src/6-break-repeating-key-xor/lib/find-best-key')

const plaintext = fileToString({ fileEncoding: 'utf8' })('tests/6-breaking-repeating-key-xor/someday-plaintext.test.txt')

const asciiCodesKeyAlphabet = [
  ...charItervalToAsciiIndexes('A', 'Z'),
  ...charItervalToAsciiIndexes('a', 'z')
]

const defaultConfig = {
  logger,

  thunkSize: 13,

  nMinimumKeysizes: 40,
  keysizeMin: 2,
  keysizeMax: 40,

  asciiCodesKeyAlphabet,
  monogramFrequency: englishMonogramFrequency
}

tap.test('Find best key test', async (t) => {
  /* t.test('Should find the correct keysize if is lowercase', async assert => {
    const key = 'Strokes'
    const encrypt = getEncryptingFn(key)
    const cyphertextHex = encrypt(plaintext).encryptedHexString
    const cyphertextBase64 = fromXEncodedStringToYEncodedString('hex', 'base64')(cyphertextHex)

    const bestKeysize = getBestKeysizeFromString({ ...defaultConfig, thunkSize: 13 })(cyphertextBase64)

    assert.equal(bestKeysize, key.length)
  })

  t.test('Should find the correct key if is lowercase', async assert => {
    const key = 'Strokes'
    const encrypt = getEncryptingFn(key)
    const cyphertextHex = encrypt(plaintext).encryptedHexString
    const cyphertextBase64 = fromXEncodedStringToYEncodedString('hex', 'base64')(cyphertextHex)

    const bestKey = findBestKey({ ...defaultConfig, thunkSize: 13 })(cyphertextBase64)

    assert.equal(bestKey, key)
  }) */

  t.test('Should find the correct keysize if is uppercase, with thunk size 13 and just letters key alphabet', async assert => {
    const key = 'STROKES'
    const encrypt = getEncryptingFn(key)
    const cyphertextHex = encrypt(plaintext).encryptedHexString
    const cyphertextBase64 = fromXEncodedStringToYEncodedString('hex', 'base64')(cyphertextHex)

    const bestKeysize = getBestKeysizeFromString({ ...defaultConfig, thunkSize: 13 })(cyphertextBase64)

    assert.equal(bestKeysize, key.length)
  })

  t.test('Should find the correct key if is uppercase, with thunk size 13 and just letters key alphabet', async assert => {
    const key = 'STROKES'
    const encrypt = getEncryptingFn(key)
    const cyphertextHex = encrypt(plaintext).encryptedHexString
    const cyphertextBase64 = fromXEncodedStringToYEncodedString('hex', 'base64')(cyphertextHex)

    const bestKey = findBestKey({ ...defaultConfig, thunkSize: 13 })(cyphertextBase64)

    assert.equal(bestKey, key)
  })

  t.test('Should find the correct keysize if is uppercase, with thunk size = keysize and just letters key alphabet', async assert => {
    const key = 'STROKES'
    const encrypt = getEncryptingFn(key)
    const cyphertextHex = encrypt(plaintext).encryptedHexString
    const cyphertextBase64 = fromXEncodedStringToYEncodedString('hex', 'base64')(cyphertextHex)

    const bestKeysize = getBestKeysizeFromString({ ...defaultConfig, thunkSize: 7 })(cyphertextBase64)

    assert.equal(bestKeysize, key.length)
  })

  /* t.test('Should find the correct key if is uppercase, with thunk size = keysize and just letters key alphabet', async assert => {
    const key = 'STROKES'
    const encrypt = getEncryptingFn(key)
    const cyphertextHex = encrypt(plaintext).encryptedHexString
    const cyphertextBase64 = fromXEncodedStringToYEncodedString('hex', 'base64')(cyphertextHex)

    const bestKey = findBestKey(7)(cyphertextBase64)

    assert.equal(bestKey, key)
  }) */

  t.test('Should find the correct keysize if is uppercase, with thunk size 40 and just letters key alphabet', async assert => {
    const key = 'STROKES'
    const encrypt = getEncryptingFn(key)
    const cyphertextHex = encrypt(plaintext).encryptedHexString
    const cyphertextBase64 = fromXEncodedStringToYEncodedString('hex', 'base64')(cyphertextHex)

    const bestKeysize = getBestKeysizeFromString({ ...defaultConfig, thunkSize: 40 })(cyphertextBase64)

    assert.equal(bestKeysize, key.length)
  })

  /* t.test('Should find the correct key if is uppercase, with thunk size 40 and just letters key alphabet', async assert => {
    const key = 'STROKES'
    const encrypt = getEncryptingFn(key)
    const cyphertextHex = encrypt(plaintext).encryptedHexString
    const cyphertextBase64 = fromXEncodedStringToYEncodedString('hex', 'base64')(cyphertextBase64)

    const bestKey = findBestKey({ ...defaultConfig, thunkSize: 40 })(cyphertext)

    assert.equal(bestKey, key)
  }) */
})
