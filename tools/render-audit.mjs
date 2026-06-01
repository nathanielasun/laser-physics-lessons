import { chromium } from "playwright";
const B = "https://nathanielasun.github.io/laser-physics-lessons";
const slugs = [];
for (let i=1;i<=21;i++) slugs.push("ch"+String(i).padStart(2,"0"));
["A","B","C","D","E","F","G","H","I"].forEach(x=>slugs.push("app"+x));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport:{width:1100,height:900} });
let problems = 0;
for (const s of slugs) {
  const errs = [];
  const onerr = m => m.type()==="error" && errs.push(m.text());
  const onpage = e => errs.push("PAGEERROR:"+e.message);
  page.on("console", onerr); page.on("pageerror", onpage);
  let ok=false;
  for (let t=0;t<3 && !ok;t++){ try{ await page.goto(`${B}/chapters/${s}/`,{waitUntil:"networkidle",timeout:15000}); ok=true;}catch{await page.waitForTimeout(1500);} }
  await page.waitForTimeout(700);
  const katex = await page.locator(".katex").count();
  const canvas = await page.locator("canvas").count();
  const redErr = await page.locator(".katex-error").count();
  const flag = (!ok||errs.length||katex<3||canvas<1||redErr>0) ? "  <-- CHECK" : "";
  if (flag) problems++;
  console.log(`${s.padEnd(6)} load:${ok?"ok":"FAIL"} katex:${String(katex).padStart(3)} canvas:${canvas} katexErr:${redErr} consoleErr:${errs.length}${flag}`);
  errs.slice(0,2).forEach(e=>console.log("        "+e.slice(0,110)));
  page.off("console", onerr); page.off("pageerror", onpage);
}
console.log(`\n${problems} page(s) flagged of ${slugs.length}`);
await browser.close();
