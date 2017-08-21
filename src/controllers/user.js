'use strict'

const User = require('../models/users')
const resUtil = require('../utils/resUtil')


const getAllUsers = function (req, res) {
  User.findAll(function (err, users) {
    resUtil.sendJson(res, err, users)
  })
}

const createUser = function (req, res) {
  let user = new User(req.body);
  user.save(function (err, user) {
    if (err) {

    }
  })
}

module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser
}
