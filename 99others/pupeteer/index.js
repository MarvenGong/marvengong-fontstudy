const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    width: 1920,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });
  browser.on('disconnected', () => {
    console.log('与浏览器的连接断开');
  })
  const page = await browser.newPage();
  page.setViewport({
    width: 1920,
    height: 1080,
  })
  page.on('close', async () => {
    console.log('页面被关闭了');
    await browser.close();
  })
  // page.on('console', (msg) => console.log(msg.text()));
  // page.evaluate(() => console.log('hello', 5, {foo: 'bar'}));
  await page.goto('https://ecs.tencent.com');
  if (!fs.existsSync('./files')) {
    fs.mkdirSync('./files');
  }
  
  await page.evaluate(() => console.log(`url is ${location.href}`));
  await page.screenshot({path: './files/example.png'});

  await page.pdf({
    path: './files/demo.pdf',
    format: 'A4',
  })

  await page.mouse.move(0, 0);
  await page.mouse.down();
  await page.mouse.move(0, 100);
  await page.mouse.move(100, 100);
  await page.mouse.move(100, 0);
  await page.mouse.move(0, 0);
  await page.mouse.up();
  const $btnLogin = await page.$('.btn-login');
  const rectInfo = await $btnLogin.boundingBox();
  console.log('登录按钮的位置', rectInfo);
  await $btnLogin.click();
})();