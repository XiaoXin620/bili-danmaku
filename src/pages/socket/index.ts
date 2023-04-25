// import DanmakuWebSocket from "../assets/danmaku-websocket.min.js"

import { decode, encode } from "../../utils/bili-data.util"

let ws: WebSocket
let timer: NodeJS.Timer

/**
 * 创建socket长连接
 * @param authBody
 * @param wssLinks
 */
function createSocket(authBody: string, wssLinks: string[]) {
    console.log(111)
    // const opt = {
    //     ...getWebSocketConfig(authBody, wssLinks),
    //     // 收到消息,
    //     onReceivedMessage: (res: any) => {
    //         console.log(res)
    //     },
    //     // 收到心跳处理回调
    //     onHeartBeatReply: (data: any) => console.log("收到心跳处理回调:", data),
    //     onError: (data: any) => console.log("error", data),
    //     onListConnectError: () => {
    //         console.log("list connect error")
    //         destroySocket()
    //     },
    // }

    // if (!ws) {
        console.log(wssLinks)
        ws = new WebSocket(wssLinks[2])

        const config = encode(JSON.stringify(getWebSocketConfig(authBody, wssLinks)),7)
        ws.onopen = () => {
            if (!ws) return;
            ws.send(config)
            ws.onmessage = async res => {
                console.log(await decode(res.data))
                console.log(res)
            }
            timer =setInterval(() => {
                ws.send(encode("",2));
            }, 30000);
        }

        ws.onclose = () =>{
            console.log("onclose")
        }

        ws.onerror = (err) => {
            console.log("onerror",err)
        }


    // }

    return ws
}

/**
 * 获取websocket配置信息
 * @param authBody
 * @param wssLinks
 */
function getWebSocketConfig(authBody: string, wssLinks: string[]) {
    const url = wssLinks[0]
    const urlList = wssLinks
    const auth_body = JSON.parse(authBody)
    return {
        // url,
        // urlList,
        customAuthParam: [
            {
                key: "key",
                value: auth_body.key,
                type: "string",
            },
            {
                key: "group",
                value: auth_body.group,
                type: "string",
            },
        ],
        rid: auth_body.roomid,
        protover: auth_body.protoover,
        uid: auth_body.uid,
    }
}

/**
 * 销毁websocket
 */
// function destroySocket() {
//     console.log("destroy1")
//     ws && ws.destroy()
//     ws = undefined
//     console.log("destroy2")
// }

/**
 * 获取websocket实例
 */
function getWsClient() {
    return ws
}

export { createSocket, getWebSocketConfig, getWsClient }
