const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.static(__dirname + '/public'))
app.set('views', './views_file')
app.set('view engine', 'pug')

app.locals.pretty = true;

app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=> {
    res.send("hi")
})

app.get("/lang", (req, res)=> {
    res.render("lang_form")
})
app.post('/lang', (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    false.writeFile('./data/' + title, description, (err) => {
        if(err) {console.log(err)}
        else console.log('success!')
    })
})

app.get("/lang/new", (req,res)=> {
    res.render("new")
})

app.get('/lang/:id', (req,res)=>{
    const param = req.params.id; // param: java, node, javascript
    fs.readdir('./data/', (err, files)=>{
        if(err) console.log(err)
        else{
            // 파일의 내용 가지고 오기
            fs.readFile('./data/' + param, 'utf8', (err,data)=>{
                if(err) console.log(err)
                else{
                    res.render('view', {title:param, lists:files, desc:data})
                }
            })
        }
    })
})

app.listen(3000, () => {
    console.log('Running express server at localhost...........')
})