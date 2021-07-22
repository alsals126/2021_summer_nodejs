const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.static(__dirname + '/public'))
app.set('views', './views')
// 나는 view를 사용하겠다.. 사용하는 템플릿엔진은 views폴더에 저장할거다.
app.set('view engine', 'pug')
// 나는 pug를 사용하겠다.
app.locals.pretty = true; //크롬에서 ctrl+u 했을 때 자동 줄바꿈? 같은 것을 해준다.

app.use(express.urlencoded({extended:true}))
// 응답할 때 객체안에 객체를 넣을 수 있도록 하겠다.

app.get("/", (req, res)=> {
    res.send("hi pug~")
})

app.get("/template", (req,res) => {
    // template으로 접속했을 때(http://localhost:3000/template), temp라는 pug파일이 열리게 할꺼야
    res.render("temp");
})

app.get("/login", (req,res)=>{
    res.render("login_form")
})
app.post("/login", (req, res)=>{
    let _uid = req.body.uid
    let _upw = req.body.upw;

    // 아이디가 kim이고 비밀번호가 1111이면 '환영합니다' 출력
    // 아니면, login 화면으로
    if (_uid=="kim" && _upw==1111)
        res.send(`환영합니다`)
    else{
        res.render("login_form")
    }
})

// ex) http://localhost:3000/temp?name=kim&password=2222로 접속
app.get('/temp', (req,res) => {
    let _id = req.query.name;
    let _pass = req.query.password;
    res.send(`이름은 ${_id}이고 비밀번호는 ${_pass}입니다`)
})

app.get('/memo', (req,res)=> {
    res.render("memo_form")
})
app.post('/memo', (req,res) => {
    const data = {
        _writer: req.body.mwriter,
        _date: req.body.mdate,
        _content: req.body.mcontent
    }

    let addMemo = '작성자: ' + data._writer + '\n' 
            + '날짜: ' + data._date + '\n' 
            + '내용: ' + data._content + '\n' 
            + "================================" + '\n';
    fs.appendFile('memo.txt', addMemo, 'utf8', function(err){
        if(err)
            console.log(err)
        else 
            res.send('메모가 저장되었습니다.')
    })
})

app.listen(3000, () => {
    console.log('Running express server at localhost...........')
})