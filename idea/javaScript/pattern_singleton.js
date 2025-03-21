//类实现单例
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance
    }
    // 初始化逻辑
    this.data = 'Singleton Data'
    Singleton.instance = this
  }

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }
    return Singleton.instance
  }

  getData() {
    return this.data
  }

  setData(data) {
    this.data = data
  }
}

// 使用单例
const instance1 = Singleton.getInstance()
const instance2 = Singleton.getInstance()

console.log(instance1 === instance2) // true

instance1.setData('New Data')
console.log(instance2.getData()) // "New Data"

function Singleton1() {
  this.data = 'Singleton Data'
}

const SingletonProxy = new Proxy(Singleton1, {
  instance: null,
  construct(target, args) {
    if (!this.instance) {
      this.instance = new target(...args)
    }
    return this.instance
  },
})

// 使用单例
const instance11 = new SingletonProxy()
const instance21 = new SingletonProxy()

console.log(instance1 === instance21) // true
console.log(instance11.data) // "Singleton Data"
