//尝试使用ts的类型推断
enum EType {
  A = 1,
  B = 2,
  C = 3,
}
const ETypeMap = {
  [EType.A]: 'A',
  [EType.B]: 'B',
  [EType.C]: 'C',
}

interface Person {
  name: string
  age: number
  email: string
}

type NameAndAge1 = Pick<Person, 'name' | 'age'>
type NameAndAge2 = Omit<Person, 'email' | 'age'>
const index_a1: NameAndAge1 = { name: 'a', age: 1 }
const index_a2: NameAndAge2 = { name: 'a' }
// NameAndAge 的类型是 { name: string; age: number; }
// console.log(index_a1, index_a2)

const index_a3 = { a: 1, b: 2, c: 3 }
type IndexA3 = typeof index_a3
const index_a4: IndexA3 = { a: 1, b: 2, c: 3 }

type IndexA3Key = keyof typeof index_a3
const index_a5: Record<string, number> = { a1: 1, b1: 2, c1: 3 }
Object.keys(index_a3).forEach((key: IndexA3Key) => {
  index_a5[key] += 1
})
// console.log(index_a5)

//简单的装饰器1
function ssjeLog() {
  console.log('f(): evaluated')
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('target, propertyKey, descriptor', target, propertyKey, descriptor)
  }
}
class IndexA5 {
  @ssjeLog()
  index_a5_handle(data: any) {
    console.log('index_a5_handle测试装饰器', data)
  }
}
const index_a51 = new IndexA5()
// index_a51.index_a5_handle('test')

function ssjeLog2(target, propertyName, descriptor) {
  console.log('target', target, propertyName, descriptor)
  descriptor.value = function () {
    console.log('index_a52_handle2测试装饰器111111111111')
  }
}
class IndexA52 {
  @ssjeLog2
  index_a52_handle(data: any) {
    console.log('index_a52_handle测试装饰器', data)
  }
  index_a52_handle2() {}
}
const index_a53 = new IndexA52()
index_a53.index_a52_handle('test52')
