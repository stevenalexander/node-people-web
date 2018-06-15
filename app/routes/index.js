var express = require('express')
var peopleApi = require('../lib/peopleApi')
var petsApi = require('../lib/petsApi')

module.exports = function (app) {
  var route = express.Router()

  app.use('/', route)

  route.get('/', async function (req, res) {
    let pets = []
    try {
      let people = await peopleApi.get()

      try {
        pets = await petsApi.get()
      } catch (error) {
        console.log('Optional API dependency Pets failed')
      }

      res.render('index', { title: 'People', 'people': people, 'pets': pets })
    } catch (error) {
      res.status(500).render('error', {message: error.message, error: error})
    }
  })

  route.post('/new', async function (req, res) {
    try {
      var newPerson = { name: req.body.name, dob: req.body.dob, status: 'NEW', pet: req.body.pet }
      await peopleApi.add(newPerson)
      res.redirect('/')
    } catch (error) {
      res.status(500).render('error', {message: error.message, error: error})
    }
  })

  route.post('/delete/:id', async function (req, res) {
    try {
      await peopleApi.del(req.params.id)
      res.redirect('/')
    } catch (error) {
      res.status(500).render('error', {message: error.message, error: error})
    }
  })

  route.get('/status', function (req, res) {
    res.render('status', { title: 'STATUS', status: 'OK' })
  })
}
