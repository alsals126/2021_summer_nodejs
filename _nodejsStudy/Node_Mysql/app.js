const express = require('express')
const mysql = require('mysql')
const format = require('date-format')
const moment = require('moment')
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")

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

// 날짜 포맷 지정
moment().format('YYYY-MM-DD HH:mm:ss')
// 3. 목록보기
app.get('/', (req,res)=>{
    // emp에서 데이터를 모두 가지고 와야함. 
    // conn.query(쿼리문, [지정할 값], cb)
    conn.query(sql.list, (err, rows)=>{ // rows: 배열
        if(err) console.log(err)
        else{
            console.dir(rows)
            res.render('list', {lists:rows}) // list.ejs (lists)
        }
    })
})

// 4. 데이터 추가
app.get('/new', (req, res)=>{
    res.render('new')
})
app.post('/new', (req,res)=>{
    // 사용자가 입력한 값 가지고 오기
    const _name = req.body.name;
    const _emp_number = req.body.emp_number;
    const _email = req.body.email;
    const _joinDate = date;
    // console.log(`${_name}, ${_emp_number}, ${_email}, ${_joinDate})

    // conn.query(쿼리문, [지정할 값], cb(콜백함수))
    conn.query(sql.insert, [_name, _emp_number, _email, _joinDate], (err)=>{
        if(err) console.log(err)
        else{
            console.log("Inserted!!!!")
            res.redirect('/')
        }
    })
})

// 5. 내용보기
app.get('/read/:id', (req, res)=>{
    const paramID = req.params.id
    
    // select는 결과값이 있기 때문에 콜백함수에 매개변수가 2개가 있다
    conn.query(sql.read, [paramID], (err, rows)=>{
        if(err) console.log(err)
        else {
            console.log(rows)
            console.dir(rows)
            res.render('read', {title: '내용보기', rowsX:rows[0]})
        }
    })
})

// 6. 수정하기 폼
app.get('/edit/:id', (req,res)=>{
    const paramId= req.params.id;
    conn.query(sql.read,[paramId],(err,data)=>{
        if(err) console.log(err);
        else{
            res.render("edit",{datas:data[0]});
        }
    })
})
// 7. 수정하기
app.post('/edit/:id', (req,res)=>{
    const paramID = req.params.id;
    const name = req.body.name;
    const emp_number = req.body.emp_number;
    const email = req.body.email;

    conn.query(sql.update, [name, emp_number, email, paramID], (err)=>{
        if(err) console.log(err)
        else{
            console.log('updated!');
            res.redirect("/");
        }
    })
})

// 8. 삭제하기
app.post("/delete/:id",(req,res)=>{
    const paramId= req.params.id;
    conn.query(sql.delete,[paramId],(err)=>{
        if(err) console.log(err);
        else{
            console.log('deleted !');
            res.redirect("/");
        }
    })
})

app.listen(3000, ()=>{
    console.log('Express server running.........')
})