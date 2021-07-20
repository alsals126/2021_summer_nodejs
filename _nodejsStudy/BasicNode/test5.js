// 파일처리를 하려면 fs모듈이 필요해.
const fs = require('fs');
fs.readFile("data.txt", 'utf8', function(err, result) {
    if(err) { console.log(err) }
    else{ console.log(result) }
})
// fs.readFile(파일이름, 콜백함수)

// fs.writeFile
// nodejs is server side javascript를 write.txt에 저장시키기
// 콘솔창에는 Saved!!!! 출력
var data = "nodejs is server side javascript"
fs.writeFile("write.txt", data, 'utf8', function(err, result){
    if(err) { console.log(err) }
    else { console.log("Saved!!!!") }
})