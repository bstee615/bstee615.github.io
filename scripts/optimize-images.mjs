import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(root, "public");
let outputDir = path.join(publicRoot, "images");
let maxWidth = 1520;
let quality = 82;
let name;
const inputs = [];

const usage = `Usage: npm run optimize:images -- [options] IMAGE...

Options:
  --width PX         Maximum output width (default: 1520)
  --quality N        WebP quality from 1 to 100 (default: 82)
  --name NAME        Output basename; valid with one image only
  --output-dir PATH  Output directory (default: public/images)
  --help             Show this help
`;

const readValue = (args, index, flag) => {
  const value = args[index + 1];
  if (!value || value.startsWith("--"))
    throw new Error(`${flag} needs a value.`);
  return value;
};

const args = process.argv.slice(2);
for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === "--help") {
    process.stdout.write(usage);
    process.exit(0);
  }
  if (arg === "--width") {
    maxWidth = Number(readValue(args, index, arg));
    index += 1;
  } else if (arg === "--quality") {
    quality = Number(readValue(args, index, arg));
    index += 1;
  } else if (arg === "--name") {
    name = readValue(args, index, arg);
    index += 1;
  } else if (arg === "--output-dir") {
    outputDir = path.resolve(root, readValue(args, index, arg));
    index += 1;
  } else if (arg.startsWith("--")) {
    throw new Error(`Unknown option: ${arg}`);
  } else {
    inputs.push(path.resolve(arg));
  }
}

if (inputs.length === 0) throw new Error(`No images provided.\n\n${usage}`);
if (name && inputs.length !== 1)
  throw new Error("--name requires exactly one image.");
if (!Number.isInteger(maxWidth) || maxWidth < 1)
  throw new Error("--width must be a positive integer.");
if (!Number.isInteger(quality) || quality < 1 || quality > 100)
  throw new Error("--quality must be an integer from 1 to 100.");

const simplifyName = (filename) =>
  filename
    .replace(path.extname(filename), "")
    .replace(/^\d{4}(?:-\d{2}){0,2}-/, "")
    .replace(/-md-pasted-image-\d+$/i, "")
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

const run = (command, commandArgs) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`${command} exited with ${code}.`)),
    );
  });

await fs.mkdir(outputDir, { recursive: true });
for (const input of inputs) {
  if (input === publicRoot || input.startsWith(`${publicRoot}${path.sep}`)) {
    throw new Error(`Keep source images outside public/: ${input}`);
  }
  await fs.access(input);
  const basename = simplifyName(name ?? path.basename(input));
  if (!basename) throw new Error(`Could not derive a filename from ${input}.`);
  const output = path.join(outputDir, `${basename}.webp`);
  await run("magick", [
    input,
    "-auto-orient",
    "-strip",
    "-resize",
    `${maxWidth}x>`,
    "-quality",
    String(quality),
    output,
  ]);
  console.log(path.relative(root, output));
}
