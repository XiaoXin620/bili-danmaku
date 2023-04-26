<template>
    <div class="danmaku__inner">
        <div class="danmu">
        </div>
        <a-button type="primary" @click="startConnet">开始链接</a-button>
    </div>
</template>

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

<script setup lang="ts">

import { getCurrentWindow } from '@electron/remote';
import { createSocket } from '../socket'
import axios from 'axios';
const api = axios.create({
    baseURL: "http://localhost:3000",
})
const startConnet = () => {
    // console.log(12313)
    api.post("/getAuth", {})
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

</script>

