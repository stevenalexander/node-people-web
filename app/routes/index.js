var express = require('express')
var peopleApi = require('../lib/peopleApi')

module.exports = function (app) {
  var route = express.Router()

  app.use('/', route)

  route.get('/', function (req, res) {
    peopleApi.get().then(function (people) {
      res.render('index', { title: 'People', 'people': people })
    }).catch(function (error) {
      res.status(500).render('error', {message: error.message, error: error})
    })
  })

  route.post('/new', function (req, res) {
    var newPerson = { name: req.body.name, dob: req.body.dob, status: 'NEW' }
    peopleApi.add(newPerson).then(function (newPerson) {
      res.redirect('/')
    }).catch(function (error) {
      res.status(500).render('error', {message: error.message, error: error})
    })
  })

  route.post('/delete/:id', function (req, res) {
    peopleApi.del(req.params.id).then(function () {
      res.redirect('/')
    }).catch(function (error) {
      res.status(500).render('error', {message: error.message, error: error})
    })
  })

  route.get('/status', function (req, res) {
    res.render('status', { title: 'STATUS', status: 'OK' })
  })
}
