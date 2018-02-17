const assert = require('assert')
const log = require('debug')('test:Identifier')
const {Identifier, Reserved} = require('..')
const {decode, deepEqual} = require('./support')

describe('Identifier', function () {
  // a new list of reserved words
  const reserved = new Reserved([
    'equals',
    'starts*', // a startsWith rule
    '*contains*', // a contains rule
    '*ends', // an endsWith rule
    /^regex/ // a regex
  ])

  const fixtures = [
    [ 'equals', undefined ],
    [ '-equals', '-equals' ],
    [ 'equals-', 'equals-' ],
    [ '-equals-', '-equals-' ],
    [ 'starts', undefined ],
    [ '-starts', '-starts' ],
    [ 'starts-', undefined ],
    [ '-starts-', '-starts-' ],
    [ 'contains', undefined ],
    [ '-contains', undefined ],
    [ 'contains-', undefined ],
    [ '-contains-', undefined ],
    [ 'ends', undefined ],
    [ '-ends', undefined ],
    [ 'ends-', 'ends-' ],
    [ '-ends-', '-ends-' ],
    [ 'regex', undefined ],
    [ '-regex', '-regex' ],
    [ 'regex-', undefined ],
    [ '-regex-', '-regex-' ]
  ]

  fixtures.forEach((test, i) => {
    const [string, exp] = test
    it(`${string} → ${exp}`, function () {
      const res = new Identifier(string, {reserved}).secure().valid()
      log(string, res, decode(res))
      deepEqual(res, exp)
    })
  })

  it('should call secure if checking for reserved names', function () {
    const res = new Identifier('abuse').isReserved()
    assert.strictEqual(res, true)
  })
})

describe('Reserved', function () {
  it('should throw if not of type String or RegExp', function () {
    assert.throws(() => {
      new Reserved([{}]) // eslint-disable-line no-new
    }, /not String or RegExp/)
  })
})
