// Visual smoke-test: render pages in headless Chromium, capture console errors,
// exercise the sim, and save screenshots. Usage: node tools/shoot.mjs <base> <slug...>
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3210";
const slugs = process.argv.slice(3);
const targets = [["home", `${base}/`], ...slugs.map((s) => [s, `${base}/chapters/${s}/`])];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 900 }, deviceScaleFactor: 2 });

for (const [name, url] of targets) {
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  // retry until dev server is ready
  let ok = false;
  for (let i = 0; i < 40 && !ok; i++) {
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 4000 });
      ok = true;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  if (!ok) {
    console.log(`${name}: FAILED to load ${url}`);
    continue;
  }
  await page.waitForTimeout(1200); // let canvas/rAF paint a few frames
  const katex = await page.locator(".katex").count();
  const canvas = await page.locator("canvas").count();
  await page.screenshot({ path: `/tmp/shot-${name}.png`, fullPage: true });
  console.log(`${name}: OK  katex=${katex} canvas=${canvas} errors=${errors.length}`);
  errors.slice(0, 6).forEach((e) => console.log(`   ⚠ ${e}`));
}

await browser.close();
