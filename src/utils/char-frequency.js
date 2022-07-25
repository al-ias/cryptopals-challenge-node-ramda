'use strict'

const R = require('ramda')

const isUppercaseLetter = R.both(R.gte(R.__, 'A'), R.lte(R.__, 'Z'))
const isLetter = R.pipe(
  R.toUpper,
  isUppercaseLetter
)
const countLetters = R.memoizeWith(String, R.count(isLetter))

const isPrintableAscii = R.both(R.gte(R.__, ' '), R.lte(R.__, '~'))
const countPrintableAscii = R.memoizeWith(String, R.count(isPrintableAscii))

module.exports = { countLetters, countPrintableAscii }
