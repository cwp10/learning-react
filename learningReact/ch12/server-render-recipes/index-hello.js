import express from 'express'

const logger = (req, res, next) => {
  console.log(`'${req.url}'에 대한 ${req.method} 요청`)
  next()
}

const sayHello = (req, res) => 
  res.status(200).send("<h1>Hello World</h1>")

const app = express()
  .use(logger)
  .use(sayHello)

app.listen(3000, ()=>
  console.log(`'http://localhost:3000'에서 조리법 앱 작동 중`)
)