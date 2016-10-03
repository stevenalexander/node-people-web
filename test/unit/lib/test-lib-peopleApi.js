/* global describe before it */
var expect = require('chai').expect
var sinon = require('sinon')
var proxyquire = require('proxyquire')

describe('peopleApi', function () {
  var peopleApi
  var request
  var requestGet
  var requestPost
  var requestDelete
  before(function () {
    requestGet = sinon.stub()
    requestPost = sinon.stub()
    requestDelete = sinon.stub()
    request = {
      get: requestGet,
      post: requestPost,
      delete: requestDelete
    }
    peopleApi = proxyquire('../../../app/lib/peopleApi', {'request': request})
  })

  describe('get', function () {
    it('should call API and parse body', function () {
      var person = { name: 'Adam' }
      var body = JSON.stringify([person])

      requestGet.yields(null, { statusCode: 200 }, body)

      peopleApi.get(function (error, people) {
        expect(error).to.be.null
        expect(people.length).to.equal(1)
        expect(people[0].name).to.equal(person.name)
      })
    })
  })

  describe('add', function () {
    it('should call API with post and data', function () {
      var person = { name: 'Bill' }
      requestPost.yields(null, { statusCode: 201 })

      peopleApi.add(person, function (error, newPerson) {
        expect(error).to.be.null
      })
    })
  })

  describe('del', function () {
    it('should call API and delete and id', function () {
      requestDelete.withArgs(13).yields(null, { statusCode: 204 })

      peopleApi.del(13, function (error) {
        expect(error).to.be.null
      })
    })
  })
})
