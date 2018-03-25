const fs = require('fs')
const {promisify} = require('asyncc-promise')
const {identifier, identifierTemplate} = require('./utils')
const config = require('./config')

function main () {
  return promisify(fs.readFile)(`${config.datadir}/IdentifierStatus.txt`, 'utf8')
    .then(data => identifier(data))
    .then((regexes) => identifierTemplate(regexes))
    .then(string => promisify(fs.writeFile)(`${config.datadir}/identifierStatus.js`, string, 'utf8'))
}

module.exports = main

if (module === require.main) {
  main()
    .catch(err => console.error(err))
}
