//保留小数后指定几位并仍为Number类,方便后续计算
export const keepNumber = (data: number, num?: number) => {
  return data ? Number(data.toFixed(num || 1)) : 0
}
//保留小数
export function roundFun(value: number, n?: number): number {
  return Math.round(value * Math.pow(10, n || 1)) / Math.pow(10, n || 1)
}

//生成随机字符串
export const generateRandomString = (length: number): string => {
  let result: string = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < Number(length); i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

//节流
type ThrottleFn<T extends (...args: any[]) => any> = (this: ThisParameterType<T>, ...args: Parameters<T>) => void
export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number): ThrottleFn<T> {
  let previous = 0
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - previous > delay) {
      fn.apply(this, args)
      previous = now
    }
  }
}

//防抖
export function debounce(func: (...args: any[]) => void, delay: number): (...args: any[]) => void {
  let timer: NodeJS.Timeout | null
  return function (this: any, ...args: any[]) {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
      timer = null
    }, delay)
  }
}

//转换科学计数为普通数字
export const transferToNumber = (inputNumber: number) => {
  if (isNaN(inputNumber)) return inputNumber
  let inputNumber1 = '' + inputNumber
  inputNumber = parseFloat(inputNumber1)
  const eformat = inputNumber.toExponential() // 转换为标准的科学计数法形式（字符串）
  const tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/) // 分离出小数值和指数值
  if (!tmpArray) return inputNumber
  const number = inputNumber.toFixed(Math.max(0, (tmpArray[1] || '').length - parseInt(tmpArray[2])))
  return number
}
