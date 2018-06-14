/* eslint no-unused-expressions: 0 */
/* global describe before it */
var expect = require('chai').expect
var sinon = require('sinon')
var proxyquire = require('proxyquire')
var axios = require('axios')

describe('peopleApi', () => {
  var peopleApi

  before(() => {
    peopleApi = proxyquire('../../../app/lib/peopleApi', {'axios': axios})
  })

  describe('get', () => {
    it('should call API and parse body', () => {
      var people = [{ name: 'Bill' }]
      var stubGet = sinon.stub(axios, 'get').resolves(people)

      peopleApi.get().then(function (list) {
        expect(list[0].name).to.equal('Bill')
        return expect(stubGet.called).to.be.true
      })
    })
  })

  describe('add', () => {
    it('should call API with post and data', () => {
      var person = { name: 'Bill' }
      var newPerson = { id: 1, name: 'Bill' }
      var stubPost = sinon.stub(axios, 'post').resolves(newPerson)

      peopleApi.add(person).then(function (person) {
        expect(person.name).to.equal('Bill')
        return expect(stubPost.called).to.be.true
      })
    })
  })

  describe('del', () => {
    it('should call API and delete and id', () => {
      var stubDel = sinon.stub(axios, 'delete').resolves()

      peopleApi.del(1).then(() => {
        return expect(stubDel.called).to.be.true
      })
    })
  })
})
