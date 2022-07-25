'use strict'

const R = require('ramda')
const { getDecryptHexStrings, printSolutionsAsciiAndKey, commonWords } = require('../../src/3-decrypt-hex-string/index')
const encryptedString = R.first(process.argv)

const decrypedStrings = getDecryptHexStrings(encryptedString, commonWords)
printSolutionsAsciiAndKey(decrypedStrings)
