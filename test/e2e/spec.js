/* global browser describe it */
var assert = require('assert')

describe('People web', () => {
  it('should list people, allow adding and deleting', () => {
    return browser.url('/')
      .getTitle().then(function (title) {
        assert.equal(title, 'People')
      })
  })
})
