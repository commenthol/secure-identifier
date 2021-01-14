const IdentifierBase = require('./IdentifierBase')
const Reserved = require('./Reserved')

const _reserved = new Reserved()

class Identifier extends IdentifierBase {
  /**
   * constructs an identifier...
   * @param {String} name - string to verify as identifier
   * @param {Object} [opts]
   * @param {Reserved} opts.reserved - custom reserved names list
   */
  constructor (name, opts) {
    super(name, opts)
    opts = opts || {}
    this.reserved = opts.reserved || _reserved
  }

  /**
   * @return {Boolean} `true` if name is a reserved name
   */
  isReserved () {
    return this.reserved.lookup(this.string, this._isSecure)
  }

  /**
   * @return {Boolean} `true` if name is a valid identifier
   */
  isValid () {
    return super.isValid() && !this.isReserved()
  }
}

module.exports = Identifier
