<template>
    <div class="danmaku-window">
        <div class="danmu">
        </div>

        <div class="danmaku-list--wrapper">
            <div class="danmaku-list">
                <div class="danmaku-list__inner">
                    <div class="danmaku-item" v-for="item in 10">
                    <div class="uface">
                        <img src="https://i2.hdslb.com/bfs/face/024fcf3eba8f8b6fe3718cfb6f8fbf0477dc2b3e.jpg">
                    </div>
                    <div class="uname">
                        喵嗷呼
                    </div>
                    <div class="msg">
                        点点
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <a-button type="primary" @click="startConnet">开始链接</a-button>
    </div>
</template>

<style scoped lang="scss">
.danmaku-window {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    overflow: hidden;

    .danmaku-list--wrapper {
        flex: 1;
        width: 100%;
        overflow: auto;
        // padding: 0 20px;

        .danmaku-list {
            width: 100%;
            height: 100%;

            .danmaku-list__inner {
                padding: 0 20px;
                padding-bottom: 40px;
                .danmaku-item {
                    display: flex;
                    align-items: center;
                    height: 60px;
                    margin: 20px 0;
                    padding: 0 10px;
                    border-radius: 10px;
                    background-color: pink;

                    .uface{
                        width: 50px;
                        height: 50px;

                        img{
                            width: 50px;
                            height: 50px;
                            border-radius: 25px;
                        }

                    }
                }
            }

        }
    }
}

* {
    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.1);
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }

/* .item__wrapper */

.danmu {
    -webkit-app-region: drag;
    width: 100%;
    height: 30px;
    background-color: #fff;
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

