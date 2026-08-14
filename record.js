// Record a walkthrough of the Wanderly app (1280x720, device centered) to webm.
const { chromium } = require("playwright");
const pause = (p, ms) => p.waitForTimeout(ms);

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    recordVideo: { dir: "video/raw", size: { width: 1280, height: 720 } },
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:4100", { waitUntil: "networkidle" });

  // 1) Explore — let the hero/images breathe, scroll a little
  await pause(page, 2400);
  await page.evaluate(() => { document.getElementById("s-explore").scrollTo({ top: 320, behavior: "smooth" }); });
  await pause(page, 1500);
  await page.evaluate(() => { document.getElementById("s-explore").scrollTo({ top: 0, behavior: "smooth" }); });
  await pause(page, 1100);

  // 2) Open featured stay detail
  await page.click('#s-explore [data-stay="beach"]');
  await pause(page, 2000);
  await page.evaluate(() => { document.getElementById("s-detail").scrollTo({ top: 340, behavior: "smooth" }); });
  await pause(page, 1600);

  // 3) Reserve → booking, play with steppers (live price!)
  await page.click("#reserveBtn");
  await pause(page, 1800);
  await page.click("#nPlus");
  await pause(page, 800);
  await page.click("#nPlus");
  await pause(page, 800);
  await page.click("#gPlus");
  await pause(page, 1200);

  // 4) Confirm → toast → trips
  await page.click("#confirmBtn");
  await pause(page, 2600);

  // 5) Saved / wishlist screen
  await page.click('.nav-item[data-go="saved"]');
  await pause(page, 2200);

  // 6) Profile → open personal info sheet → close → language sheet
  await page.click('.nav-item[data-go="profile"]');
  await pause(page, 1600);
  await page.click('[data-sheet="personal"]');
  await pause(page, 2000);
  await page.click("#sheetClose");
  await pause(page, 800);
  await page.click('[data-sheet="language"]');
  await pause(page, 1800);
  await page.click("#sheetClose");
  await pause(page, 800);

  // 7) Back to Explore to close the loop
  await page.click('.nav-item[data-go="explore"]');
  await pause(page, 1800);

  await ctx.close();
  await browser.close();
  console.log("recording done");
})();
