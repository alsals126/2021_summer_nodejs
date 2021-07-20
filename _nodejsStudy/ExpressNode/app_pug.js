const express = require('express')
const app = express()

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
    res.send(`아이디는 ${_uid}이고 비밀번호는 ${_upw}입니다.`)
})

app.listen(3000, () => {
    console.log('Running express server at localhost...........')
})