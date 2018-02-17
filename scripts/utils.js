const regenerate = require('regenerate')

module.exports = {
  u,
  x,
  toNumber,
  surrogatePair,
  surrogateES6,
  identifier,
  identifierTemplate
}

/**
* convert to unicode escaped char
*/
function u (code) {
  let str = '0000' + code.toString(16).toUpperCase()
  str = '\\u' + str.substr(str.length - 4, 4)
  return str
}

function x (code) {
  let str = '00' + code.toString(16).toUpperCase()
  str = '\\x' + str.substr(str.length - 2, 2)
  return str
}

/**
*/
function toNumber (code) {
  if (typeof code === 'string') {
    code = Number('0x' + code)
  }
  return code
}

function toCamelCase (str) {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}
/**
*/
function surrogateES6 (code) {
  code = toNumber(code)
  if (code < 0x10000) {
    return u(code)
  }
  return '\\u{' + code.toString(16).toUpperCase() + '}'
}

/**
* @see Section 3.7 of The Unicode Standard 3.0 http://unicode.org/versions/Unicode3.0.0/ch03.pdf
*/
function surrogatePair (code) {
  code = toNumber(code)
  if (code < 0x10000) {
    return u(code)
  }
  const H = Math.floor((code - 0x10000) / 0x400) + 0xD800
  const L = (code - 0x10000) % 0x400 + 0xDC00
  return u(H) + u(L)
}

/**
*/
function identifierTemplate (regexes) {
  const keys = Object.keys(regexes)
  const tmpl = keys.map(key =>
    `exports.${key} = /${regexes[key]}/`
  )
  return tmpl.join('\n') + '\n'
}

function print (range) { // eslint-disable-line no-unused-vars
  const line = (code) => console.log(`${u(code)}\t${String.fromCodePoint(code)}`)
  if (range.length === 1) {
    line(range[0])
  } else {
    for (let i = range[0]; i <= range[1]; i++) {
      line(i)
    }
  }
}

/**
*/
function identifier (data) {
  const _regexes = {}

  data.split(/[\r\n]/)
    .filter((line) => !/^\s*#|^\s*$/.test(line))
    .map((line) => {
      let [range, status] = line.split(/[;#]/).map(s => s.trim())
      range = range.split('..').map((c) => Number('0x' + c))
      status = status.split(/\s/)

      status.forEach((stat) => {
        stat = toCamelCase(stat)
        if (!_regexes[stat]) _regexes[stat] = regenerate()
        const regen = _regexes[stat]
        // print(range)
        switch (range.length) {
          case 1:
            regen.add(range[0])
            break
          case 2:
            regen.addRange(...range)
            break
        }
      })
    })

  return Object.keys(_regexes).reduce((o, curr) => {
    o[curr] = _regexes[curr].toString()
    return o
  }, {})
}
