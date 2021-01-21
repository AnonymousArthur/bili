#!/usr/bin/env node

const puppeteer = require("puppeteer-core");
const fs = require("fs-extra");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
      executablePath: process.env.CHROME_PATH || "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
      headless: false,
      args: ["--window-size=800,600"]
  });
  const page = await browser.newPage();
  await page.goto("https://passport.bilibili.com/login");
  const { username, password } = parseUsernamePassword();
  if (!username || !password) {
    console.error(
      "Place username and password in automatic.login file to login!!"
    );
    process.exit(1);
  }
  await page.type("#login-username", username);

  await page.type("#login-passwd", password);

  await Promise.all([
    page.click(".btn-box .btn-login"),
    page.waitForNavigation({ waitUntil: "networkidle0", timeout: 0 }),
  ]);
  const cookie = await page.cookies();
  writeCookie(cookie);
  await browser.close();
  console.log(`Welcome ${username}!`);
})();

function parseUsernamePassword() {
  let keyStore = path.join(__dirname, "..", "automatic.login");

  if (fs.existsSync(keyStore)) {
    keyStore = fs.readFileSync(keyStore).toString();
    const [username, password] = keyStore.split(/\r?\n/);
    return {
      username,
      password,
    };
  }
  return {};
}

function writeCookie(cookie) {
  const cookieString = `"${cookie
    .reduce((cookies, c) => {
      const { name, value, domain } = c;
      if (domain && domain.includes("bilibili.com")) {
        cookies[name] = value;
        cookies.push(`${name}=${value}`);
      }
      return cookies;
    }, [])
    .join("; ")}"`;

  fs.writeFileSync(path.join(__dirname, "..", "cookie.txt"), cookieString);
}
