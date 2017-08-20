'use strict'

import User from '../controllers/users'

const getAllUsers = function (req, res) {
  User.find({}, function () {

  })
}

const createUser = function (req, res) {
  let user = new User(req.body);
  user.save(function (err, user) {
    if (err) {
      
    }
  })
}