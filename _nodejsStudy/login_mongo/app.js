const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.set('views', './views')
app.set('view engine', 'pug')

app.locals.pretty = true;

app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=> {
    let output=`    
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <h1>Register with Mongo & Pug</h1>
                <ul>
                    <li><a href='/'>목록보기</a></li>
                    <li><a href='/regis'>가입하기</a></li>
                    <li><a href='/'>로그인하기</a></li>
                </ul>
            </body>
        </html> `;
    res.send(output);
})
app.get("/regis", (req, res)=> {
    res.render("register")
})

app.listen(3000, () => {
    console.log('Running express server at localhost...........')
})