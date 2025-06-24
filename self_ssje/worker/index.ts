//动态创建worker
function createWorker(data: any, workerHandler: (data: any) => void, callback: (data: any) => void) {
  if (typeof workerHandler != 'function') throw new Error('workerHandler must be a function')
  if (typeof callback != 'function') throw new Error('callback must be a function')
  const worker = new Worker(URL.createObjectURL(new Blob([`onmessage = ${workerHandler.toString()}`], { type: 'application/javascript' })))
  worker.onmessage = result => {
    callback(result.data), worker.terminate()
  }
  worker.onerror = error => {
    callback(null), worker.terminate()
  }
  worker.postMessage(data)
}

createWorker(
  { name: 'ssje', age: 2 },
  event => {
    const data = event.data
    const result = data.name + data.age
    postMessage(result)
  },
  data => {
    console.log(data)
  },
)
