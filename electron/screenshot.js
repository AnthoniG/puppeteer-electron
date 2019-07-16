// File Name         screenshot -- 
// Project Name      puppet-electron
// Package Name
// 16/07/19 - 10:28
/************************************/
"use strict";
const { puppeteer } = require('puppeteer');

async function createScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://example.com');
  await page.screenshot({path: 'example.png'});
  await browser.close();
}

exports.createScreenshot = createScreenshot;
