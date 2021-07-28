const express = require('express');
var multer = require('multer')
var fs = require('fs');
var mysql = require('mysql');

var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //파일이 이미지 파일이면
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            console.log("그림파일")
            cb(null, 'uploads/images')
            //텍스트 파일이면
        } else {
            console.log("텍스트 파일")
            cb(null, 'uploads/texts')
        }
    },
    //파일이름 설정
    filename: function (req, file, cb) {
        //cb(null, file.originalname+'_'+Date.now())
        cb(null, file.originalname)
    }

})

var upload = multer({ storage: _storage })

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mirim',
    database: 'nodedb',
    port: 3306
});

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("menu");
})

app.get("/upload", (req, res) => {
    res.render("uploadform")
})

app.post("/upload", upload.single('userfile'), (req, res) => {
    console.log(req.filename);
    var sql = "insert into file_upload(file_name) values(?)";
    conn.query(sql, [req.file.path], () => {
        res.send('/서버에 올라감');
    })
})

app.get('/down/uploads/texts/:name', (req, res) => {
    const filename = req.params.name;
    const file = __dirname + '\\uploads\\texts\\' + filename;
    // __dirname: 현재 내가 있는 디렉토리
    console.log('file', file)
    res.download(file)
})

app.get("/show", (req, res) => {
    let sql = "select * from file_upload";
    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render("list", { rows: data })
        }
    })
})

app.listen(3000, () => {
    console.log("express server running....")
})