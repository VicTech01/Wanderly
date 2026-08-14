const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport:{width:1280,height:720}, deviceScaleFactor:1 });
  const p = await ctx.newPage();
  for (const n of ["vid-intro","vid-outro"]) {
    await p.goto("http://localhost:4100/gallery/"+n+".html",{waitUntil:"networkidle"});
    await p.waitForTimeout(400);
    await p.screenshot({path:`video/${n}.png`, clip:{x:0,y:0,width:1280,height:720}});
    console.log("card",n);
  }
  await b.close();
})();
