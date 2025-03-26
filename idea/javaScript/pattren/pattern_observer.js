/* 
观察者设计模式
*/

// 主题（Subject）
class Subject {
  constructor() {
    this.observers = [] // 观察者列表
  }
  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer)
  }
  // 移除观察者
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer)
  }
  // 通知所有观察者
  notify(data) {
    this.observers.forEach(observer => observer.update(data))
  }
}

// 观察者（Observer）
class Observer {
  constructor(name) {
    this.name = name
  }
  // 更新方法，当主题状态改变时调用
  update(data) {
    console.log(`${this.name} 收到数据: ${data}`)
  }
}

// 使用观察者模式
const subject = new Subject()
const observer1 = new Observer('Observer 1')
const observer2 = new Observer('Observer 2')

subject.addObserver(observer1)
subject.addObserver(observer2)
subject.notify('Hello, World!')

// 输出:
// Observer 1 收到数据: Hello, World!
// Observer 2 收到数据: Hello, World!

subject.removeObserver(observer1)
subject.notify('Goodbye!')

// 输出:
// Observer 2 收到数据: Goodbye!
