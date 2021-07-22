const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())
console.log('__dirname', __dirname)

app.set('views', './views')
app.set('view engine', 'pug')

app.locals.pretty = true;

app.use(express.urlencoded({extended:true}))
app.get('/', (req,res)=>{
    res.send('hi')
})

app.get('/cookie', (req, res)=>{
    res.render('cookie_form')
})
app.post('/cookie', (req,res)=>{
    var _id = req.body.uid;
    console.log(_id)
    res.cookie("userId", _id)
    res.send("쿠키 설정완료")
})

app.listen(3000, ()=>{
    console.log('Running express server at localhost...........')
})