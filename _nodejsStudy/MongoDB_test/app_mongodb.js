const express = require('express')
const MongoClient = require('mongodb').MongoClient;
// mongoclient객체를 생성함. (mongoclient는 접속할 db주소와 db이름이 필요함)
const url = "mongodb://localhost:27017"
const dbname = "testMongo"

const app = express()
app.use(express.urlencoded({extended:true}))

//mongodb 연결
let db;
//url에 접속이 완료되었을 때, 콜백함수를 실행해라.
MongoClient.connect(url, (err, client) =>{ //client: 우리가 mongodb와 소통하는 매개체 역할
    if(err){
        console.log(err)
    }else{
        console.log('Connected mongodb')
        db = client.db(dbname); //db: testMongo
        login = db.collection('login')
        console.log('created!')
    }
})

app.get('/', (req,res)=>{
    res.send('hi')
})

app.listen(3000, ()=>{
    console.log('Express server running.........')
})