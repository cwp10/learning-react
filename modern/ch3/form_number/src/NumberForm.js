import React, {Component} from 'react'

// 숫자 입력 컴포넌트
export default class NumberForm extends Component {
  constructor (props) {
    super(props)
    // 상태를 초기화 합니다.
    this.state = {value: ''}
  }
  // 값이 변경되었을 때
  doChange (e) {
    const curValue = e.target.value
    // 숫자 이외의 값을 제거합니다.
    const newValue = curValue.replace(/[^0-9]/g, '')
    this.setState({value: newValue})
  }
  // 전송 버튼을 눌렀을 때
  doSubmit (e) {
    window.alert ('전송: ' + this.state.value)
    e.preventDefault()
  }
  // 화면 렌더링
  render () {
    // 이벤트를 메서드에 바이딩합니다.
    const doSubmit = (e) => this.doSubmit(e)
    const doChange = (e) => this.doChange(e)
    return (
      <form onSubmit={doSubmit}>
        <input type='text'value={this.state.value} onChange={doChange}/>
        <input type='submit' value='전송'/>
      </form>
    )
  }
}
