const mysql=require('mysql');

const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'111111',
    database:'test'
})
conn.connect();

module.exports=conn;