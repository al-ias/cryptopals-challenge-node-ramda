'use strict'

const tap = require('tap')
const { countPrintableAscii } = require('../../../src/utils/char-frequency')

tap.test('Likeness to be decrypted test', async (assert) => {
  assert.test('Empty string should have not printable chars', async (t) => {
    const printableAscii = countPrintableAscii('')
    t.equal(printableAscii, 0)
  })

  assert.test('A printable char should be recognised', async (t) => {
    const printableAscii = countPrintableAscii('a')
    t.equal(printableAscii, 1)
  })

  assert.test('Two printable char should be recognised', async (t) => {
    const printableAscii = countPrintableAscii('aa')
    t.equal(printableAscii, 2)
  })
})
