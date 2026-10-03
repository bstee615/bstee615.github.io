export default {
  config: {
    "line-length": false,
    "no-inline-html": {
      allowed_elements: [
        "a",
        "aside",
        "div",
        "figcaption",
        "figure",
        "img",
        "p",
      ],
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
  globs: [
    "**/*.md",
    "!node_modules/**",
    "!dist/**",
    "!.astro/**",
    "!playwright-report/**",
    "!test-results/**",
  ],
};
