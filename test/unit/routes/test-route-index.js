/* global describe beforeEach it */
var proxyquire = require('proxyquire')
var sinon = require('sinon')
var supertest = require('supertest')
var expect = require('chai').expect
var express = require('express')
var bodyParser = require('body-parser')
var peopleApi = require('../../../app/lib/peopleApi')
require('sinon-bluebird')

describe('index', function () {
  var request

  beforeEach(function () {
    // Setting up the app this way means all dependencies from app.js are explicitly defined per route file
    var app = express()
    app.set('views', './app/views')
    app.set('view engine', 'pug')
    app.use(bodyParser.urlencoded({ extended: false }))

    var route = proxyquire('../../../app/routes/index', { '../../../app/lib/peopleApi': peopleApi })

    route(app)

    request = supertest(app)
  })

  describe('GET /', function () {
    it('should respond with a 500 on peopleApi client error', function (done) {
      if (peopleApi.get.restore) peopleApi.get.restore()
      sinon.stub(peopleApi, 'get').rejects('Error!')

      request
        .get('/')
        .expect(500)
        .end(done())
    })

    it('should respond with a 200 and render items', function (done) {
      if (peopleApi.get.restore) peopleApi.get.restore()
      var getStub = sinon.stub(peopleApi, 'get').resolves([{id: 1, name: 'Adam'}])

      request
        .get('/')
        .expect(200, function (error, response) {
          expect(getStub.calledOnce).to.be.true
          expect(error).to.be.null
          expect(response.text).to.contain('Adam')
          done()
        })
    })
  })

  describe('POST /new', function () {
    it('should respond with a 200 and redirect', function (done) {
      var addStub = sinon.stub(peopleApi, 'add').resolves({name: 'Cheese'})

      request
        .post('/new')
        .send({name: 'Cheese'})
        .expect(302, function (error, response) {
          expect(addStub.calledOnce).to.be.true
          expect(error).to.be.null
          done()
        })
    })
  })

  describe('POST /delete/1234', function () {
    it('should respond with a 200 and redirect', function (done) {
      var delStub = sinon.stub(peopleApi, 'del').resolves()

      request
        .post('/delete/1234')
        .expect(302, function (error, response) {
          expect(delStub.calledOnce).to.be.true
          expect(error).to.be.null
          done()
        })
    })
  })
})
