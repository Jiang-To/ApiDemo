'use strict'

const mongoose = require('mongoose')
const config = require('../src/config')
const chalk = require('chalk')

const options = {
  useMongoClient: true
}

before(() => {
  mongoose.Promise = global.Promise
  mongoose.connect(config.dbUrl, options)
  mongoose.connection.on('open', () => { })
  mongoose.connection.on('error', (err) => {
    console.log(chalk.bgRed('mongo db error: '+ err))
   })
})

