const puppeteer = require("puppeteer-extra");
const { createCursor } = require("ghost-cursor");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const getAbck = (url) => {
  let browser;
  return new Promise(async (resolve, reject) => {
    try {
      const selector = `.primary-nav-item[data-nav="${Math.floor(
        Math.random() * 5
      )}"]`;
      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
          width: 1920 - Math.floor(Math.random() * 5) * 10,
          height: 1080 + Math.floor(Math.random() * 5) * 10,
        },
      });
      const page = await browser.newPage();
      await page.goto(url);

      const cursor = createCursor(page);
      await cursor.move(selector);
      await page.waitFor(1500);
      await cursor.move(
        `.primary-nav-item[data-nav="${Math.floor(Math.random() * 5)}"]`
      );

      await cursor.click();
      const cookies = await page.cookies();
      await browser.close();
      return resolve(cookies.find((cookie) => cookie.name === "_abck").value);
    } catch (e) {
      console.log(e);
      await browser.close();
      return reject("==");
    }
  });
};

getAbck("https://www.nike.com/launch?s=in-stock")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
