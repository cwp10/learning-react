import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

// 사용자 정보
const users = [
  {id: 1, name: '만철이', info: '개발자'},
  {id: 2, name: 'cwp10', info: '디자이너'},
  {id: 3, name: 'choiwp10', info: '기획자'}
]

// 리엑트 라우터를 사용해 메인 컴포넌트를 정의합니다.
const CustomerApp = () => (
  <Router>
    <div style={{margin: 20}}>
      <Switch>
        <Route path='/user/:id' component={UserCard} />
        <Route component={UserList} />
      </Switch>
    </div>
  </Router>
)

// 사용자 목록을 출력하는 컴포넌트
class UserList extends React.Component {
  render () {
    const ulist = users.map(e => (
      <li key={e.id}>
        <Link to={'/user/' + e.id}>{e.name}</Link>
      </li>
    ))
    return (<ul>{ulist}</ul>)
  }
}

// 사용자 상세 정보를 출력하는 컴포넌트
class UserCard extends React.Component {
  render () {
    const {params} = this.props.match
    const id = parseInt(params.id, 10)
    const user = users.filter(e => e.id === id)[0]
    return (
      <div>
        <div>{id}: {user.name} - {user.info}</div>
        <div><Link to='/'>뒤로가기</Link></div>
      </div>
    )
  }
}

export default CustomerApp;
