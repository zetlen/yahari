import mockData from 'src/test/mock'

export function noop () {
  // noop
}

export function identity (object) {
  return object
}

export function entries (object = {}) {
  return Object
    .keys(object)
    .map(key => [key, object[key]])
}

/* Tests */

export const unitTests = {
  path: 'src/util/index.js',
  tests: {
    '`noop` returns `undefined`' () {
      const output = noop()

      return output === void 0
    },

    '`identity` returns the first argument' () {
      const input = mockData.object.numbers
      const output = identity(input)

      return output === input
    },

    '`identity` returns `undefined`, given no arguments' () {
      const output = identity()

      return output === void 0
    },

    '`entries` returns the correct array, given a valid object' () {
      const input = mockData.object.numbers
      const output = entries(input)

      return [
        Array.isArray(output),
        (output[0][0] === 'one'),
        (output[1][1] === 2)
      ].every(identity)
    },

    '`entries` returns the correct array, given no arguments' () {
      const output = entries()

      return Array.isArray(output) && output.length === 0
    }
  }
}
