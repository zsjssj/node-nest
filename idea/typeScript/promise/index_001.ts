import { createPromise } from './tools'

// 1. Promise的基本使用
;(() => {
  const aa = createPromise(500, 'hello')
  aa.then(value => {
    console.log(1)
  })
  aa.then(value => {
    console.log(2)
  })
  aa.then(value => {
    console.log(3)
  })
})()
//2. Promise的链式调用
;(() => {
  createPromise(500, 'hello')
    .then(value => {
      console.log(1)
      return createPromise(500, 'world')
    })
    .then(value => {
      console.log(2)
      return createPromise(500, '!')
    })
    .then(value => {
      console.log(3)
    })
})()

//3. Promise的错误处理
;(() => {
  createPromise(500, 'hello')
    .then(value => {
      console.log(1)
      throw new Error('error')
    })
    .then(value => {
      console.log(2)
      return createPromise(500, 'world')
    })
    .then(value => {
      console.log(3)
      return createPromise(500, '!')
    })
    .catch(error => {
      console.log('error', error)
    })
})()

//4. Promise.all
;(() => {
  const p1 = createPromise(500, 'hello')
  const p2 = createPromise(500, 'world')
  const p3 = createPromise(500, '!')
  Promise.all([p1, p2, p3]).then(value => {
    console.log(value)
  })
})()
