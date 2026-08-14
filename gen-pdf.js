const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto("http://localhost:4100/gallery/brochure.html", { waitUntil: "networkidle" });
  await p.waitForTimeout(600);
  await p.pdf({
    path: "Wanderly-Portfolio.pdf",
    width: "210mm", height: "297mm",
    printBackground: true,
    margin: { top: "0", bottom: "0", left: "0", right: "0" },
  });
  await b.close();
  console.log("pdf done");
})();
