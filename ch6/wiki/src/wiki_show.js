import React, {Component} from 'react'
import request from 'superagent'
import WikiParser from './wiki_parser'
import styles from './styles'

// 위키 메인 화면 컴포넌트
class WikiShow extends React.Component {
  // 컴포넌트 초기화
  constructor (props) {
    super(props)
    const {params} = this.props.match
    const name = params.name
    this.state = {
      name: params.name, body: '', loaded: false
    }
  }
  // 위치 내용 읽어 들이기
  componentWillMount () {
    request
      .get(`/api/get/${this.state.name}`)
      .end((err, res) => {
        if (err) return
        this.setState({
          body: res.body.data.body,
          loaded: true
        })
      })
  }
  // 화면 출력 처리
  render () {
    if (!this.state.loaded) {
      return (<p>읽어 들이는 중</p>)
    }
    const name = this.state.name
    const body = this.state.body
    const html = this.convertText(body)
    return (
      <div>
        <h1>{this.state.name}</h1>
        <div style={styles.show}>
          {html}
        </div>
        <p style={styles.right}>
          <a href={`/edit/${name}`}>→페이지 수정하기</a>
        </p>
      </div>
    )
  }
  // 위키 문법을 리액트 객체로 변환
  convertText (src) {
    // 위키 문법을 파서로 파싱
    const nodes = WikiParser.parse(src)
    // 각 요소를 React 객체로 변환
    const lines = nodes.map((e, i) => {
      if (e.tag === 'ul') { // 리스트
        const lis = e.items.map(
          (s, j) => <li key={`node${i}_${j}`}>{s}</li>
        )
        return <ul key={`node${i}`}>{lis}</ul>
      }
      if (e.tag === 'a') {
        return (
          <div key={`node${i}`}>
            <a href={`/wiki/${e.label}`}>→{e.label}</a>
          </div>
        )
      }
      return React.createElement(
        e.tag, {key: 'node' + i}, e.label)
    })
    return lines
  }
}
export default WikiShow
