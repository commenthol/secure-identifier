const assert = require('assert')
const { Identifier } = require('..')
const fix = require('./fixtures')

describe('isStatus', function () {
  fix.circles.forEach((test, i) => {
    const exps = [true, true, true, true, true, true, false, false]
    const exp = exps[i]
    const [name, string, _] = test // eslint-disable-line no-unused-vars
    it(`should test ${name}`, function () {
      const res = new Identifier(string).isStatus()
      assert.strictEqual(res, exp)
    })
  })

  fix.circles.forEach((test) => {
    const [name, _, string] = test // eslint-disable-line no-unused-vars
    it(`should pass all converted confusables ${name}`, function () {
      const res = new Identifier(string).isStatus()
      assert.strictEqual(res, true)
    })
  })
})

describe('identifierStatus', function () {
  it('shall return no offending symbols', function () {
    const string = fix.circles[1][1]
    const res = new Identifier(string).status()
    // console.log('%j', res)
    assert.deepEqual(res, [])
  })

  it('shall return offending symbols', function () {
    const string = fix.circles[7][1]
    const res = new Identifier(string).status()
    // console.log('%j', res)
    assert.deepEqual(res, ['𝖢', '𝗂', '𝗋', '𝖼', '𝗅', '𝖾'])
  })
})
