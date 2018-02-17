const log = require('debug')('test:confusables')
const {Identifier} = require('..')
const {decode, deepEqual} = require('./support')
const fix = require('./fixtures')

describe('confusables', function () {
  fix.singleScript.forEach((test, i) => {
    const [name, string, exp] = test
    it(`should ${name}`, function () {
      const res = new Identifier(string).confusables().toString()
      log(string, res, decode(res))
      deepEqual(res, exp)
    })
  })

  fix.mixedScript.forEach((test, i) => {
    const [name, string, exp] = test
    it(`should ${name}`, function () {
      const res = new Identifier(string).confusables().toString()
      log(string, res, decode(res))
      deepEqual(res, exp)
    })
  })

  fix.wholeScript.forEach((test, i) => {
    const [name, string, exp] = test
    it(`should ${name}`, function () {
      const res = new Identifier(string).confusables().toString()
      log(string, res, decode(res))
      deepEqual(res, exp)
    })
  })

  fix.circles.forEach((test, i) => {
    const [name, string, exp] = test
    it(`should convert ${name}`, function () {
      const res = new Identifier(string).confusables().toString()
      log(string, res, decode(res))
      deepEqual(res, exp)
    })
  })
})
