// add라는 함수 만들고 3,5를 넘겨서 더한 합을 출력하기
// 선언적 함수
// function add(a, b){
//     return a+b;
// }

// console.log(add(3,5))

// 익명 함수
// const add = function(a, b){
//     return a+b;
// }

// console.log(add(3, 5))

// 익명함수로 만들기
// 1번
const sum = function(n, m) {
    var result = 0;
    for(var i=n; i<=m; i++)
        result += i;
    return result
}
console.log(sum(1, 10))

// 2번
const ifodd = function(n) {
    if(n%2 == 0)
        return "짝수"
    return "홀수"
}
console.log(ifodd(121))

console.log("================================")

// 3번
const person = {
    name: 'kim',
    age: 30,
    add: function(x,y){
        return x+y
    }
}
console.log(person.add(3,5))

// 4번
const person2 = {}
person2.list = {
    kim: 30,
    lee: 28,
    park: 35
}
person2.show = function(){
    console.log("hi hello")
}
person2.show()
person2['show']()