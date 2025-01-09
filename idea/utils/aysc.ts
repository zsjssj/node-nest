type taskFunction = (a?: number) => void
//批量执行大量任务task不造成卡顿
function runTask(task: taskFunction) {
  return new Promise((resolve, reject) => {
    _runTask(task, resolve)
  })
}
function _runTask(task: taskFunction, callback: taskFunction) {
  requestIdleCallback(deadline => {
    //判断距离渲染下一帧还有没时间，有时间：执行任务，没时间：选然后继续执行下一个任务
    if (deadline.timeRemaining() > 0) {
      task()
      callback()
    } else {
      _runTask(task, callback)
    }
  })
}

//封装一个线程池，用于处理大量任务，这个线程池每次最多只能处理两个任务，当一个任务执行完毕后，会立即执行下一个任务，直到所有任务执行完毕
type functask = () => Promise<void>
class ThreadPool {
  queue: functask[]
  max: number
  count: number
  constructor() {
    this.queue = []
    this.max = 2
    this.count = 0
  }
  addTask(task: functask) {
    this.queue.push(task)
    this.runTask()
  }
  runTask() {
    if (this.count >= this.max) {
      return
    }
    const task = this.queue.shift()
    if (task) {
      this.count++
      task().then(() => {
        this.count--
        this.runTask()
      })
    }
  }
}
