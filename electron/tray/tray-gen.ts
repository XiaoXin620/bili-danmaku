import path from 'node:path';
import { app, Menu, nativeImage, Tray } from "electron";

export let tray: Tray | null = null;

export const trayGenerator = () => {
  const iconName = process.platform === "win32" ? "favicon.ico" : "favicon.png";

  const icon = nativeImage.createFromPath(
    path.join(process.env.PUBLIC, iconName)
  );
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "哔哩哔哩 弹幕库",
      enabled: false
    },
    {
      label: "时钟",
      click: () => {
      }
    },
    {
      label: "弹幕姬",
      click: () => {
      }
    },
    {
      label: "点歌姬",
      click: () => {
      }
    },
    { type: "separator" },
    {
      label: "控制面板",
      click: () => {
      }
    },
    {
      label: "数据统计",
      id: "stat",
      type: "checkbox",
      checked: false,
      click() {
        const checked = contextMenu.getMenuItemById("stat")?.checked ?? false;
        console.log(checked);
      }
    },
    { type: "separator" },
    {
      label: "退出程序",
      click: () => {
        app.quit();
      }
    }
  ]);
  tray.setToolTip("哔哩哔哩弹幕库");
  tray.setContextMenu(contextMenu);
};
