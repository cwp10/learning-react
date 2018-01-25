// 실시간 채팅 서버
// http 서버 생성
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const portNo = 3001
server.listen(portNo, () => {
  console.log('서버 실행 완료:', `http://localhost:` + portNo)
})
// public 디렉토리를 공개합니다.
app.use('/public', express.static('./public'))
app.get('/', (req, res) => { // 루트에 접근하면 /public로 리다이렉트
  res.redirect(302, '/public')
})
// 웹소켓서버를 실행
const socketio = require('socket.io')
const io = socketio.listen(server)
// 클라이언트가 접속했을 때의 이벤트 설정
io.on('connection', (socket) => {
  console.log('사용자 접속:', socket.client.id)
  // 메시지를 받으면
  socket.on('chat-msg', (msg) => {
    console.log('message:', msg)
    // 모든 클라이언트에게 전송
    io.emit('chat-msg', msg)
  })
})
