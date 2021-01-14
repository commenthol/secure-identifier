const assert = require('assert')
const { ucs2 } = require('punycode') // eslint-disable-line node/no-deprecated-api
const { u } = require('../../scripts/utils')

function decode (str) {
  if (str) {
    return ucs2.decode(str).map(n => u(n)).join('')
  }
}

function deepEqual (res, exp) {
  assert.deepEqual(decode(res), decode(exp))
}

module.exports = {
  decode,
  deepEqual
}
