'use strict'

const R = require('ramda')

const charToAsciiIndex = (char) => char.charCodeAt(0)
const stringToAsciiIndexes = R.map(charToAsciiIndex)
const charItervalToAsciiIndexes = R.useWith(R.range, [charToAsciiIndex, charToAsciiIndex])

module.exports = { stringToAsciiIndexes, charItervalToAsciiIndexes }
