import React from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'

// 게시판 입력 양식 컴포넌트를 정의합니다.
class BBSForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      body: ''
    }
  }
  // 텍스트박스의 값이 변경됐을 때 처리
  nameChanged (e) {
    this.setState({name: e.target.value})
  }
  bodyChanged (e) {
    this.setState({body: e.target.value})
  }
  // 웹서버에 글작성하기
  post (e) {
    request
      .get('/api/write')
      .query({
        name: this.state.name,
        body: this.state.body
      })
      .end((err, data) => {
        if (err) {
          console.error(err)
        }
        this.setState({body: ''})
        if (this.props.onPost()) {
          this.props.onPost()
        }
      })
  }
  render () {
    return (
      <div style={style.form}>
        이름:<br />
        <input type='text' value={this.state.name}
          onChange={e => this.nameChanged(e)} /><br />
        본문:<br />
        <input type='text' value={this.state.body} size='60'
          onChange={e => this.bodyChanged(e)} /><br />
        <button onClick={e => this.post()}>전송</button>
      </div>
    )
  }
}

// 메인 컴포넌트를 정의 합니다.
class BBSApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }
  // 컴포넌트가 마운트 되면 로그를 읽어 들입니다.
  componentWillMount () {
    this.loadLogs()
  }
  // API 에 접근해서 게시글 목록을 가져옵니다.
  loadLogs () {
    request
      .get('/api/getItems')
      .end((err, data) => {
        if (err) {
          console.error(err)
          return
        }
        this.setState({items: data.body.logs})
      })
  }
  render () {
    // 게시판 글을 생성합니다.
    const itemsHtml = this.state.items.map(e => (
      <li key={e._id}>{e.name} - {e.body}</li>
    ))
    return (
      <div>
        <h1 style={style.h1}>게시판</h1>
        <BBSForm onPost={e => this.loadLogs()} />
        <p style={style.right}>
          <button onClick={e => this.loadLogs()}>
            다시 불러오기
          </button>
        </p>
        <ul>{itemsHtml}</ul>
      </div>
    )
  }
}

const style = {
  h1: {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 24,
    padding: 12
  },
  form: {
    padding: 12,
    border: '1px solid silver',
    backgroundColor: '#F0F0F0'
  },
  right: {
    textAlign: 'right'
  }
}

// DOM의 내용을 메인 컴포넌트로 변경합니다.
ReactDOM.render(
  <BBSApp />,
  document.getElementById('root')
)
