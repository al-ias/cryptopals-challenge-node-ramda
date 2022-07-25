'use strict'

const tap = require('tap')
const { nomalizedKeysize } = require('../../../src/6-break-repeating-key-xor/lib/keysize-manipulation')

tap.test('Average hamming distance tests', async t => {
  t.test('Normalized keysize should be 0 if buffers are the same, on Byte keysize', async assert => {
    const hexBytes = Buffer.from([0xff, 0xff], 'hex')

    const nk = nomalizedKeysize(hexBytes, 1)
    assert.equal(nk, 0)
  })

  t.test('Normalized keysize should be 0 if buffers differ of one bit, on Byte keysize', async assert => {
    const hexBytes = Buffer.from([0x01, 0x00], 'hex')

    const nk = nomalizedKeysize(hexBytes, 1)
    assert.equal(nk, 15)
  })

  t.test('Normalized keysize should be 0 if buffers are the same, on 2 Byte keysize', async assert => {
    const hexBytes = Buffer.from([0xff, 0xff, 0xff, 0xff], 'hex')

    const nk = nomalizedKeysize(hexBytes, 2)
    assert.equal(nk, 0)
  })

  t.test('Normalized keysize should be 0 if buffers differ of one bit, on Byte keysize', async assert => {
    const hexBytes = Buffer.from([0x00, 0x00, 0x00, 0x01], 'hex')

    const nk = nomalizedKeysize(hexBytes, 2)
    assert.equal(nk, 7.5)
  })

  t.test('Normalized keysize should be 0 if buffers differ of one bit, on Byte keysize', async assert => {
    const hexBytes = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x01], 'hex')

    const nk = nomalizedKeysize(hexBytes, 3)
    assert.equal(nk, 5)
  })

  t.test('Normalized keysize should be 0 if buffers differ of one bit, on Byte keysize', async assert => {
    const hexBytes = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x01], 'hex')

    const nk = nomalizedKeysize(hexBytes, 3)
    assert.equal(nk, 5)
  })

  t.test('Differing bits should be 0 if string are equal', async assert => {
    const asciiString = 'aa'
    //TODO: maybe convert to hex
    

    const averageHammingDistance = nomalizedKeysize(asciiString, 1)

    assert.equal(averageHammingDistance, 0)
  })
})
