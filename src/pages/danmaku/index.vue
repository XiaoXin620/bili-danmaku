<template>
    <div class="danmaku__inner">
        <div class="danmu">
        </div>
        <a-button type="primary" @click="startConnet">开始链接</a-button>
    </div>
</template>

<script setup lang="ts">
import { getCurrentWindow } from '@electron/remote';
import { createSocket } from '../socket'
import axios from 'axios';
const api = axios.create({
    baseURL: "http://localhost:3000",
})
const startConnet = () => {
    console.log(12313)
    api.post("/getAuth", {
        appKey: '22ylM5epXZwnKJdHwecotNq2',
        appSecret: 'Zu8Bz8hsefCDr64AT2PEQsSNOSCmvH',
    })
        .then(({ data }) => {
            console.log("-----鉴权成功-----")

            if (data.code === 0) {
                const res = data.data
                const { game_info, websocket_info } = res

                const { auth_body, wss_link } = websocket_info
                if (auth_body && wss_link) {
                    createSocket(auth_body, wss_link)
                }
            }
            
        })
        // .catch((err) => {
        //     console.log("-----鉴权失败-----")
        // })
}
// {
//     "anchor_info": {
//         "room_id": 5877261,
//         "uface": "https://i2.hdslb.com/bfs/face/024fcf3eba8f8b6fe3718cfb6f8fbf0477dc2b3e.jpg",
//         "uid": 23031620,
//         "uname": "喵嗷呼"
//     },
//     "game_info": {
//         "game_id": ""
//     },
//     "websocket_info": {
//         "auth_body": "{\"roomid\":5877261,\"protover\":2,\"uid\":1704161156115981,\"key\":\"23MwEPuwNHNnmAypfOHrVHn_OWeX9R60SRekm4tuxIY8yuYAI-H7T2SlYEsgvpZNMKzZp_qN-nydF7GGUudcr1eehiJXnlBsT_3gxEQjRD5LL3ktbxNFteEYpfx_BXDnru_J97luQQpiZ_xnjR4Pi0Gn2dtbG5Q=\",\"group\":\"open\"}",
//         "wss_link": [
//             "wss://hw-sh-live-comet-05.chat.bilibili.com:443/sub",
//             "wss://hw-gz-live-comet-05.chat.bilibili.com:443/sub",
//             "wss://broadcastlv.chat.bilibili.com:443/sub"
//         ]
//     }
// }

</script>

<style scoped>
.danmaku__inner {

    display: flex;
    width: 100%;
    height: 100vh;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
}

.danmu {
    -webkit-app-region: drag;
    width: 100%;
    height: 30px;
}
</style>
