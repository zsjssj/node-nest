const fs = require('fs')
const path = require('path')

// 读取 wasm 文件
const wasmBuffer = fs.readFileSync(path.resolve(__dirname, 'index.wasm'))
WebAssembly.instantiate(wasmBuffer).then(result => {
  const { add, add_float } = result.instance.exports
  // 调用 WebAssembly 函数
  const sum = add(5, 3)
  const aa = add_float(5.5, 3.31121122)
  console.log(sum, aa) // 输出 8
})
