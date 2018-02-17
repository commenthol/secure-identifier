/* eslint no-console: 0 */

const fs = require('fs')
const {promisify} = require('asyncc-promise')
const config = require('./config')
const {toNumber, surrogateES6} = require('./utils')

/**
*/
function template (map) {
  const tmpl = Object.keys(map).map(key => {
    const strMap = JSON.stringify(map[key], null, 2).replace(/[\\]{2}([ux])/g, '\\$1').replace(/"/g, "'")
    return `exports.${key} = ${strMap}`
  }).join('\n') + '\n'
  return tmpl
}

/**
*/
function caseFolding (data) {
  const map = {}

  const typeMap = {
    C: 'common',
    F: 'full',
    S: 'simple',
    T: 'common'
  }

  data.split(/[\r\n]/)
    .filter((line) => !/^\s*#|^\s*$/.test(line))
    .map((line) => {
      let [fromCode, type, toCodes] = line.split(/;/).map(s => s.trim())
      toCodes = toCodes.split(' ')
      fromCode = toNumber(fromCode)
      type = typeMap[type]
      const from = surrogateES6(fromCode)
      const to = toCodes.map((toCode) => surrogateES6(toCode)).join('')
      if (!map[type]) map[type] = {}
      map[type][from] = to
    })
  return {map}
}

/**
*/
function main () {
  return promisify(fs.readFile)(`${config.datadir}/CaseFolding.txt`, 'utf8')
    .then(data => caseFolding(data))
    .then(({map, keys}) => template(map, keys))
    .then(string => promisify(fs.writeFile)(`${config.datadir}/caseFolding.js`, string, 'utf8'))
}

module.exports = main

if (module === require.main) {
  main()
}
