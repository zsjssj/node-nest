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
