'use strict'

const tap = require('tap')
const { hammingDistance } = require('../../../src/6-break-repeating-key-xor/lib/keysize-manipulation/hamming-distance')

tap.test('Hamming distance tests', async t => {
  t.test('Hamming distance should be 0 if both strings are empty', async assert => {
    const string1 = ''
    const string2 = ''

    const hd = hammingDistance(string1, string2)
    assert.equal(hd, 0)
  })

  t.test('Hamming distance should be 0 if strings are equal', async assert => {
    const string1 = 'hello'
    const string2 = 'hello'

    const hd = hammingDistance(string1, string2)
    assert.equal(hd, 0)
  })

  t.test('Hamming distance should be 1 for \'\' and \'a\'', async assert => {
    const string1 = ''
    const string2 = 'a'

    const hd = hammingDistance(string1, string2)
    assert.equal(hd, 1 * 8)
  })

  t.test('Hamming distance should be 1 for \'a\' and \'\'', async assert => {
    const string1 = 'a'
    const string2 = ''

    const hd = hammingDistance(string1, string2)
    assert.equal(hd, 1 * 8)
  })

  t.test('Hamming distance should be 1 for \'1\' and \'3\'', async assert => {
    const string1 = '1'
    const string2 = '3'

    const hd = hammingDistance(string1, string2)
    assert.equal(hd, 1)
  })

  t.test('Hamming distance should be 2 for \'a\' and \'b\'', async assert => {
    const string1 = 'a'
    const string2 = 'b'

    const hd = hammingDistance(string1, string2)
    assert.equal(hd, 2)
  })

  t.test('Hamming distance should be 37', async assert => {
    const string1 = 'this is a test'
    const string2 = 'wokka wokka!!!'

    const hd = hammingDistance(string1, string2)
    assert.equal(hd, 37)
  })
})
