'use strict'

const glob = require('glob')
const _ = require('lodash')



module.exports = (mongoose) => {
  let modules = {}
  const files = glob.sync('*.js')
  for (const file in files) {
    if(file === 'index.js'){
      return
    }

    _.extend(modules, require(file)(mongoose))
  }

  return modules
}