import { BrowserWindow } from "electron";
import * as remote from '@electron/remote/main';
import { getTransparentWin } from "./transparent";
import { join } from 'node:path';
import { getDanmakuWin } from "./danmaku";


const devServerUrl = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

remote.initialize();


let  transparentWin: BrowserWindow | null = null;
let  danmakuWin: BrowserWindow | null = null;

export const showDanmakuWin = () => {
    if(!danmakuWin) {
        danmakuWin = getDanmakuWin()
        remote.enable(danmakuWin.webContents)
        if(process.env.VITE_DEV_SERVER_URL) {
            danmakuWin.loadURL(devServerUrl + '#/danmaku')
        } else {
            danmakuWin.loadFile(indexHtml, { hash: '/danmaku'})
        }
        danmakuWin.addListener('close', () => {
            danmakuWin = null
        })
    }
    danmakuWin.show()
    return danmakuWin;
}


export const showTransparentWin = () => {
    if(!transparentWin) {
        transparentWin = getTransparentWin()
        remote.enable(transparentWin.webContents)
        if(process.env.VITE_DEV_SERVER_URL) {
            transparentWin.loadURL(devServerUrl + '#/transparent')
        } else {
            transparentWin.loadFile(indexHtml, { hash: '/transparent'})
        }
        transparentWin.addListener('close',() => {
            transparentWin = null;
        })
    }
    transparentWin.show();

    return transparentWin;
}