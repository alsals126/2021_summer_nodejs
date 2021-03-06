const express = require('express')
const mysql = require('mysql')
const format = require('date-format')
const moment = require('moment')
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req,res)=>{
    res.send('<h1>Hi mysql & ejs')
})

app.listen(3000, ()=>{
    console.log('Express server running.........')
})