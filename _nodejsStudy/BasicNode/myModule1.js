let myModule = {
    name: 'kim',
    age: 35,
    about: function() {
        // this를 사용하려면 arrow 함수말고 function()으로 하기
        console.log('나의 이름은 ' + this.name + '이고 나이는 ' + this.age + '입니다')
    }
}

module.exports = myModule;