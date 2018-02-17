const {CASEFOLD_SIMPLE, CASEFOLD_FULL} = require('./caseFolding')
const Identifier = require('./Identifier')
const secureIdentifier = require('./secureIdentifier')
const Reserved = require('./Reserved')

module.exports = {
  Identifier,
  secureIdentifier,
  CASEFOLD_SIMPLE,
  CASEFOLD_FULL,
  Reserved
}
