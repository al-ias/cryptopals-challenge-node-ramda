'use strict'

const R = require('ramda')

const onList = (binaryFunction) => R.converge(R.reduce(binaryFunction), [R.head, R.tail])

module.exports = { onList }
