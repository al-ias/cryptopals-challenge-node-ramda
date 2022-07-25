'use strict'

const logger = require('../../src/utils/logger').getLogger({ printLogs: true })

const { breakRepeatingKeyXorFromFilePath } = require('../../src/6-break-repeating-key-xor')
const { charItervalToAsciiIndexes, stringToAsciiIndexes } = require('../../src/utils/ascii-indexes')

const englishMonogramFrequency = require('../../src/utils/english-monogram-frequency-wikipedia.json')

const asciiCodesKeyAlphabet = [
  /* ...charItervalToAsciiIndexes('A', 'Z'),
  ...charItervalToAsciiIndexes('a', 'z'),
  ...charItervalToAsciiIndexes('0', '9'),
  ...stringToAsciiIndexes(' \',.;-"\n()') */

  ...charItervalToAsciiIndexes(' ', '~')
]

const encryptedFilePath = 'demo/6-break-repeating-key-xor/encryptedBas64.txt'
const config = {
  fileEncoding: 'ascii',
  logger,

  thunkSize: Infinity,

  nMinimumKeysizes: 13,
  keysizeMin: 12,
  keysizeMax: 13,

  asciiCodesKeyAlphabet,
  monogramFrequency: englishMonogramFrequency
}

breakRepeatingKeyXorFromFilePath(config)(encryptedFilePath)
