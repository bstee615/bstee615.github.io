# https://benjijang.com

My personal website with blogs and CV.

## Data model

Posts and publications are Astro content collections validated by
[`src/content.config.ts`](src/content.config.ts).

| Item            | Schema                                                                                                                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Posts           | `title`, `description`, `date`, and `kind` (`blog` or `stream`); optional `cover` and `math`                                                       |
| Publications    | `title`, `summary`, `date`, `venue`, and `venueType`; defaulted `authors`, `citation`, `links`, `selected`, and `excludeFromCv`; optional `visual` |
| Projects        | `title`, `description`, `href`, and ISO `published` date                                                                                           |
| Service records | ISO `date`, reusable `venue` ID, and `role`                                                                                                        |
| CV entries      | `title`, `organizationId`, `location`, and trusted `bodyHtml`; optional `date` and `more`                                                          |

| Data                                                       | Location                                                                             |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Posts                                                      | [`src/content/posts/`](src/content/posts/)                                           |
| Publications                                               | [`src/content/publications/`](src/content/publications/)                             |
| Site metadata, links, organizations, projects, and service | [`src/data/site.ts`](src/data/site.ts)                                               |
| Web CV experience and education                            | [`src/data/cv.ts`](src/data/cv.ts)                                                   |
| PDF CV content and styles                                  | [`cv/academic-cv.md`](cv/academic-cv.md), [`cv/academic-cv.css`](cv/academic-cv.css) |
| Routes                                                     | [`src/routes.ts`](src/routes.ts)                                                     |

## Development

- **Website:** Astro, TypeScript, Markdown content collections, and CSS
- **Math:** Remark/Rehype with KaTeX
- **PDF CV:** Markdown rendered with Markdown-It and printed with Playwright's
  headless Chromium using a dedicated CSS stylesheet
- **Quality:** Prettier, ESLint, Astro Check, Markdownlint, and Playwright
- **Hosting:** Static Astro output deployed to GitHub Pages with GitHub Actions

Node.js 22 and npm are required.

```sh
npm ci
npm run dev
```

The development server runs at `http://localhost:4321`.

| Command                | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Start the Astro development server                 |
| `npm run build`        | Build the static site into `dist/`                 |
| `npm run preview`      | Preview the built site                             |
| `npm run format`       | Apply Prettier formatting                          |
| `npm run format:check` | Check formatting without changing files            |
| `npm run lint`         | Check formatting, code, types, Astro, and Markdown |
| `npm run test:e2e`     | Run the Playwright suite against an existing build |
| `npm test`             | Build, then run the Playwright suite               |
| `npm run check`        | Run all lint, build, and frontend checks           |

Run `npm run check` before opening a pull request.

### Build the PDF CV

[`scripts/build-cv.mjs`](scripts/build-cv.mjs) renders the Markdown CV to
`public/files/benjamin-steenhoek-cv-2026.pdf`.

```sh
npm run build:cv
```

### Import a gist

[`scripts/import-gist.mjs`](scripts/import-gist.mjs) imports a gist as a post.

```sh
npm run import:gist -- https://gist.github.com/USER/GIST_ID
npm run import:gist -- --help
```

### Deployment

`.github/workflows/deploy.yml` runs on pull requests and on pushes to `master`.
The **Lint and build** job creates `dist/`. The **Frontend tests** job is
temporarily disabled because hosted runs are taking too long; Playwright
remains available locally through `npm run test:e2e`. After **Lint and build**
succeeds, the `master` run uploads its artifact and deploys it with GitHub
Pages.

GitHub Pages uses GitHub Actions as its source. `public/CNAME` is copied into
the build and preserves the `benjijang.com` custom domain. Repository branch
protection should require the exact check **Lint and build** before merging.
Re-enable **Frontend tests** as a required check when frontend CI is restored;
configure those rules in GitHub rather than assuming they are already enabled.
