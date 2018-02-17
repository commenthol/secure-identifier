// from https://www.unicode.org/reports/tr39/

const singleScript = [
  // testcase, symbols, expected
  ['singleScript ljeto', '\u01C9eto', 'ljeto'],
  ['singleScipt mañana', 'man\u0303ana', 'rnan\u0303ana'],
  ['〆切', '\u3006\u5207', '\u3006\u5207'],
  ['ねガ', '\u306D\u30AC', '\u306D\u529B\u3099'],
  // canonical equivalence
  ['Ç', '\u00C7\u0043\u0327', '\u0043\u0326\u0043\u0326'],
  ['q̣', '\u0071\u0323\u0307 \u0071\u0307\u0323', '\u0071\u0323\u0307 \u0071\u0323\u0307'],
  ['Ω', '\u2126 \u03A9', '\u03A9 \u03A9'],
  ['가', '\uAC00 \u1100\u1161', '\u1100\u1161 \u1100\u1161']
]

const mixedScript = [
  // testcase, symbols, expected
  ['mixedScript paypal', 'p\u0430yp\u0430l', 'paypal']
]

const wholeScript = [
  // testcase, symbols, expected
  ['wholeScript latin scope', 'scope', 'scope'],
  ['wholeScript cyrillic scope', '\u0455\u0441\u043E\u0440\u0435', 'scope']
]

const circles = [
  // testcase, symbols, expected
  ['1 Сirсlе', '\x43\x69\x72\x63\x6C\x65', '\u0043\u0069\u0072\u0063\u006C\u0065'],
  ['2 Сirсlе', '\u0043\u0069\u0072\u0063\u006C\u0065', '\u0043\u0069\u0072\u0063\u006C\u0065'],
  ['3 Сirсlе', '\u0043\u0069\u0072\u0063\u006C\u0065', '\u0043\u0069\u0072\u0063\u006C\u0065'],
  ['4 Сirсlе', '\u0421\u0456\u0433\u0441\u04C0\u0435', '\u0043\u0069\u0072\u0063\u006C\u0065'],
  ['5 Сirсlе', '\u0421\u0069\u0072\u0441\u006C\u0435', '\u0043\u0069\u0072\u0063\u006C\u0065'],
  ['6 Circ1e', '\u0043\u0069\u0072\u0063\u0031\u0065', '\u0043\u0069\u0072\u0063\u006C\u0065'],
  ['7 C𝗂𝗋𝖼𝗅𝖾', '\u0043\u{1D5C2}\u{1D5CB}\u{1D5BC}\u{1D5C5}\u{1D5BE}', '\u0043\u0069\u0072\u0063\u006C\u0065'],
  ['8 𝖢𝗂𝗋𝖼𝗅𝖾', '\u{1D5A2}\u{1D5C2}\u{1D5CB}\u{1D5BC}\u{1D5C5}\u{1D5BE}', '\u0043\u0069\u0072\u0063\u006C\u0065']
]

const caseFolding = [
  // content, simple, full
  [ 'Diyarbakır',
    '\u0064\u0069\u0079\u0061\u0072\u0062\u0061\u006B\u0131\u0072',
    '\u0064\u0069\u0079\u0061\u0072\u0062\u0061\u006B\u0131\u0072'],
  [ 'man\u0303ana',
    '\u006D\u0061\u006E\u0303\u0061\u006E\u0061',
    '\u006D\u0061\u006E\u0303\u0061\u006E\u0061'],
  [ 'Straßburg',
    'straßburg',
    'strassburg'],
  // canonical equivalence
  [ 'Ç \u00C7 \u0043\u0327',
    '\u00E7\u0020\u00E7\u0020\u0063\u0327',
    '\u00E7\u0020\u00E7\u0020\u0063\u0327'],
  [ 'q̣̇ \u0071\u0323\u0307 \u0071\u0307\u0323',
    '\u0071\u0323\u0307\u0020\u0071\u0323\u0307\u0020\u0071\u0307\u0323',
    '\u0071\u0323\u0307\u0020\u0071\u0323\u0307\u0020\u0071\u0307\u0323'],
  [ 'Ω \u2126 \u03A9',
    '\u03C9 \u03C9 \u03C9',
    '\u03C9 \u03C9 \u03C9'],
  [ '가 \uAC00 \u1100\u1161',
    '\uAC00\u0020\uAC00\u0020\u1100\u1161',
    '\uAC00\u0020\uAC00\u0020\u1100\u1161']
]

module.exports = {
  singleScript,
  mixedScript,
  wholeScript,
  circles,
  caseFolding
}
