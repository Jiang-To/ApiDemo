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


userSchema.static.findByUsername = function (username, callback) {
  return this.findOne({
    username: username
  }, callback);
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

userSchema.methods.comparePassword = function (password, callback) {
  let user = this
  bcrypt.compare(password, user.password, function (err, isMatch) {
    if (err) {
      return next(err)
    }

    callback(null, isMatch)
  })
}


export default mongoose.model('User', userSchema, 'users')