import React from 'react'
import { hydrate } from 'react-dom'
import App from './components/App'
import storeFactory from './store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const store = storeFactory(false, window.__INITIAL_STATE__)

window.React = React
window.store = store


hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-container')
)


