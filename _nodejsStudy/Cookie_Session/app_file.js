const express=require('express');
var session = require('express-session')
var FileStore = require('session-file-store')(session);
 const app=express();
var fileStoreOptions = {};
 
app.use(session({
    store: new FileStore(fileStoreOptions),
    secret: 'test',
    saveUninitialized: false,
    resave:false
}));

//session에 대한 정보가 sessions디렉토리에 파일로 만들어진다
//사용자의 session id에 대한 값: 저거이다 

// app.use(session({
//     secret: 'keyboard cat',// session id를 사용자에 심을 때 랜덤하게 해주는 것
//     resave: false, //세션아이디를 접속할 때마다 새롭게 발급하는 것
//     saveUninitialized: true,  //세선사용전까지는  아이디를 발급하지 말아라
   
//   }))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'pug');
app.set('views', './views');
//   app.get('/session',(req, res)=>{
//       req.session.count=1;
//       res.send('session created');
//   })

//   app.get('/result',(req, res)=>{
//       res.send('session:'+req.session.count)
//   })
// app.get('/session',(req, res)=>{
//     if(req.session.count1) {
//         req.session.count1++;
//     }
//     else {req.session.count1=1;}
//     res.send('count1:'+req.session.count1)
  
// })

  var user={
        user_id:'kim',
        user_password:'1111'
    }
app.get('/login', (req,res)=>{
    res.render('login_form')
})
app.get('/welcome',(req, res)=>{
     // res.send(req.session)
    if(req.session.nickName) {//로그인되어 있는 사용자라면 로그아웃 정보까지
        res.send(`hello ${req.session.nickName}
        <a href="/logout">Logout</a>`)
        
        
    }else {//로그인에 실패 또는 로그인되어있지 않은 사용자
      res.send(`welcome        <a href="/login">LogIn</a>`)
    }
  
})
app.post('/login',(req, res)=>{
  
    var uname=req.body.uid;
    var pwd=req.body.upw;

    if(uname==user.user_id && pwd==user.user_password) {
       // res.send('hi');
       req.session.nickName='mike';
       //sessionid의 nickNam이란 이름으로 mike를 저장한다.
       console.log('1')
      res.redirect('/welcome');
    }
    else {
        res.send('로그인이 맞지 않습니다 <a href="/login">Login</a>')
    }


})

app.get('/logout',(req, res)=>{
    delete req.session.nickName;
    req.session.save(()=>{ // 좀더 정확하게 삭제하기
        res.redirect('/welcome')
    })
})
app.listen(3000,()=>{
    console.log('Express server running....')
})