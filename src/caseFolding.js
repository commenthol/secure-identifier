const map = require('../data/caseFolding')

const CASEFOLD_SIMPLE = 'simple'
const CASEFOLD_FULL = 'full'

module.exports = {
  caseFolding,
  CASEFOLD_SIMPLE,
  CASEFOLD_FULL
}

function caseFolding (string, type) {
  type = map[type] ? type : CASEFOLD_FULL
  return (string || '')
    .replace(/./ug, (m) => map.common[m] || map[type][m] || m)
}
