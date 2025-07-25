//1.保留小数后指定几位并仍为Number类,方便后续计算
export const keepNumber = (data: number, num?: number) => {
  return data ? Number(data.toFixed(num || 1)) : 0;
};
//2.保留小数
export function roundFun(value: number, n?: number): number {
  return Math.round(value * Math.pow(10, n || 1)) / Math.pow(10, n || 1);
}

//3生成随机字符串
export const generateRandomString = (length: number): string => {
  let result: string = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < Number(length); i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

//4节流
type ThrottleFn<T extends (...args: any[]) => any> = (this: ThisParameterType<T>, ...args: Parameters<T>) => void;
export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number): ThrottleFn<T> {
  let previous = 0;
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - previous > delay) {
      fn.apply(this, args);
      previous = now;
    }
  };
}

//5防抖
// export function debounce(func: (...args: any[]) => void, delay: number): (...args: any[]) => void {
//   let timer: NodeJS.Timeout | null;
//   return function (...args: any[]) {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//       timer = null;
//     }, delay);
//   };
// }
export function debounce<T extends (...arg: any[]) => any>(func: T, delay: number = 500): T {
  let timer: NodeJS.Timeout | null = null;
  return function (..._args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  } as T;
}

//6转换科学计数为普通数字
export const transferToNumber = (inputNumber: number) => {
  if (isNaN(inputNumber)) return inputNumber;
  let inputNumber1 = '' + inputNumber;
  inputNumber = parseFloat(inputNumber1);
  const eformat = inputNumber.toExponential(); // 转换为标准的科学计数法形式（字符串）
  const tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/); // 分离出小数值和指数值
  if (!tmpArray) return inputNumber;
  const number = inputNumber.toFixed(Math.max(0, (tmpArray[1] || '').length - parseInt(tmpArray[2])));
  return number;
};

//7空间换时间,两规律组合并排序
() => {
  console.time('conca3');
  const a1: Array<number> = [1, 3, 4, 7, 8, 9, 12, 13, 15, 18];
  const a2: Array<number> = [22, 23, 44, 45, 54];
  const res3: Array<number> = [];
  let index1 = 0,
    index2 = 0;
  while (index1 < a1.length || index2 < a2.length) {
    if (index1 >= a1.length) {
      (res3.push(a2[index2]), index2++);
      continue;
    } else if (index2 >= a2.length) {
      (res3.push(a1[index1]), index1++);
      continue;
    }
    if (a1[index1] < a2[index2]) {
      (res3.push(a1[index1]), index1++);
    } else {
      (res3.push(a2[index2]), index2++);
    }
  }
  console.timeEnd('conca3');
};

//8.数组去重
() => {
  function unique1(arr: Array<any>) {
    return Array.from(new Set(arr));
  }
  function unique2(arr: Array<any>) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
  function unique3(arr: Array<any>) {
    return arr.reduce((prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]), []);
  }
};
