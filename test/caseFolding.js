const { Identifier, CASEFOLD_SIMPLE } = require('..')
const log = require('debug')('test:caseFolding')
const { decode, deepEqual } = require('./support')
const fix = require('./fixtures')

describe('caseFolding', function () {
  describe('simple', function () {
    fix.caseFolding.forEach((test, i) => {
      const [string, exp] = test
      it(`should ${string}`, function () {
        const res = new Identifier(string)
          .caseFolding(CASEFOLD_SIMPLE)
          .toString()
        log(string, res, decode(res))
        deepEqual(res, exp)
      })
    })
  })

  describe('full', function () {
    fix.caseFolding.forEach((test, i) => {
      const [string, _, exp] = test // eslint-disable-line no-unused-vars
      it(`should ${string}`, function () {
        const res = new Identifier(string)
          .caseFolding()
          .toString()
        log(string, res, decode(res))
        deepEqual(res, exp)
      })
    })
  })
})
