'use strict'

const tap = require('tap')
const { countDifferingBits, hammingDistanceHexBuff } = require('../../../src/6-break-repeating-key-xor/lib/keysize-manipulation/hamming-distance')

tap.test('Differing bits tests', async t => {
  t.test('Differing bits should be 0 if hex are equal', async assert => {
    const string1 = 0x0
    const string2 = 0x0

    const hd = countDifferingBits(string1, string2)
    assert.equal(hd, 0)
  })

  t.test('Differing bits should be 0 if hex are equal', async assert => {
    const string1 = 0x0
    const string2 = 0x1

    const hd = countDifferingBits(string1, string2)
    assert.equal(hd, 1)
  })

  t.test('Hamming distance should be 2 for \'0xAB\' and \'0x0c\'', async assert => {
    const hex1 = Buffer.from([0xAB])
    const hex2 = Buffer.from([0x0c])

    const hd = hammingDistanceHexBuff(hex1, hex2)
    assert.equal(hd, 5)
  })

  t.test('Hamming distance should be 2 for \'0xAB\' and \'0x0c\'', async assert => {
    const hex1 = Buffer.from([0xAB])
    const hex2 = Buffer.from([0x0c])

    const hd = hammingDistanceHexBuff(hex1, hex2)
    assert.equal(hd, 5)
  })
})
