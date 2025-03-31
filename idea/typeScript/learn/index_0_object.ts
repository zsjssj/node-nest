//1.this指向
const a1 = 10
;() => {
  const a1 = 10
  const aa = {
    a1: 1111,
    handleA1() {
      const a2 = this.a1
      console.log(this.a1, a2)
    },
    handleA2: () => {
      //在箭头函数中，this指向调用者的this
      // const a2 = this.a1
      // console.log(this.a1, a2)
    },
  }
  aa.handleA1()
  aa.handleA2()
}

//2.判断是否空对象
;() => {
  const a1 = { a: 1, handleA1: () => {} }
  console.log(Object.keys(a1), Reflect.ownKeys(a1))
}
