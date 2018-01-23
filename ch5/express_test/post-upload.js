// 익스프레스 모듈을 읽어 들입니다.
const express = require('express')
const app = express()

// multer 사용 준비
const multer = require('multer')
const path = require('path')

// 업로드 대상 디렉토리를 지정합니다.
const tmpDir = path.join(__dirname, 'tmp')
const pubDir = path.join(__dirname, 'pub')
const uploader = multer({dest: tmpDir})

// 서버를 실행합니다.
app.listen(3000, () => {
  console.log('서버 실행 완료:', `http://localhost:3000`)
})
// 업로드 양식을 출력합니다.
app.get('/', (req, res) => {
  res.send(
    '<form method="POST" action="/" enctype="multipart/form-data">' +
    '<input type="file" name="aFile" /><br />' +
    '<input type="submit" value="전송">' +
    '</form>'
  )
})
// 정적 파일을 제공합니다.
app.use('/pub', express.static(pubDir))
// 업로드를 받습니다.
app.post('/', uploader.single('aFile'), (req, res) => {
  console.log('파일을 받았습니다.')
  console.log('원본 파일 이름:', req.file.originalname)
  console.log('저장된 경로:', req.file.path)
  // MIME 으로 파일의 형식을 확인합니다.
  if(req.file.mimetype !== 'image/png') {
    res.send('PNG 이미지만 업로드할 수 있습니다.')
    return
  }
  // 파일을 이동합니다.
  const fname = req.file.filename + '.png'
  const des = pubDir + '/' + fname
  const fs = require('fs')
  fs.rename(req.file.path, des)
  // HTML을 출력합니다.
  res.send(
    '다음과 같은 파일이 업로드 됐습니다.<br/>' +
    `<img src="/pub/${fname}" />`
  )
})
