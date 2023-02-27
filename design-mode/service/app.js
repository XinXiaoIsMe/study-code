const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()

//设置跨域访问（设置在所有的请求前面即可）
app.all("*", function (req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*")
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "content-type")
	//跨域允许的请求方式 
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
	next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

app.listen(3000, () => {
  console.log('listening 3000...')
})
