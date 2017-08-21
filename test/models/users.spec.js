'use strict'
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const _ = require('lodash')

const expect = chai.expect
chai.use(sinonChai)

const User = require('../../src/models/users')

describe('Models - users', () => {
  describe('Model Validation', () => {
    it('validation fails when empty username', () => {
      let user = new User();
      user.validateSync();

      expect(user.errors).to.not.be.null;
      expect(user.errors).to.not.be.undefined;
      expect(user.errors).to.have.property('username')
    })

    it('validation fails when empty password', () => {
      let user = new User({
        username: 'demo'
      });
      user.validateSync();

      expect(user.errors).to.not.be.null;
      expect(user.errors).to.not.be.undefined;
      expect(user.errors).to.have.property('password')
    })
  })

  describe('Static Methods', () => {

    let users = [];

    before(() => {
      // mock User schema
      users.push({
        _id: 1,
        username: 'user1',
        password: 'password1'
      })

      users.push({
        _id: 2,
        username: 'user2',
        password: 'password2'
      })
    })

    describe('Get all users', () => {
      it('should return all users', () => {
        // arrange
        let mockFind = {
          find: function () {
            return this
          },
          exec: function (callback) {
            callback(null, users)
          }
        }
        sinon.stub(User, 'find').returns(mockFind)
        let callback = sinon.spy()

        // action
        User.findAll(callback)

        // assert
        expect(User.find).calledOnce
        expect(callback).calledWith(null, users)
      })
    })
  })
})