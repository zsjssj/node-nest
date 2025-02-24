console.log([] == [])
const a = /^[+-]?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)$/
a.exec('1.1')
console.log(a.test('1.1'))
