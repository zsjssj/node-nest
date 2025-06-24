// let o1 = (function () {
//   const obj = { a: 1, b: 2 };
//   Object.setPrototypeOf(obj, null); // 防止原型修改【直接去除obj原型】
//   return function (k) {
//     return obj[k];
//   };
// })();

// //通过原型获取闭包数据本身
// Object.defineProperty(Object.prototype, 'hack', {
//   get: function () {
//     return this;
//   },
// });
// const obj = o1('hack');
// console.log(obj); // { a: 1, b: 2 }
// obj.c = 3;
// console.log(o1('c')); // 3

//防抖函数
function debounce(fn, delay) {
  let timer;
  return {
    cancel: function () {
      clearTimeout(timer);
      timer = null;
    },
    run: function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    },
  };
}
const debouncedFn = debounce((msg) => {
  console.log(msg);
}, 1000);
// 使用防抖函数
debouncedFn.run('Hello, World!'); // 1秒后输出 "Hello, World!"
// 取消防抖函数
// debouncedFn.cancel(); // 如果在1秒内调用了cancel，则不会输出任何内容
