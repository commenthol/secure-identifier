const {map} = require('../data/confusables')

module.exports = function confusables (string) {
  return (string || '')
    .normalize('NFD')
    .replace(/./ug, (m) => map[m] || m)
}
