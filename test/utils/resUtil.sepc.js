'use strict'
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const expect = chai.expect
chai.use(sinonChai)

const resUtil = require('../../src/utils/resUtil')

describe('Utils - resUtil', () => {
  
  describe('sendJson', () => {
    it('send with success data', () => {
      var res = {
        json: sinon.spy()
      }

      resUtil.sendJson(res, null, 'success data');
      expect(res.json).calledWith({
        success: true,
        data: 'success data',
        error: null
      })

      expect(res.json).calledOnce
    })

    it('send with error data', () => {
      var res = {
        json: sinon.spy()
      }

      resUtil.sendJson(res, 'error data', null);
      expect(res.json).calledWith({
        success: false,
        data: null,
        error: 'error data'
      })

      expect(res.json).calledOnce
    })
  })
})