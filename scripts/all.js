/* eslint no-console: 0 */

const download = require('./download')
const caseFolding = require('./caseFolding')
const confusables = require('./confusables')
const identifierStatus = require('./identifierStatus')

const argv = process.argv.slice(2)

Promise.resolve()
  .then(() => {
    if (argv.includes('--no-download')) return
    return download()
  })
  .then(() => confusables())
  .then(() => identifierStatus())
  .then(() => caseFolding())
  .then(() => console.log('... done'))
  .catch((err) => console.error(err))
