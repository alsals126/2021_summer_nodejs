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

app.get('/session', (req,res)=>{
    req.session.uid=1;
    res.send('session created!!')
})

app.get('/result', (req,res)=>{
    res.send('session: '+ req.session.uid)
})

app.listen(3000, ()=>{
    console.log('Running express server at localhost...........')
})