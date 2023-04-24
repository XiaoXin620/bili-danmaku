import { BrowserWindow } from "electron";
import * as remote from '@electron/remote/main';
import { getTransparentWin } from "./transparent";
import { join } from 'node:path';


const devServerUrl = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

remote.initialize();


let  transparentWin: BrowserWindow | null = null;


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