'use strict'
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const _ = require('lodash')

const expect = chai.expect
chai.use(sinonChai)

const User = require('../../src/models/users')
const mongoose = require('mongoose')

describe('Models - Users', () => {
  // clearn up collect before test cases runing

  let user1 = new User({
    username: 'user1',
    password: 'password1'
  })

  let user2 = new User({
    username: 'user2',
    password: 'password2'
  })

  let user3 = new User({
    username: 'user3',
    password: 'password3'
  })

  before(done => {
    const cleanUp = User.remove({})
    cleanUp.then(() => {
        // ugly =_=
        user1.save().then(() => {
          user2.save().then(() => {
            user3.save().then(() => {
              done()
            })
          })
        })
      })
      .catch((err) => {
        done(err);
      })
  })

  describe('Model validation', () => {
    it('username is required', () => {
      let user = new User({});
      ///     error
       return user.save().then()
        .catch(err => {
          expect(err).to.not.be.null
          expect(err.errors).has.property('username')
        })
    });

    it('password is required', () => {
      let user = new User({username: 'user'});
      ///     error
       return user.save().then()
        .catch(err => {
          expect(err).to.not.be.null
          expect(err.errors).has.property('password')
        })
    });

    it('password should not changed if not updated or new created', () => {
      let passwordHash = ''
      return User.findByUsername(user1.username)
        .then(user => {
          passwordHash = user.password
          return user.save()
        })
        .then(user => {
          expect(user.password).to.equals(passwordHash)
        })
    });

  })

  describe('Get all users', () => {
    it('should return all users', () => {
      // // arrange
      // let mockFind = {
      //   find: function () {
      //     return this
      //   },
      //   exec: function (callback) {
      //     callback(null, users)
      //   }
      // }
      // sinon.stub(User, 'find').returns(mockFind)
      // let callback = sinon.spy()

      // // action
      // User.findAll(callback)

      // // assert
      // expect(User.find).calledOnce
      // expect(callback).calledWith(null, users)

      // arrange

      return User.findAll()
        .then((users) => {
          expect(users.length).to.equals(3)
          expect(users).to.be.an('array')
          expect(users[0].username).to.equal(user1.username)
          expect(users[0].password).to.equal(user1.password)
        })
    })
  })

  describe('Get single user by username', () => {
    it('should return single user if user exists', (done) => {
      User.findByUsername(user1.username)
        .then((user) => {
          expect(user1.username).to.equal(user.username)
          expect(user1.id.toString()).to.equal(user.id.toString())
        })
        .then(() => done())
        .catch(err => done(err))
    })

    it('should return null if no such a user', (done) => {
      User.findByUsername('user not exists')
        .then((user) => {
          expect(user).to.be.null
        })
        .then(() => done())
        .catch(err => done(err))
    })
  })

  describe('Validate user password', () => {

    it('return true when password matched', () => {
      return User.findByUsername(user1.username)
        .then(user => {
          return user.comparePassword('password1')
        })
        .then(isMatch => {
          expect(isMatch).to.be.true
        })
    })

    it('return false when password doesn\'t matched', () => {
      return User.findByUsername(user1.username)
        .then(user => {
          return user.comparePassword('wrong password')
        })
        .then(isMatch => {
          expect(isMatch).to.be.false
        })
    })
  })
})