/* eslint no-unused-expressions: 0 */
/* global describe beforeEach it */
var proxyquire = require('proxyquire')
var sinon = require('sinon')
var supertest = require('supertest')
var expect = require('chai').expect
var express = require('express')
var bodyParser = require('body-parser')
var peopleApi = require('../../../app/lib/peopleApi')
var petsApi = require('../../../app/lib/petsApi')

describe('index', () => {
  var request

  beforeEach(() => {
    // Setting up the app this way means all dependencies from app.js are explicitly defined per route file
    var app = express()
    app.set('views', './app/views')
    app.set('view engine', 'pug')
    app.use(bodyParser.urlencoded({ extended: false }))

    var route = proxyquire('../../../app/routes/index', { '../lib/peopleApi': peopleApi, '../lib/petsApi.js': petsApi })

    route(app)

    request = supertest(app)
  })

  describe('GET /', () => {
    it('should respond with a 500 on peopleApi client error', () => {
      if (peopleApi.get.restore) peopleApi.get.restore()
      sinon.stub(peopleApi, 'get').rejects('Error!')
      if (petsApi.get.restore) petsApi.get.restore()
      sinon.stub(petsApi, 'get').resolves(['SHARK'])

      return request
        .get('/')
        .expect(500)
    })

    it('should respond with a 200 on petsApi client error as it is optional', () => {
      if (peopleApi.get.restore) peopleApi.get.restore()
      sinon.stub(peopleApi, 'get').resolves([])
      if (petsApi.get.restore) petsApi.get.restore()
      sinon.stub(petsApi, 'get').rejects('Error!')

      return request
        .get('/')
        .expect(200)
    })

    it('should respond with a 200 and render items', () => {
      if (peopleApi.get.restore) peopleApi.get.restore()
      var getStub = sinon.stub(peopleApi, 'get').resolves([{id: 1, name: 'Adam'}])
      if (petsApi.get.restore) petsApi.get.restore()
      var getPetsStub = sinon.stub(petsApi, 'get').resolves(['SHARK'])

      return request
        .get('/')
        .expect(200)
        .then(response => {
          expect(getStub.calledOnce).to.be.true
          expect(getPetsStub.calledOnce).to.be.true
          expect(response.text).to.contain('Adam')
          expect(response.text).to.contain('SHARK')
        })
    })
  })

  describe('POST /new', () => {
    it('should respond with a 200 and redirect', () => {
      var addStub = sinon.stub(peopleApi, 'add').resolves({name: 'Cheese'})

      return request
        .post('/new')
        .send({name: 'Cheese'})
        .expect(302)
        .then(response => {
          expect(addStub.calledOnce).to.be.true
        })
    })
  })

  describe('POST /delete/1234', () => {
    it('should respond with a 200 and redirect', () => {
      var delStub = sinon.stub(peopleApi, 'del').resolves()

      return request
        .post('/delete/1234')
        .expect(302)
        .then(response => {
          expect(delStub.calledOnce).to.be.true
        })
    })
  })
})
