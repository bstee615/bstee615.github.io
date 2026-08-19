import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const usage = `Usage:
  npm run import:gist -- <gist-url-or-id> [options]

Options:
  --filename <name>       Markdown file to import when a gist has multiple files
  --slug <slug>           Output slug (defaults to the Markdown filename)
  --title <title>         Post title (defaults to the first Markdown H1)
  --description <text>    Post description (defaults to the first paragraph)
  --date <date>           Publication date (defaults to the gist creation date)
  --tags <a,b,c>          Comma-separated tags (defaults to blog-post,gist)
  --kind <blog|stream>    Post kind (defaults to blog)
  --legacy-url <path>     Legacy URL (defaults to /writing/<slug>/)
  --keep-heading          Keep the leading H1 in the post body
`;

const [gistReference, ...tokens] = process.argv.slice(2);
if (!gistReference || gistReference === "--help" || gistReference === "-h") {
  console.log(usage);
  process.exit(gistReference ? 0 : 1);
}

const options = {};
for (let index = 0; index < tokens.length; index += 1) {
  const token = tokens[index];
  if (token === "--keep-heading") {
    options.keepHeading = true;
    continue;
  }
  if (!token.startsWith("--") || !tokens[index + 1]) {
    throw new Error(`Invalid option: ${token}\n\n${usage}`);
  }
  options[token.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = tokens[index + 1];
  index += 1;
}

const gistId = gistReference
  .replace(/\/+$/, "")
  .split("/")
  .at(-1)
  ?.replace(/\.git$/, "");
if (!gistId || !/^[a-f0-9]+$/i.test(gistId)) {
  throw new Error(`Could not determine a gist ID from "${gistReference}".`);
}

const response = await fetch(`https://api.github.com/gists/${gistId}`, {
  headers: {
    Accept: "application/vnd.github+json",
    "User-Agent": "benjijang.com-gist-importer",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
if (!response.ok) {
  throw new Error(`GitHub returned ${response.status} while fetching gist ${gistId}.`);
}

const gist = await response.json();
const markdownFiles = Object.values(gist.files).filter((file) => /\.md$/i.test(file.filename));
const gistFile = options.filename
  ? gist.files[options.filename]
  : markdownFiles.length === 1
    ? markdownFiles[0]
    : undefined;
if (!gistFile) {
  const available = Object.keys(gist.files).join(", ");
  throw new Error(`Select one Markdown file with --filename. Available files: ${available}`);
}

const rawContent = gistFile.truncated
  ? await fetch(gistFile.raw_url).then((rawResponse) => {
      if (!rawResponse.ok) throw new Error(`Could not fetch ${gistFile.raw_url}.`);
      return rawResponse.text();
    })
  : gistFile.content;
const normalizedContent = rawContent.replace(/\r\n/g, "\n").trim();
const headingMatch = normalizedContent.match(/^#\s+(.+)$/m);
const title = options.title ?? headingMatch?.[1];
if (!title) {
  throw new Error("No title supplied and no Markdown H1 was found.");
}

const body = options.keepHeading || !headingMatch
  ? normalizedContent
  : normalizedContent.replace(`${headingMatch[0]}\n`, "").trimStart();
const firstParagraph = body
  .split(/\n\s*\n/)
  .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
  .find((paragraph) => paragraph && !/^(?:[-*#>]|\d+\.)\s/.test(paragraph));
const description = options.description ?? firstParagraph
  ?.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
  .replace(/[*_`]/g, "");
if (!description) {
  throw new Error("No description supplied and no prose paragraph was found.");
}

const slug = options.slug ?? gistFile.filename.replace(/\.md$/i, "");
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  throw new Error(`Slug "${slug}" must contain only lowercase letters, numbers, and hyphens.`);
}

const kind = options.kind ?? "blog";
if (!["blog", "stream"].includes(kind)) {
  throw new Error(`Kind must be "blog" or "stream", not "${kind}".`);
}

const tags = (options.tags ?? "blog-post,gist")
  .split(",")
  .map((tag) => tag.trim())
  .filter(Boolean);
const date = new Date(options.date ?? gist.created_at);
if (Number.isNaN(date.valueOf())) {
  throw new Error(`Invalid date: ${options.date}`);
}

const yamlString = (value) => JSON.stringify(value);
const frontmatter = [
  "---",
  `title: ${yamlString(title)}`,
  `description: ${yamlString(description)}`,
  `date: ${date.toISOString()}`,
  "tags:",
  ...tags.map((tag) => `  - ${yamlString(tag)}`),
  `kind: ${kind}`,
  `legacyUrl: ${yamlString(options.legacyUrl ?? `/writing/${slug}/`)}`,
  "---",
].join("\n");

const outputPath = path.resolve("src", "content", "posts", `${slug}.md`);
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${frontmatter}\n\n${body}\n`, "utf8");
console.log(`Imported ${gist.html_url}#file-${gistFile.filename.replaceAll(".", "-")} to ${outputPath}`);
