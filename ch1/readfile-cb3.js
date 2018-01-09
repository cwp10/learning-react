const fs = require('fs')

// a.txt를 읽어 들입니다.
fs.readFile('a.txt', 'utf-8', function (err, data) {
  console.log('a.txt를 읽어 들였습니다.', data)
  // b.txt를 읽어 들입니다.
  fs.readFile('b.txt', 'utf-8', function (err, data) {
    console.log('b.txt를 읽어 들였습니다.', data)
    // c.txt를 읽어 들입니다.
    fs.readFile('c.txt', 'utf-8', function (err, data) {
      console.log('c.txt를 읽어 들였습니다.', data)
    })
  })
})
