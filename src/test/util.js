import { entries, identity, noop, unitTests as util } from 'src/util'

const pass = 'pass'
const fail = 'fail'

export const flattenTests = (input = []) => input
  .reduce((memo, { path, tests }) => [
    ...memo,
    ...entries(tests).map(([statement, test]) => ({
      path,
      statement,
      result: recordResult(test)
    }))
  ], [])

export const runTests = (input = []) => Promise
  .all(input.map(({ result }) => result))
  .then(results => input.map(({ path, statement }, index) => ({
    path,
    statement,
    verdict: results[index]
  })))

async function recordResult (test = noop) {
  let verdict = fail

  try {
    if (await test()) {
      verdict = pass
    }
  } catch (error) {
    // verdict is already fail
  }

  return verdict
}

export const unitTests = {
  path: 'src/test/util.js',
  tests: {
    async '`recordResult` returns the correct value when the result is truthy' () {
      const input = () => identity({})
      const output = await recordResult(input)

      return output === pass
    },
    async '`recordResult` returns the correct value when the result is falsy' () {
      const input = () => identity(null)
      const output = await recordResult(input)

      return output === fail
    },
    async '`recordResult` returns the correct value when an error is thrown' () {
      const input = function () { throw new Error() }
      const output = await recordResult(input)

      return output === fail
    },
    '`flattenTests` returns the correct array' () {
      const input = [util]
      const output = flattenTests(input)
      const expected = ['path', 'statement', 'result']

      return output.every(item => expected.every(key => item.hasOwnProperty(key)))
    },
    async '`runTests` returns the correct array' () {
      const input = [
        () => identity({}),
        () => identity(null)
      ]
      const output = await runTests(input)
      const expected = ['path', 'statement', 'verdict']

      return output.every(item => expected.every(key => item.hasOwnProperty(key)))
    }
  }
}
