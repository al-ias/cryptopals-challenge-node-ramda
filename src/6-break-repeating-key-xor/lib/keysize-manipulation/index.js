'use strict'

const R = require('ramda')

const { hammingDistanceHexBuff } = require('./hamming-distance')
const { fromXEncodedStringToYEncodedBuffer } = require('../../../utils/buffer-conversion')

const hexBufferFromBase64String = fromXEncodedStringToYEncodedBuffer('hex', 'hex')

const getNthBlock = (nth, blockSize) => R.slice((nth - 1) * (blockSize + 1), nth * (blockSize + 1))

const nomalizedKeysize = (string, keysizeBytes) => nomalizedKeysizeHex(keysizeBytes)(hexBufferFromBase64String(string))

const hammingDistanceOfTwoBlocksOf = (keysizeBytes) => R.converge(
  hammingDistanceHexBuff,
  [
    getNthBlock(1, keysizeBytes),
    getNthBlock(2, keysizeBytes)
  ]
)

const nomalizedKeysizeHex = (keysizeBytes) => R.pipe(
  hammingDistanceOfTwoBlocksOf(keysizeBytes),
  R.divide(R.__, keysizeBytes)
)

const getKeysizeAndDistance = keysize => string => ({
  keysize,
  distance: nomalizedKeysize(string, keysize)
})

const byDistance = R.ascend(R.prop('distance'))
const findNMinimumKeysizes = R.curry((n, plausibleKeysizes, encryptedString) => R.pipe(
  R.map((keysize) => getKeysizeAndDistance(keysize)(encryptedString)),
  R.sort(byDistance),
  R.take(n)
)(plausibleKeysizes))

const minimumKeysizes = ({ nMinimumKeysizes, keysizeMin, keysizeMax }) => (string) => findNMinimumKeysizes(nMinimumKeysizes, R.range(keysizeMin, keysizeMax), string)

module.exports = { nomalizedKeysize, minimumKeysizes }
