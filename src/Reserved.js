const IdentifierBase = require('./IdentifierBase')
const _data = require('../data/reserved')

/**
* @api private
*/
class Cache {
  constructor () {
    this._data = {}
    this._regexes = []
    this._indexOf = []
  }
  add (name) {
    if (name instanceof RegExp) {
      this._regexes.push(name)
    } else if (typeof name === 'string') {
      const m = /^([*]?)(.*?)([*]?)$/.exec(name)
      if (m && (m[1] || m[3])) {
        const sec = new IdentifierBase(m[2]).secure().toString()
        const fn = (name) => {
          const p = (name || '').indexOf(sec)
          if (
            (p >= 0) &&
            (
              (m[3] && m[1]) || // contains
              (m[3] && p === 0) || // startswith
              (m[1] && p === (name.length - sec.length)) // endsWith
            )
          ) {
            return true
          }
          return false
        }
        this._indexOf.push(fn)
      } else {
        const sec = new IdentifierBase(name).secure().toString()
        this._data[sec] = true
      }
    } else {
      throw new TypeError('not String or RegExp')
    }
  }
  lookup (name) {
    if (this._data[name]) return true
    for (const ind of this._indexOf) {
      if (ind(name)) return true
    }
    for (const re of this._regexes) {
      if (re.test(name)) return true
    }
    return false
  }
}

class Reserved {
  /**
  * creates a list of reserved words
  * an entry may consist of a string or regex
  * using an `*` asterix at beginning or end creates `startsWith`, `contains`,
  * `endsWith` rules. E.g. `*test*` matches all names which contains `test`
  * @constructor
  * @param {Array<String|RegExp>} data - list of reserved names
  */
  constructor (data) {
    data = data || _data
    this._cache = new Cache()
    data.forEach((name) => {
      this._cache.add(name)
    })
  }
  /**
  * lookup `string` if its part of the reserved names list
  * @param {String} string - string to look for
  * @param {Boolean} [isSecure] - if `true` then string is already "sanitized"
  * @return {Boolean} if `true` then `string` is a reserved name
  */
  lookup (string, isSecure) {
    const sec = isSecure
      ? string
      : new IdentifierBase(string).secure().toString()
    return this._cache.lookup(sec)
  }
}

module.exports = Reserved
