'use strict'

const nconif = require('nconf')
const path = require('path')
const _ = require('lodash')

// determine running environment
var env = process.env.NODE_ENV || 'dev'

var baseConfig = require('./base.config')
var envConfig = require('./' + env + '.config')

var config = _.merge({}, baseConfig, envConfig)
module.exports = config
