//1.this指向
;() => {
  const a1 = 10
  const aa = {
    a1: 1,
    handleA1() {
      const a2 = this.a1
      console.log(this.a1, a2)
    },
    handleA2: () => {
      const a2 = this.a1
      console.log(this.a1, a2)
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

//3.链式调用
;() => {
  function AClass1(num) {
    this.value = num
    this.add = function (num) {
      this.value += num
      return this
    }
    this.sub = function (num) {
      this.value -= num
      return this
    }
  }
  const res1 = new AClass1(10).add(10).sub(5)
  console.log(res1.value)
  class AClass2 {
    constructor(num) {
      this.value = num
    }
    add(num) {
      this.value += num
      return this
    }
    sub(num) {
      this.value -= num
      return this
    }
    getValue() {
      return this.value
    }
  }
  const res2 = new AClass2(10).add(10).sub(1).getValue()
  console.log(res2)
}

//4.eval,动态执行代码
;() => {
  const a1 = 1
  const a2 = 3
  eval('console.log(a1+a2)')
}

//5.defineProperty
;() => {
  //5.1-es5
  function Product(name, value, num) {
    this.name = name
    this.value = value
    this.num = num
    Object.defineProperty(this, 'totalValue', {
      get() {
        return this.value * this.num
      },
    })
  }
  const a1 = new Product('a1', 10, 2)
  a1.num = 3
  console.log('a1.totalValue', a1.totalValue)
  //5.2-obj
  const a2 = {
    name: 'a2',
    value: 20,
    num: 3,
    get totalValue() {
      return this.value * this.num
    },
  }
  a2.num = 10
  console.log('a2.totalValue', a2.totalValue)

  //5.3-es6
  class Product2 {
    constructor(name, value, num) {
      this.name = name
      this.value = value
      this.num = num
    }
    get totalValue() {
      return this.value * this.num
    }
  }
  const a3 = new Product2('a3', 30, 2)
  a3.num = 5
  console.log('a3.totalValue', a3.totalValue)
}

//6.reduce
;() => {
  const a1 = [2, 3, 5, 1, 6]
  const res1 = a1.reduce((pre, cur) => {
    return pre + cur
  })
  const res2 = a1.reduce((pre, cur) => {
    return pre + cur
  }, 0)
  const res3 = a1.reduce((pre, cur, index) => {
    pre[index] = cur
    return pre
  }, {})
  console.log('reduce', res1, res2, res3)
}

//7.数组,对象类型判断
;() => {
  console.log(Object.prototype.toString.call({}), Object.prototype.toString.call([]))
  console.log(Array.isArray({}), Array.isArray([]))
}

//8.柯里化函数
;() => {
  function curry(...args) {
    let parrms = args
    const addFn = (...args2) => {
      parrms = parrms.concat(args2)
      return addFn
    }
    addFn.valueof = () => {
      return parrms.reduce((pre, cur) => pre + cur)
    }
    return addFn
  }

  const curryAdd = curry(1, 2, 3)(4)(5)(6).valueof()
  console.log(curryAdd)
}

//9.once函数
;() => {
  function once(fn) {
    let done = false
    return (...args) => {
      if (!done) {
        done = true
        return fn(...args)
      }
    }
  }
  const handleOnce = once(a => {
    console.log('once', a)
  })
  handleOnce(12)
  handleOnce(3)
}

//10.两个排序数组合并，默认排序
;() => {
  const a1 = [1, 3, 4, 7, 8, 9, 12, 13, 15, 18]
  const a2 = [22, 23, 44, 45, 54]
  console.time('conca1')
  const res1 = a1.concat(a2).sort((a, b) => a - b)
  console.timeEnd('conca1')

  console.time('conca2')
  const res2 = [...a1, ...a2].sort((a, b) => a - b)
  console.timeEnd('conca2')

  console.time('conca3')
  const res3 = []
  let index1 = 0,
    index2 = 0
  while (index1 < a1.length || index2 < a2.length) {
    if (index1 >= a1.length) {
      res3.push(a2[index2]), index2++
      continue
    } else if (index2 >= a2.length) {
      res3.push(a1[index1]), index1++
      continue
    } else {
      if (a1[index1] < a2[index2]) {
        res3.push(a1[index1]), index1++
      } else {
        res3.push(a2[index2]), index2++
      }
    }
  }
  console.timeEnd('conca3')
  // console.log('res', '\n', res1, '\n', res2, '\n', res3)
}

//8.二进制位运算
;(() => {
  const a1 = 0b111
  const a2 = 0b000
  const a3 = a1 | a2
  const a4 = a1 & a2
  console.log(!!a3, !!a4)
  console.log(a3.toString(2), a4.toString(2))
})()

//9.??空值合并运算符
;() => {
  const a1 = null ?? 3
  const a2 = undefined ?? 3
  const a3 = '' ?? 3
  const a4 = 0 ?? 3
  console.log(a1, a2, a3, a4)
}
;(() => {
  if (0) console.log(1)
  else console.log(0)
})()

