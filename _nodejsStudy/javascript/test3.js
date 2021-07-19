/*
var sum=0;
for(var i=1; i<=10; i++)
    sum+=i
console.log("num", sum) //55
console.log("i", i) //11
console.log("-----------------")
*/
/*
function foo(){
    var sum = 0; // var는 함수단위
    for(var i=1; i<=10; i++)
        sum+=i
}

foo();
// foo()밖에서 호출하였기 때문에, 함수단위인 var는 오류가 난다.
console.log("sum", sum); // error
console.log("i", i); //error

console.log("-----------------------")
*/
/*
let sum1 = 0;
for(let i=1; i<=10; i++){
    // let은 블럭단위
    sum +=i;
}
console.log("sum1", sum1)
console.log("i", i) // let은 블럭단위라서 오류가 남
*/

const j = 10; // const는 상수
console.log(j);
j=20; // 값을 바꾸면 오류가 남