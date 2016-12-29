import { unitTests as App } from 'src/view/App'
import { unitTests as util } from 'src/util'
import { flattenTests, runTests, unitTests as testUtil } from 'src/test/util'

const allUnitTests = [
  App,
  util,
  testUtil
]

export default runTests(flattenTests(allUnitTests))
