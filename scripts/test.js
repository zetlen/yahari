const results = require('../dist/tests.js').default

const increment = (map, prop, amount) => map
  .set(prop, amount + (map.get(prop) || 0))

const groupResults = values => values
  .reduce((memo, { path, statement, verdict }) => {
    const results = memo.has(path) ? memo.get(path) : []

    memo.set(path, [...results, { statement, verdict }])

    return memo
  }, new Map())

const tallyResults = values => [...values]
  .reduce((appScore, [path, results]) => {
    console.log(`module: ${path} | tests: ${results.length}`)

    const moduleScore = results
      .reduce((memo, { statement, verdict }) => {
        console.log(`  ${verdict}: ${statement}`)

        return increment(memo, verdict, 1)
      }, new Map())

    const pass = moduleScore.get('pass') || 0
    const fail = moduleScore.get('fail') || 0

    console.log(`results: ${pass + fail} | pass: ${pass} | fail: ${fail}\n`)

    for (const verdict of moduleScore) {
      increment(appScore, verdict[0], verdict[1])
    }

    return appScore
  }, new Map())

const logResults = score => {
  const pass = score.get('pass') || 0
  const fail = score.get('fail') || 0

  console.log(`overall: ${pass + fail} | pass: ${pass} | fail: ${fail}`)

  return score
}

results
  .then(groupResults)
  .then(tallyResults)
  .then(logResults)
  .catch(error => { console.error(error) })
