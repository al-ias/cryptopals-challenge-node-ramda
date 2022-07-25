'use strict'

const R = require('ramda')
const { onList } = require('../../../utils/binary-func-on-list')
const { fromXEncodedStringToYEncodedString } = require('../../../utils/buffer-conversion')

const { encryptHexWithKey } = require('../../../5-repeating-key-xor')
const { statisticalCryptanalysisOn } = require('./likeness-to-be-decrypted')

const hexStringToAsciiString = fromXEncodedStringToYEncodedString('hex', 'ascii')

const assocNewProp = (propName, getProp) => R.converge(
  R.assoc(propName),
  [getProp, R.identity]
)
const fromProp = (sourceProp, compute) => R.pipe(R.prop(sourceProp), compute)

const getPotentiallyDecryptedHex = R.curry((hexStringProp, hexKeyProp) => R.pipe(
  (obj) => ({
    keyString: R.prop(hexKeyProp, obj),
    hexString: R.prop(hexStringProp, obj)
  }),
  encryptHexWithKey,
  R.prop('encryptedHexString')
))

const enumeratePotentialKeyLikeness = R.curry(({ monogramFrequency, ...config }, hexString, key) => R.pipe(
  R.assoc('encryptedHexString', hexString),
  R.assoc(
    'hexKey',
    R.pipe((key) => [key], fromXEncodedStringToYEncodedString('hex', 'ascii'))(key)
  ),
  assocNewProp(
    'potentiallyDecryptedHex',
    getPotentiallyDecryptedHex('encryptedHexString', 'hexKey')
  ),
  assocNewProp(
    'potentiallyDecrypted',
    fromProp('potentiallyDecryptedHex', hexStringToAsciiString)
  ),
  // TODO moltiplicare per la percentuale di caratteri accettabili
  // perc = percCrittoanalisi * percCaratteriAccettabili
  assocNewProp(
    'likenessDecrypted',
    fromProp('potentiallyDecrypted', statisticalCryptanalysisOn(config)(monogramFrequency))
  ),
  R.pick(['hexKey', 'likenessDecrypted'])
)({}))

const enumeratePotentialKeyLikeness2 = R.curry(({ monogramFrequency, ...config }, hexString, asciCodeKey) => {
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
