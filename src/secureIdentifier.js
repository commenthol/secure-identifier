const Identifier = require('./Identifier')

/**
* convert `string` into a secure identifier
* @param {String} string - input
* @return {String|undefined} - returns secure identifier if valid.
*/
function secureIdentifier (string) {
  return new Identifier(string).secure().valid()
}

module.exports = secureIdentifier
