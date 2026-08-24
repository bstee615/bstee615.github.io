# Repository guidance

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
- `public/images/` contains the site's flat, canonical image and icon set.
  `public/files/` contains downloads whose public URLs must remain stable.

CV entry bodies are trusted, repository-authored HTML because their dense prose
contains many inline links. The `bodyHtml` field makes that boundary explicit;
it must never receive user-provided content. Publication citations are rendered
as text and highlighted structurally.

## Updating content

### Posts

1. Add `src/content/posts/<slug>.md`. The filename is the canonical slug at
   `/writing/<slug>/`.
2. Set `title`, `description`, an ISO `date` (`YYYY-MM-DD`), and `kind`
   (`blog` or `stream`). Optional fields are `math` and `cover`; covers require
   paths, intrinsic dimensions, alt text, and optional credit.
3. Put optimized delivery images in the flat `public/images/` directory and
   reference them with root-relative URLs. Keep downloads in `public/files/`.
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

The importer derives the slug from the Markdown filename, title from the first
H1, description from the first prose paragraph, and date from the gist creation
timestamp. Use its documented flags for multi-file gists and metadata
overrides, then review the generated Markdown and legacy route behavior.

The **Import gist as post** workflow offers the same flow through
`workflow_dispatch` or `workflow_call`; it validates the site and opens a
content pull request.

### Optimizing images

Use `scripts/optimize-images.mjs` for new raster assets. It requires ImageMagick
and writes a normalized WebP to the flat `public/images/` directory by default.
Keep source images outside `public/`; do not commit both an original and an
optimized derivative.

```sh
npm run optimize:images -- ~/Downloads/example.png
npm run optimize:images -- --width 1100 --quality 80 ~/Downloads/example.png
npm run optimize:images -- --help
```
