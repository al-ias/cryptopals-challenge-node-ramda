'use strict'

const R = require('ramda')

const { encryptHexWithKey } = require('../../../5-repeating-key-xor')
const { fromXEncodedStringToYEncodedString } = require('../../../utils/buffer-conversion')

const decryptCyphertextToHex = (key, cyphertext) => encryptHexWithKey({
  hexString: cyphertext,
  keyString: key
})

const decryptCyphertext = (logger) => R.pipe(
  decryptCyphertextToHex,
  R.prop('encryptedHexString'),
  logger('decrypted hex'),
  fromXEncodedStringToYEncodedString('hex', 'ascii')
)

module.exports = { decryptCyphertext }
