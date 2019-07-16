// File Name         starter -- 
// Project Name      puppet-electron
// Package Name
// 16/07/19 - 10:21
/************************************/
"use strict";
// Puppeteer Example URL: https://try-puppeteer.appspot.com/

// const { default: installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const path = require('path');
const url = require('url');
const { ipcMain } = require('electron');
const electron = require('electron');
/* tslint:disable:no-string-literal */
const app = electron['app'];
/* tslint:disable:no-string-literal */
const BrowserWindow = electron['BrowserWindow'];

// Load In Your Project's Files that need to use puppeteer
const { createScreenshot } = require('./screenshot');

// Application already running, so we close now
if (!app.requestSingleInstanceLock()) {
  app.quit()
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

async function createWindow() {
  let
    startUrl = '';

  // Create the browser window.
  mainWindow = new BrowserWindow(
    {
      width: 480,
      height: 460,
      resizable: process.env.NODE_ENV !== 'Production',
      maximizable: false,
      webPreferences: {
        nodeIntegration: true
      }
    });

  // Add in the devtools
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err));
  //
  // installExtension(REDUX_DEVTOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err));

  // and load the index.html of the app.
  if(process.env.NODE_ENV === 'production') {
    startUrl = url.format({
      pathname: path.join(__dirname, `build${path.sep}index.html`),
      protocol: 'file:',
      slashes: true
    });
  }
  else {
    startUrl = 'http://localhost:9000/';
  }

  await mainWindow.loadURL(startUrl);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', async function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    await createWindow()
  }
});

ipcMain.on('screenshot', () => {
  createScreenshot()
    .then(() => {
      // Do what you need here
    })
    .catch(() => {
      // Report errors or something
    })
});
