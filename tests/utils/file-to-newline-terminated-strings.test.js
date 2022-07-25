'use strict'

const tap = require('tap')
const { fileToNewLineTerminatedStrings } = require('../../src/utils/file-to-newline-terminated-strings')

tap.test('File to newline terminated strings tests', async t => {
  t.test('Should parse strings correctly', async assert => {
    const filePath = 'tests/utils/file-to-newline-terminated-strings.test.txt'

    const strings = fileToNewLineTerminatedStrings(filePath)
    const expectedStrings = ['hi', 'how are', 'you?']
    assert.same(strings, expectedStrings)
  })

  t.test('Should throwError if file is not found', async assert => {
    const filePath = './not-found-file.txt'

    assert.throws(() => fileToNewLineTerminatedStrings(filePath))
  })
})
