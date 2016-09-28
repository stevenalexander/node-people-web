var express = require('express')
var peopleApi = require('../lib/peopleApi')

module.exports = function (app) {
  var route = express.Router()

  app.use('/', route)

  route.get('/', function (req, res) {
    peopleApi.get(function (error, people) {
      if (!error) {
        res.render('index', { title: 'People', 'people': people })
      } else {
        res.status(500).render('error', {message: error.message, error: error})
      }
    })
  })

  route.post('/add', function (req, res) {
    var newPerson = { name: req.body.name }
    peopleApi.add(newPerson, function (error, newPerson) {
      if (!error) {
        res.redirect('/')
      } else {
        res.status(500).render('error', {message: error.message, error: error})
      }
    })
  })

  route.get('/delete/:id', function (req, res) {
    peopleApi.del(req.params.id, function (error) {
      if (!error) {
        res.redirect('/')
      } else {
        res.status(500).render('error', {message: error.message, error: error})
      }
    })
  })
}
