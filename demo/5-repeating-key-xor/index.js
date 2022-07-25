'use strict'

const repeatingKeyXor = require('../../src/5-repeating-key-xor')

const encryptingFn = repeatingKeyXor.getEncryptingFn('ICE')

const results = repeatingKeyXor.decryptFile({ filePath: './demo/5-repeating-key-xor/plaintext.txt', callbackFn: encryptingFn })
repeatingKeyXor.printResults(results)
