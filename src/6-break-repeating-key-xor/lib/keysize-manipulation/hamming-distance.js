'use strict'

const R = require('ramda')
const { fromXEncodedStringToYEncodedBuffer } = require('../../../utils/buffer-conversion')

const asciiStringToHexBuffer = fromXEncodedStringToYEncodedBuffer('ascii', 'hex')

function hammingDistanceHexBuff (shortestHexBuff, longestHexBuff) {
  if (R.isNil(shortestHexBuff)) { throw new Error('shortest hex buffer is Nil') }
  if (R.isNil(longestHexBuff)) { throw new Error('longest hex buffer is Nil') }
  if (R.isEmpty(longestHexBuff) && !R.isEmpty(longestHexBuff)) { throw new Error('longest hex buffer is empty') }

  let distance = R.anyPass([R.isNil, R.isEmpty])(shortestHexBuff)
    ? 0
    : Array.from(shortestHexBuff).reduce((previousDistance, hexCharShortestBuff, currentIndex) => {
      const hexCharLongestBuff = longestHexBuff[currentIndex]

      const distance = countDifferingBits(hexCharShortestBuff, hexCharLongestBuff)

      return previousDistance + distance
    }, 0)

  distance += countDifferentLengthBits(shortestHexBuff, longestHexBuff)

  return Math.abs(distance)
}

function countDifferingBits (hexChar1, hexChar2) {
  const xor = hexChar1 ^ hexChar2

  let distance = 0

  for (let dividend = xor, integerPart; dividend > 0; dividend = integerPart) {
    const rest = dividend % 2
    integerPart = (dividend - rest) / 2

    if (rest !== 0) distance++
  }

  return distance
}

function countDifferentLengthBits (shortestHexBuff, longestHexBuff) {
  return (longestHexBuff.toString('hex').length - (shortestHexBuff?.toString('hex')?.length ?? 0)) * 4
}

function hammingDistance (string1, string2) {
  const hexBuff1 = asciiStringToHexBuffer(string1)
  const hexBuff2 = asciiStringToHexBuffer(string2)

  const shortestHexBuff = hexBuff1.length <= hexBuff2.length
    ? hexBuff1
    : hexBuff2
  const longestHexBuff = hexBuff1.length > hexBuff2.length
    ? hexBuff1
    : hexBuff2

  const distance = hammingDistanceHexBuff(shortestHexBuff, longestHexBuff)

  return distance
}

module.exports = { hammingDistance, countDifferingBits, hammingDistanceHexBuff: R.curry(hammingDistanceHexBuff) }
