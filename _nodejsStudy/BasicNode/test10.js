// express server 만들기
const express = require('express')
const app = express()

app.use((req, res, next) => {
    // req: 요청객체, res: 응답객체, next: 다음 미들웨어 호출
    console.log('첫번째 미들웨어')
    req.user = 'kim'
    next()
})
app.use((req, res) => {
    console.log('두번째 미들웨어')
    // res.send() 여러번 쓰는 거 안됨 (header 에러 난다.)
    //res.send('서버에서 응답한 결과: ' + req.user)

    // JSON : 자바스크립트에서 데이터를 주고받는 형식
    const person = {name: 'kim', age: 35}
    const person2 = JSON.stringify(person) // JSON형식을 문자열로 바꿈
    res.send(person2)

    // 문자열을 JSON 형식으로 : JSON.parse()
})

app.listen(3000, () => {
    console.log("Running express server at 127.0.0.1......")
})
