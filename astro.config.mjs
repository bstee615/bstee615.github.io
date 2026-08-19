import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import fs from "node:fs";
import path from "node:path";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const localImageDimensions = (source) => {
  if (!source.startsWith("/")) return undefined;

  const filePath = path.join(process.cwd(), "public", decodeURIComponent(source.slice(1)));
  if (!fs.existsSync(filePath)) return undefined;

  const buffer = fs.readFileSync(filePath);
  if (buffer.toString("ascii", 1, 4) === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  if (buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") {
    const format = buffer.toString("ascii", 12, 16);
    if (format === "VP8X") {
      return {
        width: buffer.readUIntLE(24, 3) + 1,
        height: buffer.readUIntLE(27, 3) + 1,
      };
    }
    if (format === "VP8L") {
      const bits = buffer.readUInt32LE(21);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >>> 14) & 0x3fff) + 1,
      };
    }

    const frameHeader = buffer.indexOf(Buffer.from([0x9d, 0x01, 0x2a]));
    if (frameHeader !== -1) {
      return {
        width: buffer.readUInt16LE(frameHeader + 3) & 0x3fff,
        height: buffer.readUInt16LE(frameHeader + 5) & 0x3fff,
      };
    }
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    const sizeMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
    while (offset < buffer.length) {
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (sizeMarkers.has(marker)) {
        return {
          width: buffer.readUInt16BE(offset + 7),
          height: buffer.readUInt16BE(offset + 5),
        };
      }
      offset += length + 2;
    }
  }

  return undefined;
};

const rehypeImageDelivery = () => (tree) => {
  const visit = (node) => {
    if (node.type === "element" && node.tagName === "img") {
      node.properties ??= {};
      node.properties.loading ??= "lazy";
      node.properties.decoding ??= "async";

      if (!node.properties.width || !node.properties.height) {
        const dimensions = localImageDimensions(String(node.properties.src ?? ""));
        if (dimensions) Object.assign(node.properties, dimensions);
      }
    }
    node.children?.forEach(visit);
  };

  visit(tree);
};

export default defineConfig({
  site: "https://benjijang.com",
  output: "static",
  trailingSlash: "always",
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypeImageDelivery],
    }),
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
