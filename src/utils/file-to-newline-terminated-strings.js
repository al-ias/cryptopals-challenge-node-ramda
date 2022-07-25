'use strict'

const fs = require('fs')
const R = require('ramda')

const fileToNewLineTerminatedStrings = R.pipe(
  (filePath) => fs.readFileSync(filePath, { encoding: 'ascii' }),
  R.split('\n')
)

module.exports = { fileToNewLineTerminatedStrings }
