const fs = require('fs')
const jschardet = require('jschardet')

// // 读取二进制文件
// fs.readFile('D:/QingRong/nodeserver/public/2025-03-17converted_file.txt', (err, data) => {
//   if (err) console.log('读取文件失败:', err)
//   // 尝试将二进制数据解码为文本
//   console.log('start', data)
//   // const text = data.toString('utf-8')
//   // console.log('text', text.slice(0, 1000))

//   const hexString = data.toString('hex')
//   console.log('hexString', hexString.slice(0, 100))

//   const uint8Array = new Uint8Array(data)
//   console.log('文件内容 (Uint8Array):', Array.from(uint8Array).slice(0, 100), Array.from(uint8Array).slice(100, 200), Array.from(uint8Array).slice(200, 300))

//   // const text = data.toString('utf-8')
//   // console.log('text', text)

//   // const base64String = data.toString('base64')
//   // console.log(base64String)

//   //   const hexString = data.toString('hex')
//   //   console.log('hexString', hexString)
//   //   // console.error('文件不是UTF-8编码的文本:', error)
// })

const fileBuffer = fs.readFileSync('D:/QingRong/nodeserver/public/lfd_1206_clearned.compressed_sh_0.ply')
console.log('start', fileBuffer)

const detected = jschardet.detect(fileBuffer)
console.log('Detected encoding:', detected.encoding)

// const text = data.toString('utf-8')
// console.log('text', text.slice(0, 2000))

// const hexString = data.toString('hex')
// console.log('hexString', hexString.slice(0, 100))

// const uint8Array = new Uint8Array(data)
// console.log('文件内容 (Uint8Array):', Array.from(uint8Array).slice(0, 1984), Array.from(uint8Array).slice(1985, 3969))
