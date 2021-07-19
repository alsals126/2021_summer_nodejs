// 1. 모듈 불러오기: require
// 모듈 사용을 require메소드를 사용한다.
const os = require('os');
console.log("호스트 이름은 " + os.hostname() + "입니다")
console.log(os.freemem())
console.log(os.totalmem())
console.log(os.type())