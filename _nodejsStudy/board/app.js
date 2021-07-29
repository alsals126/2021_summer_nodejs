const express = require('express');
var mysql = require('mysql');
const format = require('date-format');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var session = require('express-session')
var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};
var multer  = require('multer')

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
const sql = {
  join: "insert into user(user_id,passwd,email,tel,reg_date) values(?,?,?,?,?)",
  login: "select passwd from user where user_id=?",
  list: "select * from board order by id desc",
  write: "insert into board(user_id, name, title, content, file, count, regis_date) values(?,?,?,?,?,?,?)",
  read: 'select * from board where id=?',
  update: "update board set name=?,title=?,content=?,modi_date=? where id=?",
  delete: "delete from board where id=?"
}
app.set('view engine', 'ejs');
app.set('views', './views');

app.get("/", (req, res) => {
  res.render("main");
})

app.use(session({
    store: new FileStore(fileStoreOptions),
    secret: 'test',
    saveUninitialized: false,
    resave:false
}));

var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: _storage })

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
    const _joinDate = moment().format('YYYY-MM-DD');

    conn.query(sql.join, [_user_id, _passwd, _email, _tel, _joinDate], (err)=>{
        if(err) console.log(err)
        else{
            console.log("Inserted!!!!")
            res.redirect('/')
        }
    })
})

app.get("/list", (req,res)=>{
    conn.query(sql.list, (err, rows)=>{ // rows: 배열
        if(err) console.log(err)
        else{
            rows.forEach((row) => {
                if(row.file != null)
                    row.file = row.file.slice(15)
            });
            res.render('list', {lists:rows, login:req.session.login}) // list.ejs (lists)
        }
    })
})

app.get("/write", (req,res)=>{
    res.render('write')
})
app.post('/write', upload.single('userfile'), (req,res)=>{
    const _name = req.body.name;
    const _title = req.body.title;
    const _content = req.body.content.replace("\r\n","<br>");
    const file = req.file!=undefined ? req.file.path : null
    const _regisDate = moment().format('YYYY-MM-DD HH:mm:ss');
    
    conn.query(sql.login, [req.session.login], (err,rows)=>{
        if(err) console.log(err)
        else{
            if(rows[0].passwd == req.body.passwd){
                conn.query(sql.write, [req.session.login, _name, _title, _content, file, 0, _regisDate], (err)=>{
                    if(err) console.log(err)
                    else{
                        console.log("Inserted!!!!")
                        res.redirect('/')
                    }
                })
            }else{
                res.send('<script type="text/javascript">alert("비밀번호가 잘못되었습니다."); window.location="/write";</script>')
            }
        }
    })
})

app.get('/read/:id', (req,res)=>{
    const paramID = req.params.id
    
    conn.query(sql.read, [paramID], (err, rows)=>{
        if(err) console.log(err)
        else {
            rows.forEach((row) => {
                if(row.file != null)
                    row.file = row.file.slice(15)
                row.regis_date = row.regis_date.slice(0,11)
                row.content = row.content.replace("<br>", "\n");
            });
            console.dir(rows)
            res.render('read', {rowsX:rows[0], login:req.session.login})
        }
    })
})

app.get('/down/:name', (req, res) => {
    const filename = req.params.name;
    const file = __dirname + '\\public\\uploads\\' + filename;
    res.download(file)
})

app.get('/update/:id', (req, res) => {
    const paramId = req.params.id;
    
    conn.query(sql.read, [paramId], (err, row) => {
        if (err) {
            console.log(err);
        } else {
            row[0].content = row[0].content.replace("<br>", "\n");
            res.render('update', { rows: row[0] })
        }
    })
})
app.post('/update/:id', (req, res) => {
    const paramId = req.params.id;
    const _name = req.body.name;
    const _title = req.body.title;
    const _content = req.body.content.replace("\r\n","<br>");
    const _modiDate = moment().format('YYYY-MM-DD HH:mm:ss');

    conn.query(sql.login, [req.session.login], (err,rows)=>{
        if(err) console.log(err)
        else{
            if(rows[0].passwd == req.body.passwd){
                conn.query(sql.update, [_name, _title, _content, _modiDate, paramId], (err)=>{
                    if(err) console.log(err)
                    else{
                        console.log("Updated!!!!")
                        res.redirect('/')
                    }
                })
            }else{
                res.send(`<script type="text/javascript">alert("비밀번호가 잘못되었습니다."); window.location="/update/"+${paramId};</script>`)
            }
        }
    })
})

app.post("/delete/:id", (req, res) => {
    const paramId = req.params.id;
    conn.query(sql.delete, [paramId], (err) => {
        if (err) console.log(err);
        else {
            console.log('deleted !');
            res.redirect("/");
        }
    })
})

app.listen(3000, () => {
  console.log("running express server at localhost....");
})