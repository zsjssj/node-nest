import { Worker } from 'worker_threads'
import { join } from 'path'
console.log('__dirname', __dirname)

const worker = new Worker('d:/myCode/node-nest/dist/idea/worker/worker.js')

worker.postMessage({ data: 10 })
worker.on('message', message => {
  console.log(`主线程收到来自工作线程的消息：`, message)
})
worker.on('error', error => {
  console.error(`工作线程报错：`, error)
})
worker.on('exit', code => {
  if (code !== 0) {
    console.error(`工作线程停止运行，退出码：`, code)
  }
})
