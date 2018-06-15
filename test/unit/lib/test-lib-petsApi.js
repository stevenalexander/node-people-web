/* eslint no-unused-expressions: 0 */
/* global describe before after it */
var expect = require('chai').expect
var sinon = require('sinon')
var proxyquire = require('proxyquire')
var axios = require('axios')

describe('petsApi', () => {
  var petsApi

  before(() => {
    petsApi = proxyquire('../../../app/lib/petsApi', {'axios': axios})
  })

  describe('get', () => {
    it('should call API and parse body', () => {
      var pets = ['DONKEY', 'SHARK']
      if (axios.get.restore) axios.get.restore()
      var stubGet = sinon.stub(axios, 'get').resolves({ data: pets })

      return petsApi.get()
        .then(function (list) {
          expect(list[0]).to.equal('DONKEY')
          return expect(stubGet.called).to.be.true
        })
    })
    after(() => {
      axios.get.restore()
    })
  })
})
