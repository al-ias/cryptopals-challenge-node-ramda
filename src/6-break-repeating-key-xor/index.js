'use strict'

const R = require('ramda')

const { fromXEncodedStringToYEncodedString } = require('../utils/buffer-conversion')

const { decryptCyphertext } = require('./lib/decrypt-cyphertext')
const { findBestKey } = require('./lib/find-best-key')
const { fileToString } = require('../utils/file-to-string')

const base64StringToHexString = fromXEncodedStringToYEncodedString('base64', 'hex')

const breakRepeatingKeyXor = ({ logger, ...config }) => R.pipe(
  base64StringToHexString,
  logger('Hex text:'),
  R.converge(
    decryptCyphertext(logger),
    [findBestKey({ logger, ...config }), R.identity]
  ),
  logger('Decrypted text:')
)

const breakRepeatingKeyXorFromFilePath = (config) => R.pipe(
  fileToString(config),
  /* fromXEncodedStringToYEncodedString('utf8', 'base64'), */
  breakRepeatingKeyXor(config)
)

module.exports = { breakRepeatingKeyXor, breakRepeatingKeyXorFromFilePath }
