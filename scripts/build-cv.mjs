import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import MarkdownIt from "markdown-it";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "cv", "cv.md");
const cssPath = path.join(root, "cv", "cv.css");
const source = await fs.readFile(sourcePath, "utf8");
const css = await fs.readFile(cssPath, "utf8");
const frontMatter = source.match(/^---\n([\s\S]*?)\n---\n/);
if (!frontMatter) throw new Error("CV front matter is missing.");
const metadata = Object.fromEntries(
  frontMatter[1].split("\n").map((line) => {
    const split = line.indexOf(":");
    return [line.slice(0, split).trim(), line.slice(split + 1).trim()];
  }),
);
const markdown = source.slice(frontMatter[0].length);
const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
const rendered = md.render(markdown);
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${metadata.title}</title><style>${css}</style></head><body>${rendered}</body></html>`;
const outputPath = path.join(root, metadata.output);
const previewPath = path.join(root, "cv", "cv.html");
await fs.writeFile(previewPath, html);
await fs.mkdir(path.dirname(outputPath), { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.route("https://benjijang.com/images/*.svg", async (route) => {
  const filename = path.basename(new URL(route.request().url()).pathname);
  const body = await fs.readFile(path.join(root, "public", "images", filename));
  await route.fulfill({ body, contentType: "image/svg+xml" });
});
await page.goto(`file://${previewPath}`, { waitUntil: "load" });
await page.pdf({
  path: outputPath,
  format: "Letter",
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();
console.log(`Generated ${path.relative(root, outputPath)}`);
