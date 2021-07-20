const http = require('http');
// 웹서버 객체 만들기
const server = http.createServer();
// 웹서버 실행
server.listen(3000, () => {
    console.log('Runnig Http Server at localhost.........')
})

// 1. 사용자 접속 이벤트 처리 ( 사용자가 접속했습니다 출력 )
// 객체.on('connection', 콜백함수)
server.on('connection', (socket) => { // socket: 접속한 사용자 정보가 들어있는 객체
    console.log('사용자가 접속했습니다.')
})

// 2. 사용자 요청 이벤트 처리 ( 사용자의 요청이 들어왔습니다 출력 )
server.on('request', (req, res) => {
    console.log('사용자 요청이 들어왔습니다')

    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}) // Header부분에 들어간다.
    res.write("<html><head><title></title><body>")
    res.write("Hello Nodejs~!")
    res.write("</body></html>")

    res.end(); // 응답을 보냄. 호출될 떄 사용자로 응답을 전송합니다.
})