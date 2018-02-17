
const config = {
  datadir: `${__dirname}/../data`,
  urls: {
    'http://www.unicode.org/Public/security/latest': [
      'confusables.txt',
      'IdentifierStatus.txt'
    ],
    'https://www.unicode.org/Public/UCD/latest/ucd': [
      'CaseFolding.txt'
    ]
  }
}

module.exports = config
