// 1. for(i; 최종값; 증감값)

// 2. for-in (배열, 객체 둘 다 사용가능)
/*
let user=['kim', 'lee', 'park']
for(let i in user){ //i: index
    console.log(i, user[i]) // 0 kim, 1 lee, 2 park
}

const obj = { // 객체: key-value로 이루어짐
    name: 'kang',
    age: 30
}

//출력
for(let i in obj){
    console.log(i, obj[i])
}
*/

// 3. for-of (배열, 객체 둘 다 사용가능)
/*
const user2 = ['kim2', 'lee2', 'park2']
for(let value of user2){ 
    console.log(value);
}
const str = "hi javascript"
for(let value of str)
    console.log(value)
*/

// 4. forEach() 배열의 함수(객체는 사용할 수 없다.)
let user3 = ['kim3', 'lee3', 'park3']; // 배열이름.forEach(콜백함수)
user3.forEach(function(val){
    console.log(val)
})
user3.forEach(function(val, index){
    console.log(val, index)
})