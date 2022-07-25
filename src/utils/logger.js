'use strict'

const R = require('ramda')
const pino = require('pino')
const pretty = require('pino-pretty')

const logger = pino(pretty())

const getLogger = R.curry(({ printLogs }, message) => R.when(
  () => R.equals(true, printLogs),
  R.tap((value) => logger.info({ value }, `${message} `))
))

module.exports = { getLogger }
