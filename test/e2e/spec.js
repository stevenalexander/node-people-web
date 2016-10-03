/* global browser describe it */
var assert = require('assert')

const NEW_NAME = 'webdriverio'

describe('People web', () => {
  it('should list people, allow adding and deleting', () => {
    return browser.url('/')
      .getTitle().then(function (title) {
        assert.equal(title, 'People')
      })
      .setValue('*[name="name"]', NEW_NAME)
      .click('*[name="add"]')
      .getText('.people').then(function (text) {
        assert(text.includes(NEW_NAME), 'People list should contain the new name after it is added')
      })
      .element('.person*=' + NEW_NAME).click('a')
      .getText('.people').then(function (text) {
        assert(!text.includes(NEW_NAME), 'People list should not contain the new name after it is deleted')
      })
  })
})
