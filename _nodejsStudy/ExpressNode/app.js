const express = require('express')
const app = express()

//app.use(express.static('public'))
// static이라는 미들웨어를 사용해 public을 /로 지정하는 예

//app.use('public', express.static('public'))
// localhost:300/public이 /가 된다.
app.use(express.static(__dirname + '/public')) //가장 많이 쓰인다.
console.log('__dirname', __dirname)

app.listen(3000, ()=> {
    console.log('Running express server at localhost.......')
})