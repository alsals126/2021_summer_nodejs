// 콜백함수를 5번 호출하기
let callTimes = (callback) => {
    for(var i=0; i<5; i++){
        callback()
    }
}

let testB = () => {
    console.log('testB() 함수입니다')
}

//callTimes(testB)
callTimes(() => {
    console.log('testB() 함수입니다')
})

console.log("==========================")

function add(a,b,cd){
    d = a+b
    cd(d)
}
add(10, 20, (d)=>{console.log(d)})