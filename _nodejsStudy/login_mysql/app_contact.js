const express = require('express');
var mysql = require('mysql');
const format = require('date-format');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

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
  list: "select * from contact order by id desc",
  insert: "insert into contact(name,email,tel,city,password, reg_date) values(?,?,?,?,?,?)",
  read: "select * from contact where id=?",
  update: "update contact set name=?,email=?,tel=?,city=? where id=?",
  delete: "delete from contact where id=?"
}
app.set('view engine', 'ejs');
app.set('views', './views');


app.get("/", (req, res) => {
  //  res.send("hi Contact~")
  res.render("index");
})

app.get("/new", (req, res) => {
  res.render("new")
})

app.post("/new", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var tel = req.body.tel;
  var city = req.body.city;
  var password = req.body.password;

  //insert
  conn.query(sql.insert, [name, email, tel, city, password, date], (err) => {
    if (err) { console.log(err); }
    else {
      console.log("Inserted!!")
      res.redirect("/list");
    }
  })

})

//list
app.get('/list', (req, res) => {
  conn.query(sql.list, (err, rows) => {
    if (err) { console.log(err); }
    else { res.render('list', { data: rows }) }
  })
})

//update
app.get('/update/:id', (req,res)=>{
  const paramId= req.params.id;
  conn.query(sql.read, [paramId], (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(row);
      res.render('update_form', { rows: row[0] })
    }
  })
})
app.post('/update/:id', (req,res)=>{
  const _paramID = req.params.id;
  const _name = req.body.name;
  const _email = req.body.email;
  const _tel = req.body.tel;
  const _city = req.body.city;

  conn.query(sql.update, [_name, _email, _tel, _city, _paramID], (err)=>{
      if(err) console.log(err)
      else{
          console.log('updated!');
          res.redirect("/");
      }
  })
})

//delete 
app.get("/delete/:id",(req,res)=>{
  const paramId= req.params.id;
  conn.query(sql.delete,[paramId],(err)=>{
      if(err) console.log(err);
      else{
          console.log('deleted !');
          res.redirect("/");
      }
  })
})

// conn.end();
app.listen(3000, () => {
  console.log("running express server at localhost....");
})