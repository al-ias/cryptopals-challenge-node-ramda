'use strict'

const fs = require('fs')
const { fromXEncodedStringToYEncodedBuffer } = require('../utils/buffer-conversion')

const encryptWithKey = ({ plaintextString, keyString }) => ({
  plaintextString,
  ...encryptHexBuffer({
    plaintextHexBuffer: fromXEncodedStringToYEncodedBuffer('ascii', 'hex')(plaintextString),
    keyString
  })
})

const encryptHexWithKey = ({ hexString, keyString }) => ({
  hexString,
  ...encryptHexBuffer({
    plaintextHexBuffer: fromXEncodedStringToYEncodedBuffer('hex', 'hex')(hexString),
    keyString
  })
})

function encryptHexBuffer ({ plaintextHexBuffer, keyString }) {
  const keyHexBuffer = fromXEncodedStringToYEncodedBuffer('ascii', 'hex')(keyString)

  const encryptedHexArray = repeatingKeyXor({ plaintextHexBuffer, keyHexBuffer })

  const encryptedHexString = hexArrayToString(encryptedHexArray)

  return { keyString, plaintextHexBuffer, keyHexBuffer, encryptedHexString }
}

function repeatingKeyXor ({ plaintextHexBuffer, keyHexBuffer }) {
  return plaintextHexBuffer.map((plaintextHexChar, index) => {
    const hexKeyChar = keyHexBuffer[index % keyHexBuffer.length]
    return plaintextHexChar ^ hexKeyChar
  })
}

function hexArrayToString (hexArray) {
  const encryptedHexString = Buffer.from(hexArray, 'hex').toString('hex')

  return encryptedHexString
}

function getEncryptingFn (keyString) {
  return (plaintextString) => encryptWithKey({ plaintextString, keyString })
}

function decryptFile ({ filePath, callbackFn }) {
  let results = {}
  try {
    const data = fs.readFileSync(filePath)

    const dataString = data.toString()

    results = callbackFn(dataString)
  } catch (e) {
    console.log(e)
  }

  return results
}

function printResults ({ plaintextString, keyString, plaintextHexBuffer, keyHexBuffer, encryptedHexString }) {
  console.log(`
  plaintextString ${plaintextString}
  keyString ${keyString}
  keyHexBuffer ${keyHexBuffer}
  encryptedHexString ${encryptedHexString}
  `)
}

module.exports = { decryptFile, getEncryptingFn, encryptHexWithKey, printResults }
