import { type } from 'os'

//1.类型枚举
;() => {
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
}

//2.interface 接口
;() => {
  interface Person {
    name: string
    age: number
    email: string
  }

  type NameAndAge1 = Pick<Person, 'name' | 'age'> //Pick 从一个类型中挑选某些属性
  type NameAndAge2 = Omit<Person, 'email' | 'age'> //Omit 从一个类型中剔除某些属性
  const index_a1: NameAndAge1 = { name: 'a', age: 1 }
  const index_a2: NameAndAge2 = { name: 'a' }

  const index_a3 = { a: 1, b: 2, c: 3 }
  type IndexA3 = typeof index_a3

  type IndexA3Key = keyof typeof index_a3
  const index_a5: Record<string, number> = { a1: 1, b1: 2, c1: 3 }
  Object.keys(index_a3).forEach((key: IndexA3Key) => {
    index_a5[key] += 1
  })
}

//3.简单的装饰器1
;() => {
  function ssjeLog() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value
      descriptor.value = function (...args) {
        console.log(`Calling ${propertyKey} with args: ${args}`)
        return originalMethod.apply(this, args)
      }
      return descriptor
    }
  }
  class IndexA5 {
    @ssjeLog()
    index_a5_handle(data: any) {
      console.log('index_a5_handle测试装饰器', data)
    }
    @ssjeLog()
    index_a5_handle2(data: any) {
      console.log('index_a5_handle2测试装饰器', data)
    }
  }
  const index_a51 = new IndexA5()
  index_a51.index_a5_handle('test')
  index_a51.index_a5_handle2('test2')

  // function ssjeLog2(target, propertyName, descriptor) {
  //   console.log('target', target, propertyName, descriptor)
  //   descriptor.value = function () {
  //     console.log('index_a52_handle2测试装饰器111111111111')
  //   }
  // }
  // class IndexA52 {
  //   @ssjeLog2
  //   index_a52_handle(data: any) {
  //     console.log('index_a52_handle测试装饰器', data)
  //   }
  //   index_a52_handle2() {}
  // }
  // const index_a53 = new IndexA52()
  // index_a53.index_a52_handle('test52')
}

//4.
