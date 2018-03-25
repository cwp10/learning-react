import { Menu, NewColor, Colors } from './containers'
import '../../stylesheets/App.scss'

const App = () =>
  <div className="app">
    <Menu />
    <NewColor />
    <Colors />
  </div>

export default App