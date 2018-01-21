import React from 'react'
import ReactDOM from 'react-dom'

class TextForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '' }
  }
  render () {
    // 입력 양식에 텍스트박스를 지정합니다.
    return (
      <div>
        <form onSubmit={e => this.doSubmit(e)}>
          <input
            type='text'
            onChange={e => this.doChange(e)}
            value={this.state.value} />
          <input type='submit'/>
        </form>
      </div>
    )
  }
  // 텍스트 박스를 변경했을대
  doChange (e) {
    this.setState({value: e.target.value})
  }
  // 입력 양식을 전송했을 때
  doSubmit (e) {
    e.preventDefault()
    window.alert(this.state.value)
  }
}

ReactDOM.render(
  <TextForm />,
  document.getElementById('root')
)
