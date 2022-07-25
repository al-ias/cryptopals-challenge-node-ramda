'use strict'

const tap = require('tap')

const { fileToString } = require('../../src/utils/file-to-string')
const logger = require('../../src/utils/logger').getLogger({})
const { charItervalToAsciiIndexes } = require('../../src/utils/ascii-indexes')
const { fromXEncodedStringToYEncodedString } = require('../../src/utils/buffer-conversion')
const englishMonogramFrequency = require('../../src/utils/english-monogram-frequency.json')

const { breakRepeatingKeyXor } = require('../../src/6-break-repeating-key-xor')
const { getEncryptingFn } = require('../../src/5-repeating-key-xor')

const asciiCodesKeyAlphabet = [
  ...charItervalToAsciiIndexes('A', 'Z'),
  ...charItervalToAsciiIndexes('a', 'z')
  // ...stringToAsciiIndexes('\'')
]

const plaintext = fileToString({ fileEncoding: 'utf8' })('tests/6-breaking-repeating-key-xor/someday-plaintext.test.txt')

tap.test('Vernam cypher test', async (t) => {
  t.test('Should work', async assert => {
    const encrypt = getEncryptingFn('Strokes')
    const cyphertextHex = encrypt(plaintext).encryptedHexString
    const cyphertextBase64 = fromXEncodedStringToYEncodedString('hex', 'base64')(cyphertextHex)

    const config = {
      logger,

      thunkSize: 13,

      nMinimumKeysizes: 40,
      keysizeMin: 2,
      keysizeMax: 40,

      asciiCodesKeyAlphabet,
      monogramFrequency: englishMonogramFrequency
    }
    const decipheredText = breakRepeatingKeyXor(config)(cyphertextBase64)

    assert.same(decipheredText, plaintext)
  })
})
