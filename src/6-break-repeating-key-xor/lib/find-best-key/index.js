'use strict'

const R = require('ramda')

const { onList } = require('../../../utils/binary-func-on-list')

const { minimumKeysizes } = require('../keysize-manipulation')
const { getDistanceAveragesOnKeysizes, selectBestKeysize } = require('./get-distance-averages-on-keysizes')
const { getOmogeneusEncryptedBuffers } = require('./get-omogeneus-encrypted-buffers')
const { selectBestKeyOnEachBuffer } = require('./select-best-key-on-each-buffer')

const getLinesMinimumKeysizes = (config) => R.map(minimumKeysizes(config))

const splitHexStringEveryNBytes = (bytes) => R.splitEvery(bytes * 2)

const getBestKeysizeFromString = ({ thunkSize, logger, ...config }) => R.pipe(
  splitHexStringEveryNBytes(thunkSize),
  getLinesMinimumKeysizes({ logger, ...config }),
  logger('n minimum keysizes'),
  /* minimumKeysizes,
  (obj) => [obj], */
  // logger('Distances and keysizes found for each text line:'),
  getDistanceAveragesOnKeysizes,
  logger('Averaged Hamming distances found:'),
  selectBestKeysize,
  logger('Best keysize found:')
)

const findBestKey = ({ logger, ...config }) => R.pipe(
  R.converge(
    getOmogeneusEncryptedBuffers,
    [getBestKeysizeFromString({ logger, ...config }), R.identity]
  ),
  logger('Omogeneus encoded hex buffers:'),
  selectBestKeyOnEachBuffer({ logger, ...config }),
  logger('Omogeneus encoded buffers - single char key:'),
  R.map(R.prop('hexKey')),
  onList(R.concat),
  logger('Best key found:')
)

module.exports = { findBestKey, getBestKeysizeFromString }
