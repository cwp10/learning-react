import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import storeFactory from './store'
import { Provider } from 'react-redux'

const store = storeFactory()

window.React = React
window.store = store

const render = () =>
  ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>,
    document.getElementById('react-container')
  )

render()
