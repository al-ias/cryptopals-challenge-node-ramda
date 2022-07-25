'use strict'

const R = require('ramda')

const { countLetters, countPrintableAscii } = require('../../../utils/char-frequency')

const occorrouncesIn = (char, string) => R.count(R.equals(char), R.toUpper(string))

const percentage = (num, total) => (num * 100) / total

const getAlphabetFrequency = (referenceAlphabetFrequency) => (string) =>
  R.mapObjIndexed(
    (statisticalCharFrequency, char) => percentage(occorrouncesIn(char, string), countLetters(string)),
    referenceAlphabetFrequency
  )

const toStandardFrequencyDeviation = (referenceAlphabetFrequency) => R.mapObjIndexed((num, key) => Math.abs(num - referenceAlphabetFrequency[key]))

const toStandardFrequencyDeviation_v2 = (referenceAlphabetFrequency) => R.mapObjIndexed((num, key) => Math.abs(percentage(num - referenceAlphabetFrequency[key], referenceAlphabetFrequency[key])))

const ratioOfAcceptedChars = R.pipe(
  R.converge(
    R.divide,
    [countPrintableAscii, R.length]
  )
)

/**
 * ({ A: percentage, ..., Z: percentage}) -> (potentially decrypted string) ->  percentage likeness
 */
const statisticalCryptanalysisOn = (referenceAlphabetFrequency) => R.pipe(
  getAlphabetFrequency(referenceAlphabetFrequency),
  toStandardFrequencyDeviation(referenceAlphabetFrequency),
  R.values,
  R.reduce(R.add, 0),
  R.subtract(R.__, 100),
  Math.abs
)

const goodCharRatio = 0.999
const isAcceptableString = ({ logger }) => (referenceAlphabetFrequency) => (string) => R.pipe(
  // logger('before acceptable string'),
  /* R.converge(
    R.multiply,
    [statisticalCryptanalysisOn(referenceAlphabetFrequency), ratioOfAcceptedChars]
  ), */
  ratioOfAcceptedChars,
  R.cond([
    [R.gte(goodCharRatio),
      R.multiply(
        statisticalCryptanalysisOn(referenceAlphabetFrequency)(string)
      )],
    [R.T, () => 0]
  ])
)(string)

const arrayAverage = (arr) =>
  R.divide(R.reduce(R.add, 0, arr), R.length(arr))

/* R.useWith(
  R.divide,
  [R.reduce(R.add, 0), R.length]
) */

/**
 * ({ A: percentage, ..., Z: percentage}) -> (potentially decrypted string) ->  percentage likeness
 */
const linkessToBeDecrypted_v2 = (referenceAlphabetFrequency) => R.pipe(
  getAlphabetFrequency(referenceAlphabetFrequency),
  toStandardFrequencyDeviation_v2(referenceAlphabetFrequency), /* (good) 0-100 (bad) */
  R.values,
  arrayAverage,
  R.subtract(0) /* (bad) (-N)-0 (good) */
)

module.exports = { statisticalCryptanalysisOn: isAcceptableString/* : linkessToBeDecrypted_v2 */ }
