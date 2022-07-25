
'use strict'

const common = require('common-words')
const commonWords = common.map((element) => element.word.toLowerCase())

function getAllDecryptedBuffers (hexBuffer) {
  const hexBufferArray = []

  for (let key = 0; key <= 127; key++) {
    hexBufferArray[key] = hexBuffer.map(value => value ^ key)
  }

  return hexBufferArray
}

function toHexToAsciiMapArray (allDecryptedBuffersArray) {
  return allDecryptedBuffersArray.map((bufferElement, index) => {
    const key = index
    const decryptedAsciiString = bufferElement.toString('ascii')

    return { decryptedAsciiString, hexKeyString: Buffer.from([key]).toString('hex') }
  })
}

function includesAny (possibleSolutionString, commonWordsLookupArray) {
  let found = false

  commonWordsLookupArray.forEach((commonWordLookup) => {
    if (possibleSolutionString.includes(' ' + commonWordLookup + ' ')) {
      found = true
    }
  })

  return found
}

function filterPossibleSolutions (hexToAsciiMapArray, commonWordsLookups) {
  return hexToAsciiMapArray.filter((possibleSolution) =>
    includesAny(possibleSolution.decryptedAsciiString, commonWordsLookups)
  )
}

function getDecryptHexStrings (hexString, words) {
  const hexBuffer = Buffer.from(hexString, 'hex')

  const allDecryptedBuffersArray = getAllDecryptedBuffers(hexBuffer)

  const hexToAsciiMapArray = toHexToAsciiMapArray(allDecryptedBuffersArray)

  const filteredSolutions = filterPossibleSolutions(hexToAsciiMapArray, words)

  return filteredSolutions
}

function printSolutionsAsciiAndKey (solutionAsciiAndKey) {
  solutionAsciiAndKey.forEach((element) =>
    console.log('phrase: \'' + element.decryptedAsciiString + '\', key: ' + element.hexKeyString + '\n')
  )
}

module.exports = { getDecryptHexStrings, printSolutionsAsciiAndKey, commonWords }
