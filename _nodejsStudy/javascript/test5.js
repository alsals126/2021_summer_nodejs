/*
// 1. 기본 생성방법
const user = {
    kim:10,
    lee:7,
    park:25
}
console.log(user.kim)
*/

/*
// 2. new 연산자 이용한 생성
// 나는 객체를 생성하겠다. 선언함.
const user = new Object(); // const user={};도 가능

// 객체이름.키 = 값, 객체이름[키]=값
user.kim = 10;
user.lee = 25;
user['park'] = 9;
*/

/*
// 3. 프로토타입 이용한 생성 (자바의 클래스와 거의 비슷한 개념)
function Person(name, age){ // 프로토타입 : 함수(자바의 생성자함수)
    this.name = name;
    this.age = age;
}
Person.prototype.walk = function(){
    console.log("걷는다");
}

let person1 = new Person("kim", 30);
let person2 = new Person("lee", 20);

console.log(person1.name)
console.log(person2.name)
person1.walk();
*/

// ==================================================
// 1번
// const score = {
//     kor: 100,
//     eng: 80,
//     math: 90
// }

// function sum1(){
//     console.log(score.kor + score.eng + score.math)
// }
// sum1()

// 2번
// const score = {}
// score.kor = 100
// score.eng = 80
// score['math'] = 90

// function sum1(){
//     console.log(score.kor + score.eng + score.math)
// }
// sum1()

// 3번
function Score(kor, eng, math){
    this.kor = kor;
    this.eng = eng;
    this.math = math;
}
Score.prototype.sum1 = function(kor, eng, math){
    console.log(kor + eng + math)
}

let score1 = new Score(100 ,80, 90)
score1.sum1(score1.kor, score1.eng, score1.math)