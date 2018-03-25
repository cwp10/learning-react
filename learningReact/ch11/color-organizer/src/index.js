import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import storeFactory from './store'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

const store = storeFactory()

window.React = React
window.store = store

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>,
    document.getElementById('react-container')
  )

render()
