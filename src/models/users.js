'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})


userSchema.statics.findByUsername = function (username) {
  let query = this.findOne({username: username})
  return query.exec()
}

userSchema.statics.findAll = function(){
  let query = this.find()
  return query.exec()
}

// generate salt before user save
userSchema.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next()
    })
  })
})

userSchema.methods.comparePassword = function (password) {
  let user = this
  return bcrypt.compare(password, user.password)
}


module.exports = mongoose.model('User', userSchema, 'users')