'use strict'

const express = require('express')
const config = require('./config')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = config.port

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send("hello world")
})

app.listen(port, () => {
  console.log('start listening on port %s', port)
})