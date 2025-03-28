export function createPromise<T>(time: number, value: T): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(value)
      }, time)
    } catch (error) {
      reject(error)
    }
  })
}
