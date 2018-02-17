# secure-identifier

> secure identifier for usernames

[![NPM version](https://badge.fury.io/js/secure-identifier.svg)](https://www.npmjs.com/package/secure-identifier/)
[![Build Status](https://secure.travis-ci.org/commenthol/secure-identifier.svg?branch=master)](https://travis-ci.org/commenthol/secure-identifier)

Generates a unique and secure identifier for usernames, login-IDs, public-IDs and accounts by:

1. Normalizing confusable chars from [Unicode Security Mechanisms TR39][]
2. Perform case-folding according to [5.18 Case Mappings - Unicode 10.0](http://www.unicode.org/versions/Unicode10.0.0/ch05.pdf)
3. Check for allowed symbols in accordance with [Unicode Security Mechanisms TR39][]
4. Check length of input - default is (min: 2 chars, max: 60 chars)
5. Check the sanitized string against a list of reserved words
6. Only if all checks pass, the secured identifier is returned

This secure identifier shall be stored alongside the username/ loginId to ensure uniqueness amongst the whole set.

## Further reading...

For the complexity of a valid username I recommend [Let’s talk about usernames][] which also inspired me for this project.
To read about where to use such identifier check [The Tripartite Identity Pattern][].

## Usage

```js
const {secureIdentifier} = require('secure-identifier')

const username = '\u{1D5A2}\u{1D5C2}\u{1D5CB}\u{1D5BC}\u{1D5C5}\u{1D5BE}'
//> 𝖢𝗂𝗋𝖼𝗅𝖾 - looks like Circle but isn`t
const secure = secureIdentifier(username)
//> secure === 'circle'
```

## API

Apart from the simple `secureIdentifier` you can use `Identifier` for mor advanced use-cases.

```js
const {Identifier} = require('secure-identifier')

const username = ' Аᖯ𝗎𝗌е'
const opts = {minLength: 3, maxLength: 20}
const ident = new Identifier(username, opts)
  ident.confusables().trim()
    //> 'Abuse'
    .caseFolding()
    //> 'abuse'

  ident.status() // get list of offending chars
  //> []
  ident.isReserved() // 'abuse' is in the list of reserved names
  //> true
  ident.isValid()
  //> false
  ident.isMinLength() // check for minLength >= 3
  //> true
  ident.isMaxLength() // check for maxLength <= 20
  //> true
  ident.toString() // get current string
  //> 'abuse'
  ident.valid() // get valid string
  //> undefined
```

Please check out `./src/Identifier.js` and `./src/IdentifierBase.js` for further methods.

It is also possible to use your own list of reserved words. See `./test/Identifier.spec.js`

## License

[MIT](./LICENSE.md) licensed

## References

- [Unicode Security Mechanisms TR39][]
- [Let’s talk about usernames][]
- [The Tripartite Identity Pattern][]
- [JavaScript has a Unicode problem][]

Reserved-names-lists are from:

- https://ldpreload.com/blog/names-to-reserve
- https://zimbatm.github.io/hostnames-and-usernames-to-reserve/
- http://blog.postbit.com/reserved-username-list.html
- http://www.bannedwordlist.com/lists/swearWords.txt

[Unicode Security Mechanisms TR39]: https://www.unicode.org/reports/tr39/
[Let’s talk about usernames]: https://www.b-list.org/weblog/2018/feb/11/usernames/
[The Tripartite Identity Pattern]: http://habitatchronicles.com/2008/10/the-tripartite-identity-pattern/
[JavaScript has a Unicode problem]: https://mathiasbynens.be/notes/javascript-unicode
