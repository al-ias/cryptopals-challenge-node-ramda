'use strict'

const fs = require('fs')
const R = require('ramda')

const fileToString = ({ fileEncoding }) => R.pipe(
  (filePath) => fs.readFileSync(filePath, { encoding: fileEncoding }),
  R.replace(/\n/g, '')
)

module.exports = { fileToString }
