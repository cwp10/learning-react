// 모듈을 읽어 들입니다.
const request = require('superagent')

// 지정한 URL 에서 데이터를 추출합니다
const URL = 'http://localhost:3000/fruits.json'
request.get(URL).end(callbackGet)

// 데이터를 추출했을 때의 처리
function callbackGet (err, res) {
  if (err) {
    // 추출하지 못했을 때 처리
    return
  }
  console.log(res.body)
}
