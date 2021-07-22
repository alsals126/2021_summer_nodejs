const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
var session = require('express-session')

app.use(cookieParser())
console.log('__dirname', __dirname)

app.set('views', './views')
app.set('view engine', 'pug')

app.use(session({
    secret: 'keyboard cat', //sid를 브라우저에 저장할 떄 랜덤하게 해주는 것
    resvae: false, //사용자가 접속할 때마다 세션아이디를 새로 발급하느냐 아니냐를 결정하는 것
    saveUninitialized:true //사용자가 접속해서 세션을 사용전까지는 sid를 발급하지 말아라
}))

app.locals.pretty = true;

app.use(express.urlencoded({extended:true}))
app.get('/', (req,res)=>{
    res.send('hi')
})

const user = {
    user_id: 'kim',
    user_pw: 1111
}

app.get('/welcome', (req,res)=>{
    //로그인이 되어 있다는 것==== req.session.nickname에 값이 있다.
    // res.send(req.session)
    if(req.session.nickName){ //로그인되어 있는 사용자라면 로그아웃 정보까지
        res.send(`hello ${req.session.nickName}
        <a href="/logout">Logout</a>`)
    }else{ //로그인에 실패 또는 로그인되어있지 않은 사용자
        res.send(`welcome        <a href="/login">LogIn</a>`)
    }
})

app.get('/login', (req,res)=>{
    res.render('login_form')
})
app.post('/login', (req,res)=>{
    let _uid = req.body.uid;
    let _upw = req.body.upw;

    if(_uid==user.user_id && _upw==user.user_pw){
        //sessionid의 nickNam이란 이름으로 mike를 저장한다.
        req.session.nickName='mike'
        res.redirect('/welcome')
    }else{
        res.send('로그인이 맞지 않습니다 <a href="/login">Login</a>')
    }
})

app.get('/logout',(req, res)=>{
    delete req.session.nickName;
    res.redirect('/welcome')
})

app.listen(3000, ()=>{
    console.log('Running express server at localhost...........')
})