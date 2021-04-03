/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import emitter from 'events';

import { CPU_Info, CPU_USAGE, CPU_TEMP, CPU_TIME } from '../SI/CPU';
import { GPU_Info } from '../SI/GPU';
import { Memory_Info } from '../SI/Memory';
import { Devices_Info, Printer_Info } from '../SI/Devices';

import { Extra_CPU_Info } from '../SI/CPU';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: process.env.NODE_ENV === 'development' ? 1425 : 1200,
    height: 720,
    frame: false,
    icon: getAssetPath('icon_2.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
      getCPUInfo();
      getExtraCpuInfo();
      getDevicesInfo();

      setInterval(() => {
        getMemoryInfo();
        getGPUInfo();
        getCPUUsage();
      }, 1000);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

ipcMain.on('close-app', (event, arg) => {
  app.quit();
});

ipcMain.on('mini-me', (event, arg) => {
  BrowserWindow.getFocusedWindow()?.minimize();
});

// System Information
const getCPUInfo = async () => {
  const data = await CPU_Info();
  mainWindow?.webContents.send('CPU_INFO:get', data);
};

const getCPUUsage = async () => {
  const cpuUsageData = await CPU_USAGE();
  const cpuTime = await CPU_TIME();
  const cpuTemp = await CPU_TEMP();
  mainWindow?.webContents.send('CPU_USAGE:get', {
    cpuUsageData,
    cpuTime,
    cpuTemp,
  });
};

const getGPUInfo = async () => {
  const data = await GPU_Info();
  mainWindow?.webContents.send('GPU_INFO:get', data);
};

const getMemoryInfo = async () => {
  const data = await Memory_Info();
  mainWindow?.webContents.send('Memory_INFO:get', data);
};

const getDevicesInfo = async () => {
  const devicesData = await Devices_Info();
  const printerData = await Printer_Info();
  mainWindow?.webContents.send('Devices_INFO:get', {
    devicesData,
    printerData,
  });
};

// Extra info | Not to be used
const getExtraCpuInfo = async () => {
  const data = await Extra_CPU_Info();
};
