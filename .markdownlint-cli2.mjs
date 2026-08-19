export default {
  config: {
    "line-length": false,
    "no-inline-html": {
      allowed_elements: ["a", "div", "figcaption", "figure", "img"],
    },
    "no-duplicate-heading": {
      siblings_only: true,
    },
    "descriptive-link-text": false,
    "no-bare-urls": false,
    "no-hard-tabs": {
      code_blocks: false,
    },
    "first-line-h1": false,
    "single-title": false,
  },
  globs: ["**/*.md", "!node_modules/**", "!dist/**", "!.astro/**"],
};
