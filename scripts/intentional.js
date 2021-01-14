const fs = require('fs')
const { promisify } = require('asyncc-promise')
const config = require('./config')
const regenerate = require('regenerate')
const { toNumber, surrogateES6 } = require('./utils')

function template (map, regex) {
  const strMap = JSON.stringify(map, null, 2).replace(/[\\]{2}([ux])/g, '\\$1').replace(/"/g, "'")
  const tmpl = `exports.map = ${strMap}
exports.regex = /${regex}/
`
  return tmpl
}

function intentional (data) {
  const _map = {}
  const _regex = regenerate()

  data.split(/[\r\n]/)
    .filter((line) => !/^\s*#|^\s*$/.test(line))
    .forEach((line) => {
      let [fromCode, toCode] = line.split(/[;#]/).map(s => s.trim())
      fromCode = toNumber(fromCode)
      toCode = toNumber(toCode)

      const from = surrogateES6(fromCode)
      const to = surrogateES6(toCode)
      _map[to] = from // put reverse as we want to normalize to less intentional
      _regex.add(toCode)
    })

  const map = Object.keys(_map).sort().reduce((o, curr) => {
    o[curr] = _map[curr]
    return o
  }, {})
  const regex = _regex.toString()
  return { map, regex }
}

function main () {
  return promisify(fs.readFile)(`${config.datadir}/intentional.txt`, 'utf8')
    .then(data => intentional(data))
    .then(({ map, regex }) => template(map, regex))
    .then(string => promisify(fs.writeFile)(`${config.datadir}/intentional.js`, string, 'utf8'))
}

module.exports = main

if (module === require.main) {
  main()
    .catch(err => console.error(err))
}
