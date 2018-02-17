const _status = require('../data/identifierStatus')
const ALLOWED = 'allowed'

module.exports = {
  identifierStatus,
  isStatus
}

function identifierStatus (string) {
  const offending = []
  for (const symbol of string) { // ES6 only
    if (!_status[ALLOWED].test(symbol)) {
      offending.push(symbol)
    }
  }
  return Array.from(new Set(offending))
}

function isStatus (string) {
  for (const symbol of string) { // ES6 only
    if (!_status[ALLOWED].test(symbol)) {
      return false
    }
  }
  return true
}
