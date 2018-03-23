import {Component} from 'react'
import {v4} from 'uuid'
import AddColorForm from './AddColorForm'
import ColorList from './ColorList'
import '../../stylesheets/App.scss'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      colors: [
        {
          "id": "0175d1f0-a8c6-41bf-8d02-df5734d829a4",
          "title": "해질녘 바다",
          "color": "#00c4e2",
          "rating": 5
        },
        {
          "id": "83c7ba2f-7392-4d7d-9e23-35adbe186046",
          "title": "잔디",
          "color": "#26ac56",
          "rating": 3
        },
        {
          "id": "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",
          "title": "밝은 빨강",
          "color": "#ff0000",
          "rating": 0
        }
      ]
    }
    this.addColor = this.addColor.bind(this)
    this.rateColor = this.rateColor.bind(this)
    this.removeColor = this.removeColor.bind(this)
  }

  addColor (title, color) {
    const colors = [
      ...this.state.colors,
      {
        id: v4(),
        title,
        color,
        rating: 0
      }
    ]
    this.setState({colors})
  }

  rateColor (id, rating) {
    const colors = this.state.colors.map(color =>
      (color.id !== id) ?
        color: {
          ...color,
          rating
        }
    )
    this.setState({colors})
  }

  removeColor (id) {
    const colors = this.state.colors.filter(
      color => color.id !== id
    )
    this.setState({colors})
  }

  render () {
    const {addColor, rateColor, removeColor} = this
    const {colors} = this.state
    return (
      <div className="app">
        <AddColorForm onNewColor={addColor} />
        <ColorList colors={colors}
                   onRate={rateColor} 
                   onRemove={removeColor} />
      </div>
    )
  }
}

export default App