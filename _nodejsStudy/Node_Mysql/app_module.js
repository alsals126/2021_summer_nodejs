const express = require('express')
const mysql = require('mysql')
const indexRouter = require('./routes/index')

const app = express()

// 1. mysql 연동
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'mirim',
    database:'testdb',
    port:3306
})
conn.connect()

// 2. 쿼리를 객체로 생성(객체: key-value)
const sql = {
    list: 'select * from emp order by id desc',
    insert: 'insert into emp(name, emp_number, email, reg_date) values(?,?,?,?)',
    read: 'select * from emp where id=?',
    update: 'update emp set name=?, emp_number=?, email=? where id=?',
    delete: 'delete from emp where id=?'
}

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
// 얘가 없으면, post로 전송된 데이터 가져오지 못함.

app.set('view engine', 'ejs')
app.set('views', './views')

app.use('/', indexRouter) // 사용자가 /를 포함하여 /a, /b, /a/b/c....접속했을 때 indexRouter를 실행해라

app.listen(3000, ()=>{
    console.log('Express server running.........')
})