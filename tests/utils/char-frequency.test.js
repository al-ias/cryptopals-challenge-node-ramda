'use strict'

const tap = require('tap')
const { countLetters } = require('../../src/utils/char-frequency')

tap.test('Count letters test', async (t) => {
  t.test('Empty string should be counted as 0 chars', async assert => {
    const letterCount = countLetters('')

    assert.equal(letterCount, 0)
  })

  t.test('Special characters should not be counted', async assert => {
    const letterCount = countLetters('_')

    assert.equal(letterCount, 0)
  })

  t.test('Special characters should not be counted', async assert => {
    const letterCount = countLetters('\n')

    assert.equal(letterCount, 0)
  })

  t.test('Number characters should not be counted', async assert => {
    const letterCount = countLetters('1')

    assert.equal(letterCount, 0)
  })

  t.test('Lowercase letters should be counted', async assert => {
    const letterCount = countLetters('a')

    assert.equal(letterCount, 1)
  })

  t.test('Uppercase letters should be counted', async assert => {
    const letterCount = countLetters('A')

    assert.equal(letterCount, 1)
  })

  t.test('Letters should be counted correctly', async assert => {
    const letterCount = countLetters('Ab 12 # \t e')

    assert.equal(letterCount, 3)
  })
})
