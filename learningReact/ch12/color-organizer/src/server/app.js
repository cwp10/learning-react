import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
import storeFactory from '../store';
import initialState from '../../data/initialState.json'
import { compose } from 'redux'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import api from './color-api'

const staticCSS = fs.readFileSync(
  path.join(__dirname, '../../dist/assets/bundle.css')
)

const fileAssets = express.static(
  path.join(__dirname, '../../dist/assets')
)

const serverStore = storeFactory(true, initialState)

serverStore.subscribe(() =>
  fs.writeFile(
    path.join(__dirname, '../../data/initialState.json'),
    JSON.stringify(serverStore.getState()),
    error => (error) ? console.log("상태 저장 오류!", error) : null
  )
)

const buildHTMLPage = ({ html, state, css }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
      <meta charset="utf-8">
      <title>Universal Color Organizer</title>
      <style>${staticCSS}</style>
    </head>
    <body>
      <div id="react-container">${html}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(state)}
      </script>
      <script src="/bundle.js"></script>
    </body>
  </html>
  `

const renderComponentsToHTML = ({ url, store }) =>
  ({
    state: store.getState(),
    html: renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    )
  })

const makeClientStoreFrom = store => url =>
  ({
    url,
    store: storeFactory(false, store.getState())
  })

const htmlResponse = compose(
  buildHTMLPage,
  renderComponentsToHTML,
  makeClientStoreFrom(serverStore)
)

const logger = (req, res, next) => {
  console.log(`'${req.url}'에 대한 ${req.method} 요청`)
  next()
}

const respond = ({ url }, res) =>
  res.status(200).send(
    htmlResponse(url)
  )

/*const respond = ({url}, res) =>
  res.status(200).send(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>유니버셜 색 관리 앱</title>
    </head>
    <body>
      <div id="react-container">ready...</div>
    </body>
  </html>
  `)*/

const addStoreToRequestPipeline = (req, res, next) => {
  req.store = serverStore
  next()
}

export default express()
  .use(bodyParser.json())
  .use(logger)
  .use(fileAssets)
  .use(addStoreToRequestPipeline)
  .use('/api', api)
  .use(respond)