const confusables = require('./confusables')
const {caseFolding} = require('./caseFolding')
const {identifierStatus, isStatus} = require('./identifierStatus')

class IdentifierBase {
  /**
  * constructs an identifier...
  * @param {String} name - string to verify as identifier
  * @param {Object} [opts]
  * @param {Number} [opts.minLength=2] - minLength of name
  * @param {Number} [opts.maxLength=60] - maxLength of name
  */
  constructor (string, opts) {
    string = string || ''
    opts = Object.assign({minLength: 2, maxLength: 60}, opts)
    Object.assign(this, {
      string,
      _original: string,
      opts
    })
  }
  /**
  * trim whitespace
  */
  trim () {
    this.string = this.string.trim()
    return this
  }
  /**
  * trim single whitespace chars and replace by '-' to pass `confusables()`
  */
  trimSpaces () {
    this.string = this.string.replace(/\s+/g, (m) => {
      return m.length === 1
        ? '-'
        : m
    })
    return this
  }
  /**
  * @return {Number} length of original string
  */
  length () {
    return Array.from(this._original).length
  }
  /**
  * remove confusables homoglyphs
  */
  confusables () {
    this.string = confusables(this.string)
    return this
  }
  /**
  * perform case-folding
  */
  caseFolding (type) {
    this.string = caseFolding(this.string, type)
    return this
  }
  /**
  * normalize UTF string
  * @param {String} type - see String.normalize() for allowed values
  */
  normalize (type) {
    this.string = this.string.normalize(type)
    return this
  }
  /**
  * perform all ops to convert to a secure string
  */
  secure () {
    this.confusables()
      .trim()
      .normalize('NFC')
      .caseFolding()
      .trimSpaces()
    this._isSecure = true // internal qualifier to stop reprocessing string again
    return this
  }
  /**
  * @return {Array} all offending chars
  */
  status () {
    return identifierStatus(this.string)
  }
  /**
  * @return {String|undefined} secured identifier if valid
  */
  valid () {
    if (this.isValid()) return this.string
  }
  /**
  * @return {Boolean} `true` if all symbols are allowed
  */
  isStatus () {
    return isStatus(this.string)
  }
  /**
  * @return {Boolean} `true` if all symbols are valid
  */
  isValid () {
    return this.isMinLength() && this.isMaxLength() && isStatus(this.string)
  }
  /**
  * @return {Boolean} `true` if string matches minLength
  */
  isMinLength () {
    return this.length() >= this.opts.minLength
  }
  /**
  * @return {Boolean} `true` if string matches maxLength
  */
  isMaxLength () {
    return this.length() <= this.opts.maxLength
  }
  /**
  * @return {String} get current string
  */
  toString () {
    return this.string
  }
}

module.exports = IdentifierBase
