'use strict'

const config = require('./config')
const mongoose = require('mongoose')
const nconf = require('nconf')

require('./models')(mongoose)

const mongoOptions = {

}

mongoose.connect(config.dbUrl, mongoOptions, () => {
  console.log('mongo db connected')
})

console.log(process.env.NODE_ENV);

