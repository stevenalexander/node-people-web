/* global describe before it */
var expect = require('chai').expect
var sinon = require('sinon')
var proxyquire = require('proxyquire')
var request = require('request-promise')

require('sinon-bluebird')

describe('peopleApi', function () {
  var peopleApi

  before(function () {
    peopleApi = proxyquire('../../../app/lib/peopleApi', {'request-promise': request})
  })

  describe('get', function () {
    it('should call API and parse body', function () {
      var people = [{ name: 'Bill' }]
      var stubGet = sinon.stub(request, 'get').resolves(people)

      peopleApi.get().then(function (list) {
        expect(list[0].name).to.equal('Bill')
        expect(stubGet.called).to.be.true
      })
    })
  })

  describe('add', function () {
    it('should call API with post and data', function () {
      var person = { name: 'Bill' }
      var newPerson = { id: 1, name: 'Bill' }
      var stubPost = sinon.stub(request, 'post').resolves(newPerson)

      peopleApi.add(person).then(function (person) {
        expect(person.name).to.equal('Bill')
        expect(stubPost.called).to.be.true
      })
    })
  })

  describe('del', function () {
    it('should call API and delete and id', function () {
      var stubDel = sinon.stub(request, 'delete').resolves()

      peopleApi.del(1).then(function () {
        expect(stubDel.called).to.be.true
      })
    })
  })
})
