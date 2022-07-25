'use strict'

const R = require('ramda')

const bufferFromFunctional = R.flip(R.curryN(2, Buffer.from))
const bufferToStringFunctional = R.curry((encoding, buffer) => buffer.toString(encoding))

const fromXEncodedList = (inputFormat) => (string) => bufferFromFunctional(inputFormat)(string)
const toYEncodedBuffer = R.curry(
  (encoding, buffer) => bufferFromFunctional(encoding, bufferToStringFunctional(encoding)(buffer))
)

const fromXEncodedStringToYEncodedBuffer = (inputEncoding, outputEncoding) => R.pipe(fromXEncodedList(inputEncoding), toYEncodedBuffer(outputEncoding))

const fromXEncodedStringToYEncodedString = (inputEncoding, outputEncoding) => R.pipe(
  fromXEncodedStringToYEncodedBuffer(inputEncoding, outputEncoding),
  bufferToStringFunctional(outputEncoding)
)

module.exports = { fromXEncodedStringToYEncodedBuffer, fromXEncodedStringToYEncodedString, bufferToStringFunctional, bufferFromFunctional }
