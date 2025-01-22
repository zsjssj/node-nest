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
console.log(index_a1, index_a2)
