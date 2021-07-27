const express = require('express')
const mongoose = require('mongoose')

// 1. 접속주소와 db이름 세팅
mongoose.connect('mongodb://localhost:27017/data', {userNewUrlParser:true, userUnifiedTopology:true})

// 2. db 연결
const db = mongoose.connection

// 3. event 이용하여 접속
db.on('err', ()=>{
    console.log('connection failed')
})
db.once('open', ()=>{
    console.log('connected')
})

const app = express()
app.use(express.static(__dirname + '/public'))
app.set('views', './views')
app.set('view engine', 'pug')

app.locals.pretty = true;

app.use(express.urlencoded({extended:true}))

const loginTest = mongoose.Schema({
    id: String,
    pw: String,
    name: String,
    age: Number
})

var LoginTest = mongoose.model('login', loginTest)

app.get("/", (req, res)=> {
    let output=`    
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <h1>Register with Mongo & Pug</h1>
                <ul>
                    <li><a href='/'>목록보기</a></li>
                    <li><a href='/regis'>가입하기</a></li>
                    <li><a href='/'>로그인하기</a></li>
                </ul>
            </body>
        </html> `;
    res.send(output);
})

app.get("/regis", (req, res)=> {
    res.render("register")
})
app.post("/regis", (req, res)=>{
    const _id = req.body.id;
    const _pw = req.body.pw;
    const _name = req.body.name;
    const _age = req.body.age;

    new LoginTest({id:_id, pw:_pw, name:_name, age:Number(_age)}).save((err, date)=>{
        if(err) console.log(err)
        else {
            console.log('Saved!!!')
            res.render('/')
        }
    })
})

app.get("/login", (req,res)=>{
    res.render('login_view')
})
app.post("/login", (req,res)=>{
    res.render('login_view')
})

app.listen(3000, () => {
    console.log('Running express server at localhost...........')
})