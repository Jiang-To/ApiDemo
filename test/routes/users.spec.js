'use strict'
const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const rewire = require('rewire')


const mongoose = require('mongoose')
const UserCtrl = rewire('../../src/controllers/users')
const UserRouter = require('../../src/routes/users')
const app = require('../../src/express')
const request =require('supertest')


describe('Router - User', (done) => {
  it('/api/users - should call controller getAllusers', () => {
    const getAllUsers = sinon.spy();
    UserCtrl.__set__('getAllUsers', getAllUsers);
    
    request(app)
      .get('/')
      .end((err, res)=>{
        expect(getAllUsers).calledOnce;
        done();
      })
  })
})