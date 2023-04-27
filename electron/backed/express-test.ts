const express = require('express')
const expressWs = require('express-ws')

const app = () =>{
  
const expressApp = express()
expressWs(expressApp)
const port = 4000

expressApp.ws('/socketTest', (ws, req)=>{
  // 返回给客户端
  ws.send('连接成功113123123')
  // 监听 message 事件，拿到客户端通过 websocket 发送过来的数据
  ws.on('message', (msg)=> {
      // 业务代码
  })
})

expressApp.get('/', (req:any, res:any) => {
  res.send('Hello World!111')
})

expressApp.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

}
export default app;