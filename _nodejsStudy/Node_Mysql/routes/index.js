const express = require('express')
const mysql = require('mysql')
const format = require('date-format')
const moment = require('moment')
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")

const router = express.Router(); // router 객체 생성

// 3. 목록보기
router.get('/', (req,res)=>{
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

// 날짜 포맷 지정
moment().format('YYYY-MM-DD HH:mm:ss')

// 4. 데이터 추가
router.get('/new', (req, res)=>{
    res.render('new')
})
router.post('/new', (req,res)=>{
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
router.get('/read/:id', (req, res)=>{
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
router.get('/edit/:id', (req,res)=>{
    const paramID = req.params.id

})
// 7. 수정하기
router.post('/edit/:id', (req,res)=>{
    const paramID = req.params.id;
    const name = req.body.name;
    const emp_number = req.body.emp_number;
    const email = req.body.email;

    conn.query(sql.update, [name, emp_number, email, paramID], (err)=>{
        if(err) console.log(err)
        else res.redirect('/')
    })
})

// 8. 삭제하기
router.post('/delete/:id', (req, res)=>{

})

module.exports = router; // 외부에서 이 모듈을 사용할 수 있게 내보내는 역할
