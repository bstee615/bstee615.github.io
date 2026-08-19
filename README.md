# benjijang.com

Benjamin Steenhoek's personal site for research, publications, projects, a CV,
and technical writing. It is a static Astro site deployed to GitHub Pages at
`https://benjijang.com`.

## Architecture

- `src/content/posts/` and `src/content/publications/` are the canonical
  Markdown collections. `src/content.config.ts` validates their frontmatter.
- `src/data/site.ts` owns shared identity, organizations, links, projects,
  service venues, and service/talk records. `src/data/cv.ts` owns CV entries.
- `src/routes.ts` owns canonical route construction. `src/utils/` owns shared
  date, post-compatibility, and publication formatting rules.
- `src/pages/` derives static pages and legacy redirects from the collections.
  Layouts and components own presentation; `src/scripts/site.ts` owns the
  small client runtime for themes, transitions, history, scrolling, and code
  copy.
- `public/media/` contains optimized images used by the current site.
  `public/files/` contains downloads and compatibility assets whose public URLs
  must remain stable.

CV entry bodies are trusted, repository-authored HTML because their dense prose
contains many inline links. The `bodyHtml` field makes that boundary explicit;
it must never receive user-provided content. Publication citations are rendered
as text and highlighted structurally.

## Development

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

## Updating content

### Posts

1. Add `src/content/posts/<slug>.md`. The filename is the canonical slug at
   `/writing/<slug>/`.
2. Set `title`, `description`, an ISO `date` (`YYYY-MM-DD`), and `kind`
   (`blog` or `stream`). Optional fields are `math` and `cover`; covers require
   paths, intrinsic dimensions, alt text, and optional credit.
3. Put optimized delivery images in `public/media/` and reference them with
   root-relative URLs. Keep downloads or previously published asset URLs in
   `public/files/`.
4. Review legacy routing in `src/utils/posts.ts`. Streams automatically retain
   `/stream/<slug>/`; blogs retain `/posts/YYYY/MM/<slug>/`. Add an override
   when an old slug differs, or explicitly disable a route that never existed.
5. Run `npm run check` and verify the canonical and legacy URLs.

### Publications

1. Add `src/content/publications/<id>.md`; the ID becomes
   `/publication/<id>/`.
2. Set `title`, `summary`, ISO `date`, `venue`, `venueType`, `authors`,
   `citation`, and `links`. Use a venue type from `src/content.config.ts`.
3. Set `selected: true` for homepage/CV prominence,
   `excludeFromCv: true` when appropriate, and an optional `visual` only when a
   matching `WorkVisual` illustration exists.
4. Put papers in `public/files/`, use root-relative download URLs, and run
   `npm run check`.

### Projects

1. Add one record to `projects` in `src/data/site.ts`.
2. Provide `title`, `description`, `href`, and an ISO `published` date.
3. Keep the array readable; homepage ordering is derived from the date.
4. Run `npm run check`.

### Service and talks

1. Add a reusable venue to `serviceVenues` in `src/data/site.ts` when needed.
2. Add a `serviceRecords` entry with ISO `date`, the typed venue ID, and
   `role` (for example, `Reviewer`, `Program committee`, or `Invited talk`).
3. Do not repeat venue labels, titles, or URLs in individual records.
4. Run `npm run check`.

### Importing a gist

```sh
npm run import:gist -- https://gist.github.com/USER/GIST_ID
npm run import:gist -- --help
```

The importer derives the slug from the Markdown filename, title from the first
H1, description from the first prose paragraph, and date from the gist creation
timestamp. Use the documented flags for multi-file gists and metadata
overrides, then review the generated Markdown and legacy route behavior.

The **Import gist as post** workflow offers the same flow through
`workflow_dispatch` or `workflow_call`; it validates the site and opens a
content pull request.

## Deployment

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
