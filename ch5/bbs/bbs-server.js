// 게시판 애플리케이션의 웹 서버
// 데이터베이스에 접속합니다.
const NeDB = require('nedb')
const path = require('path')

const db = new NeDB({
  filename: path.join(__dirname, 'bbs.db'),
  autoload: true
})

// 서버를 실행합니다.
const express = require('express')
const app = express()
const portNo = 3001
app.listen(portNo, () => {
  console.log('서버 실행 완료:', `http://localhost:${portNo}`)
})

// public 디렉토리의 내용을 자동으로 응답합니다.
app.use('/public', express.static('./public'))
// 최상위 페이지에 접속하면 /public 으로 리다이렉트 합니다.
app.get('/', (req, res) => {
  res.redirect(302, '/public')
})

// API를 정의합니다.
// 로그 추출 API
app.get('/api/getItems', (req, res) => {
  // 데이터 베이스에 저장되어 있는 데이터를 시간 순서로 정렬해서 응답합니다.
  db.find({}).sort({stime: 1}).exec((err, data) => {
    if (err) {
      sendJSON(res, false, {logs: [], msg: err})
      return
    }
    console.log(data)
    sendJSON(res, true, {logs: data})
  })
})

// 로그 작성 API
app.get('/api/write', (req, res) => {
  const q = req.query
  // URL 매개변수로 받은 값을 DB에 저장합니다.
  db.insert({
    name: q.name,
    body: q.body,
    stime: (new Date()).getTime()
  }, (err, doc) => {
    if (err) {
      console.error(err)
      sendJSON(res, false, {msg: err})
      return
    }
    sendJSON(res, true, {id: doc._id})
  })
})

function sendJSON (res, result, obj) {
  obj['result'] = result
  res.json(obj)
}
