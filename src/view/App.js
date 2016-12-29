import React, { PureComponent } from 'react'

class App extends PureComponent {
  render () {
    return (
      <main>
        <h1>{'Yahari'}</h1>
        <p>{'Unit testing for ES2015 modules'}</p>
        <p>{`available width: ${getWidth()}`}</p>
      </main>
    )
  }
}

function getWidth () {
  return window.screen.availWidth
}

export default App

/* Tests */

export const unitTests = {
  path: 'src/view/App.js',
  tests: {
    '`render` returns a React element' () {
      const output = React.createElement(App)

      return React.isValidElement(output)
    },

    '`getWidth` returns an integer' () {
      const output = getWidth()

      return isFinite(output)
    }
  }
}
