const fs = require('fs')
const {promisify} = require('asyncc-promise')
const config = require('./config')
const {toNumber, surrogateES6} = require('./utils')

/**
*/
function template (map, keys) {
  const strMap = JSON.stringify(map, null, 2).replace(/[\\]{2}([ux])/g, '\\$1').replace(/"/g, "'")
  const tmpl = `exports.map = ${strMap}
`
  return tmpl + '\n'
}

/**
*/
function confusables (data) {
  const map = {}
  const keys = []

  data.split(/[\r\n]/)
    .filter((line) => !/^\s*#|^\s*$/.test(line))
    .map((line) => {
      let [fromCode, toCodes] = line.split(/;/).map(s => s.trim())
      toCodes = toCodes.split(' ')
      fromCode = toNumber(fromCode)

      const from = surrogateES6(fromCode)
      const to = toCodes.map((toCode) => surrogateES6(toCode)).join('')
      map[from] = to
    })
  return {map, keys}
}

/**
*/
function main () {
  return promisify(fs.readFile)(`${config.datadir}/confusables.txt`, 'utf8')
    .then(data => confusables(data))
    .then(({map, keys}) => template(map, keys))
    .then(string => promisify(fs.writeFile)(`${config.datadir}/confusables.js`, string, 'utf8'))
}

module.exports = main

if (module === require.main) {
  main()
    .catch(err => console.error(err))
}
