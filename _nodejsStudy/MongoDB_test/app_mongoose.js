const express = require('express')
const mongoose = require('mongoose')

// 1. 접속주소와 db이름 세팅
mongoose.connect('mongodb://localhost:27017/data', {userNewUrlParser:true, userUnifiedTopology:true})

// 2. db 연결
const db = mongoose.connection

// 3. event 이용하여 접속
db.on('err', ()=>{
    console.log('connection failed')
})
db.once('open', ()=>{
    console.log('connected')
})

const app = express()
app.use(express.urlencoded({extended:true}))

// 4. 스키마 생성
const test = mongoose.Schema({
    name: String,
    age: Number
})

// 5. 4번의 스키마를 토대로 하여 실제 컬렉션 생성
var Test = mongoose.model('aa', test)
// test라는 스키마를 사용해서 aa라는 테이블을 만듦. aa를 Test가 가리키게 함
// aas (복수형으로 s가 붙는다)

app.get('/', (req,res)=>{
    res.send('hi')
})

// 1) insert -- 데이터 저장 (new로 객체 생성해서 save()메서드 이용 : => insertOne)
// const person = new Test({name:'kim, age:35})
// new Test({name:'kim', age:35}).save((err,date)=>{
//     if(err){
//         console.log(err)
//     }
//     else console.log('Saved!!!')
// })

// 2) insertMany 사용
// Test.insertMany([{name:'kim', age:22},{name:'ko', age:80},{name:'min',age:70}], (err, result)=>{
//     if(err) 
//         console.log(err)
//     else 
//         console.log("result:", result)
// })

// 3) 전체 데이터 가지고 오기
// Test.find({}, (err, result)=>{
//     // select * from aas; select가 완료되면 뒤의 콜백함수를 실행해라
//     // result의 형식:::: 배열
//     if(err) console.log(err)
//     else{
//         result.forEach((ele)=>{ // forEach: 배열이 가지고 있는 함수
//             console.log(ele.name, ele.age)
//         })
//     }
// })

// 4) 특정 값 가져오기
// Test.findOne({_id: '60fe3938e3912702602b65ed'}, (err, result)=>{
//     if(err) console.log(err)
//     else console.log(result)
// })

// 5) 값 수정하기
// Test.updateOne({_id: '60fe3938e3912702602b65eb'}, {name:'ho'}, (err)=>{
//     if(err) console.log(err)
//     else console.log('Updated!!!')
// })

// 6) 특정 값 수정하기 2
// 이름이 park인 애의 나이를 100, 이름을 park3로 변경시켜 $set이용
// Test.updateOne({name:'park'}, {$set: {name:'park3', age:100}}, (err,result)=>{
//     if(err) console.log(err)
//     else console.log('Updated!!!')
// })

// 7) 삭제: deleteOne deleteMany
// Test.deleteOne({조건;}, (err)) delete from aas where 조건;
// 이름이 park인 애 삭제
Test.deleteOne({name:'kim'}, (err)=>{
    if(err) console.log(err)
    else console.log('deleted!!!')
})
// age가 30이하인 애 삭제


app.listen(3000, ()=>{
    console.log('Express server running.........')
})