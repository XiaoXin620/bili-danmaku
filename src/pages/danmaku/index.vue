<template>
    <div class="danmaku-window">
        <div class="danmu">
        </div>
        <div class="danmaku-list--wrapper">
            <div class="danmaku-list">
                <div class="danmaku-list__inner">
                    <div class="danmaku-item" v-for="item in messageList" :key="item.msg_id">
                        <div class="uface--wrapper">
                            <img :src="item.uface">
                        </div>
                        <div class="danmaku-item--wrapper">
                            <div class="uname">
                                {{  item.uname }}
                            </div>
                            <div class="msg">
                                {{ item.msg }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a-button type="primary" @click="startConnet">开始链接</a-button>
    </div>
</template>
<script setup lang="ts">

import { getCurrentWindow } from '@electron/remote';
import { createSocket } from '../socket'
import axios from 'axios';
import { reactive } from 'vue';
const api = axios.create({
    baseURL: "http://localhost:3000",
})

interface MessageData {
    room_id: number,//弹幕接收的直播间
    uid: number,//用户UID
    uname: string,//用户昵称
    msg: string,//弹幕内容
    msg_id: string,//消息唯一id
    fans_medal_level: number,//对应房间勋章信息
    fans_medal_name:string, //粉丝勋章名
    fans_medal_wearing_status: boolean,//该房间粉丝勋章佩戴情况
    guard_level: number,//对应房间大航海 1总督 2提督 3舰长
    timestamp: number,//弹幕发送时间秒级时间戳
    uface: string//用户头像   
    emoji_img_url: string, //表情包图片地址
    dm_type: number,//弹幕类型 0：普通弹幕 1：表情包弹幕

}

interface MessageBody {
    cmd: string,
    data: MessageData
}

const messageList = reactive<MessageData[]>([]);


const onReceivedMessage = (res: MessageBody) => {
    console.log("收到消息", res);
    console.log("收到消息cmd", res.cmd);
    messageList.push(res.data)
}
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
                    createSocket(auth_body, wss_link, onReceivedMessage)
                }
            }

        })
    // .catch((err) => {
    //     console.log("-----鉴权失败-----")
    // })
}

</script>


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
                    height: 60px;
                    margin: 20px 0;
                    padding: 0 10px;
                    border-radius: 10px;
                    background-color: pink;

                    .uface--wrapper {
                        display: flex;
                        align-items: center;
                        height: 100%;

                        img {
                            width: 50px;
                            height: 50px;
                            border-radius: 25px;
                        }

                    }

                    .danmaku-item--wrapper {
                        box-sizing: border-box;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-left: 10px;
                        padding: 10px 0;
                        height: 100%;

                        .uname {
                            color: #ff1493;
                            font-size: 14px;
                            font-weight: 500;
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

