const arr1 = {}
arr1.__proto__ = Array.prototype
arr1.push(1, 2, 3)
console.log(arr1 instanceof Array, arr1 instanceof Object, Array.isArray(arr1))
console.log(arr1)

const arr2 = []
arr2.push(1, 2, 3)
console.log(arr2 instanceof Array, arr2 instanceof Object, Array.isArray(arr2))
console.log(arr2)

console.log(!null, !undefined, !!null, !!undefined)

const a1 = () => {
  console.log('a1')
}
const a2 = () => {
  console.log('a2')
}
console.log(!({} instanceof Object))

1 > 2 ? a1() : a2()

console.log(Object.prototype.toString.call({}), Object.prototype.toString.call([]))
console.log(Array.isArray({}), Array.isArray([]))

// const a11 = { a: 1, b: 2, c: 3 }
// const a12 = new Proxy(
//   {},
//   {
//     get(obj, prop, value) {
//       console.log('get', obj, prop, value)
//     },
//     set(obj, tar, value) {
//       obj[tar] = value
//       console.log('set', obj, tar, value)
//     },
//   },
// )
// a12.a = 4
// a12.d = 5
// console.log(a11, a12)

//通过defineProperty实现数据响应
const obj1 = { a: 1, b: 2, c: 3, d: { a1: 1, b1: 2 } }
function ref2(object) {
  if (object instanceof Object) {
    for (const key in object) {
      let value = object[key]
      if (object[key] instanceof Object) {
        ref2(object[key])
        continue
      }
      Object.defineProperty(object, key, {
        get() {
          console.log('get', value)
          return value
        },
        set(newVal) {
          value = newVal
          console.log('set', value)
        },
      })
    }
  }
  return object
}

const a22 = ref2(obj1)
a22.a = 4
a22.a = 5
a22.d.a1 = 5
console.log(a22.a, a22.d)
