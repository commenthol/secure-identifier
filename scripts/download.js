const fs = require('fs')
const request = require('superagent')
const { eachLimit } = require('asyncc-promise')
const config = require('./config')

function download (url, file, datadir) {
  const uri = `${url}/${file}`
  return new Promise((resolve, reject) => {
    console.log('... downloading ' + uri)
    const req = request // superagent does not return a real Promise ...  so sad
      .get(uri)
      .pipe(fs.createWriteStream(`${datadir}/${file}`))
    req.on('error', (err) => reject(err))
    req.on('finish', () => resolve())
  })
}

function main () {
  const urlFiles = Object.keys(config.urls).reduce((a, url) => {
    return a.concat(config.urls[url].map(file => [url, file]))
  }, [])

  return eachLimit(3, urlFiles, ([url, file]) => download(url, file, config.datadir))
}

module.exports = main

if (module === require.main) {
  main()
    .catch(err => console.error(err))
}
