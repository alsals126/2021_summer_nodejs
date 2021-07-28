const express = require('express');
var mysql = require('mysql');
const format = require('date-format');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var session = require('express-session')
var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.locals.pretty = true;


var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mirim',
  database: 'nodedb',
  port: 3306
});

conn.connect();

if (conn) {
  console.log("mysql db connected!!")
}else{
  console.log("error")
}
const date = moment().format('YYYY-MM-DD HH:mm:ss');
const sql = {
  insert: "insert into user(user_id,passwd,email,tel,reg_date) values(?,?,?,?,?)",
  login: "select passwd from user where user_id=?"
}
app.set('view engine', 'ejs');
app.set('views', './views');

moment().format('YYYY-MM-DD HH:mm:ss')
app.get("/", (req, res) => {
  res.render("main");
})

app.use(session({
    store: new FileStore(fileStoreOptions),
    secret: 'test',
    saveUninitialized: false,
    resave:false
}));

app.get("/login", (req,res)=>{
    if(req.session.login){
        res.send(`hello, ${req.session.login}<br>
        <a href='/logout'>Logout</a>`)
    }else{
        res.render("login")
    }
})
app.post("/login", (req,res)=>{
    const _user_id = req.body.user_id;
    const _passwd = req.body.passwd;

    conn.query(sql.login, [_user_id], (err,rows)=>{
        if(err) console.log(err)
        else{
            if(rows[0].passwd == _passwd){
                req.session.login = _user_id
                res.send('<script type="text/javascript">alert("로그인 되었습니다."); window.location="/"; </script>')
            }else{
                res.send('<script type="text/javascript">alert("아이디 또는 비밀번호가 잘못되었습니다."); window.location="/login"; </script>')
            }
        }
    })
})

app.get('/logout',(req, res)=>{
    delete req.session.login;
    req.session.save(()=>{ // 좀더 정확하게 삭제하기
        res.redirect('/login')
    })
})

app.get("/join", (req,res)=>{
    res.render("join")
})
app.post("/join", (req,res)=>{
    const _user_id = req.body.user_id;
    const _passwd = req.body.passwd;
    const _email = req.body.email;
    const _tel = req.body.tel;
    const _joinDate = date;

    conn.query(sql.insert, [_user_id, _passwd, _email, _tel, _joinDate], (err)=>{
        if(err) console.log(err)
        else{
            console.log("Inserted!!!!")
            res.redirect('/')
        }
    })
})

app.listen(3000, () => {
  console.log("running express server at localhost....");
})