'use strict'

const xorBuffers = (base64Buff1, base64Buff2) =>
  base64Buff1.map((hexChar1, index) => {
    const hexChar2 = base64Buff2[index]

    return hexChar1 ^ hexChar2
  })

function hexToBase64 (hexString, hexString2) {
  const base64Buff1 = Buffer.from(hexString, 'hex')
  const base64Buff2 = Buffer.from(hexString2, 'hex')

  const xorBuff = xorBuffers(base64Buff1, base64Buff2)

  return Buffer.from(xorBuff).toString('hex')
}

module.exports = { hexToBase64 }
