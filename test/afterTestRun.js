'use strict'
const chalk = require('chalk')
const path = require('path')

after(()=>{
  let coverageReportPath = path.resolve(__dirname, '../coverage/index.html')
  console.log(chalk.yellow('Coverage Report: ' + coverageReportPath))
})