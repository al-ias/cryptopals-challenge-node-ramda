'use strict'

const R = require('ramda')

/* const { fromXEncodedStringToYEncodedBuffer, fromXEncodedStringToYEncodedString } = require('../../utils/hex-buffer-from-base64-string') */

const getByteList = R.pipe(
  /* fromXEncodedStringToYEncodedBuffer('hex', 'hex'), */
  R.splitEvery(2)
)

const concatOmogeneusEncryptedBytes = (keysize) => (omogeneusEncodedStrings, byte, byteIndex, sourceBuffer) => {
  const oes = omogeneusEncodedStrings

  const omogeneusEncodedStringIndex = byteIndex % keysize
  oes[omogeneusEncodedStringIndex] = R.concat(
    oes[omogeneusEncodedStringIndex] ?? '',
    byte
  )

  /* R.append(
    byte,
    oes[omogeneusEncodedStringIndex] ?? []
  ) */

  return oes
}

const reduceIndexed = R.addIndex(R.reduce)
const groupByOmogeneusEncryption = keysize => reduceIndexed(concatOmogeneusEncryptedBytes(keysize), [])

const getOmogeneusEncryptedBuffers = (keysize, hexString) =>
  R.pipe(
    getByteList,
    // logger('before group '),
    groupByOmogeneusEncryption(keysize)
    // logger('till omogeneus encryption')
    /* R.map(R.pipe(
      R.map((el) => Array.from(el)),
      fromXEncodedStringToYEncodedString('hex', 'hex')
    )) */
  )(hexString)

module.exports = { getOmogeneusEncryptedBuffers }
