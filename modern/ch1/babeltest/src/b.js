// Foo 클래스를 정의
class Foo {
  constructor () {
    this.value = 100
  }
  bar () {
    console.log('Foo.bar')
    console.log(this.value)
  }
}

//Foo 를 사용
const f = new Foo()
f.bar()
