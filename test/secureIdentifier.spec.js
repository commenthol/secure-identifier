const log = require('debug')('test:secureIdentifier')
const {secureIdentifier} = require('..')
const {decode, deepEqual} = require('./support')

const fixtures = [
  [ 'Diyarbakır',
    'diyarbakir' ],
  [ 'man\u0303ana',
    'rna\u00F1ana' ],
  [ 'Man\u0303ana',
    'ma\u00F1ana' ],
  [ 'Sträßbu\u0308rg',
    'str\u00E4ssb\u00FCrg' ],
  // canonical equivalence
  [ 'Ç \u00C7 \u0043\u0327',
    '\u0063\u0326-\u0063\u0326-\u0063\u0326' ],
  [ 'q̣̇ \u0071\u0323\u0307 \u0071\u0307\u0323',
    '\u0071\u0323\u0307-\u0071\u0323\u0307-\u0071\u0323\u0307' ],
  [ 'Ω \u2126 \u03A9',
    '\u03C9-\u03C9-\u03C9' ],
  [ '가 \uAC00 \u1100\u1161',
    '\uAC00-\uAC00-\uAC00' ],
  [ '\x43\x69\x72\x63\x6C\x65',
    'circle' ],
  [ '\u0043\u0069\u0072\u0063\u006C\u0065',
    'circle' ],
  [ '\u0043\u0069\u0072\u0063\u006C\u0065',
    'circle' ],
  [ '\u0421\u0456\u0433\u0441\u04C0\u0435',
    'circle' ],
  [ '\u0421\u0069\u0072\u0441\u006C\u0435',
    'circle' ],
  [ '\u0043\u0069\u0072\u0063\u0031\u0065',
    'circle' ],
  [ '\u0043\u{1D5C2}\u{1D5CB}\u{1D5BC}\u{1D5C5}\u{1D5BE}',
    'circle' ],
  [ '\u{1D5A2}\u{1D5C2}\u{1D5CB}\u{1D5BC}\u{1D5C5}\u{1D5BE}',
    'circle' ],
  [ 'postmaster', // reserved word
    undefined ],
  [ 'post@master', // @ not allowed char
    undefined ],
  [ 'post&master', // & not allowed char
    undefined ],
  [ 'post=master', // & not allowed char
    undefined ],
  [ 'post+master', // + not allowed char
    undefined ],
  [ 'post,master', // , not allowed char
    undefined ],
  [ 'post.ma.ster',
    'post.rna.ster' ],
  [ 'post..master', // not more than two dots
    undefined ],
  [ 'post...master', // not more than two dots
    undefined ],
  [ 'post  ma ster', // not more than two spaces
    undefined ],
  [ '.well-known',
    undefined ],
  [ '.well-knownsomething',
    undefined ]
]

describe('secureIdentifier', function () {
  fixtures.forEach((test, i) => {
    const [string, exp] = test
    it(`${string} → ${exp}`, function () {
      const res = secureIdentifier(string)
      log(string, res, decode(res))
      deepEqual(res, exp)
    })
  })
})
