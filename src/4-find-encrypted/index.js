'use strict'

const { getDecryptHexStrings, printSolutionsAsciiAndKey, commonWords } = require('../3-decrypt-hex-string')
const fs = require('fs')

function getSolution (hexString) {
  const decryptedStrings = getDecryptHexStrings(hexString, commonWords)
  let solution

  if (decryptedStrings.length > 0) {
    solution = { orginal: hexString, match: decryptedStrings }
  }

  return solution
}

function printSolution (solution) {
  if (solution && solution.match) {
    console.log('Match found! Encripted string: ' + solution.orginal + '\n')
    printSolutionsAsciiAndKey(solution.match)
  }
}

function findSolutionMultipleStrings (filePath) {
  fs.readFile(filePath, { encoding: 'ascii' }, (err, data) => {
    if (err) { throw err }

    const strings = data.split('\n')
    for (const string of strings) {
      const solution = getSolution(string.replace('\n', ''))
      printSolution(solution)
    }

    console.log('end')
  })
}

module.exports = { findSolutionMultipleStrings }
