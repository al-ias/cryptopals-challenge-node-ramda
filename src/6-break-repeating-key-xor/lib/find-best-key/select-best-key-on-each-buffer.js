'use strict'

const R = require('ramda')
const { onList } = require('../../../utils/binary-func-on-list')
const { fromXEncodedStringToYEncodedString } = require('../../../utils/buffer-conversion')

const { encryptHexWithKey } = require('../../../5-repeating-key-xor')
const { statisticalCryptanalysisOn } = require('./likeness-to-be-decrypted')

const enumeratePotentialKeyLikeness = R.curry(({ monogramFrequency, ...config }, hexString, asciCodeKey) => {
  const hexKey = fromXEncodedStringToYEncodedString('hex', 'ascii')([asciCodeKey])
  const potentiallyDecryptedHex = encryptHexWithKey({ keyString: hexKey, hexString }).encryptedHexString
  const potentiallyDecryptedAscii = fromXEncodedStringToYEncodedString('hex', 'ascii')(potentiallyDecryptedHex)
  const likenessDecrypted = statisticalCryptanalysisOn(config)(monogramFrequency)(potentiallyDecryptedAscii)

  return { hexKey, likenessDecrypted }
})

const selectBestKey = ({ asciiCodesKeyAlphabet, logger, ...config }) => (encryptedHexString) => R.pipe(
  () => asciiCodesKeyAlphabet,
  R.map(enumeratePotentialKeyLikeness({ logger, ...config }, encryptedHexString)),
  // logger('potential key likeness'),
  onList(R.maxBy(R.prop('likenessDecrypted')))
)(encryptedHexString)
const selectBestKeyOnEachBuffer = (config) => R.map(selectBestKey(config))

module.exports = { selectBestKeyOnEachBuffer }
