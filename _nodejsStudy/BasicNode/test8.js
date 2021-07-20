// 웹서버만들기 (4줄짜리)
const http = require('http')
const server = http.createServer()
server.listen(3000, () => {
    console.log('Running Http Server at localhost........')
})

// 사용자 요청 이벤트 처리
// 1. 서버의 응답 lion1.png 출력
// 2. readFile()
// 3. content-type: image/
server.on('connection', (socket) => {
    console.log('사용자가 접속했습니다')
})

const fs = require('fs')

server.on('request', (req, res) => {
    console.log('사용자 요청이 들어왔습니다')

    fs.readFile('lion1.png', function(err, result){
        if(err) {console.log(err)}
        else {
            res.writeHead(200, {"Content-Type": "image/png"})
            res.write(result);
            res.end()
        }
    })
})