# benjijang.com

Benjamin Steenhoek's personal website, built with Astro.

## Development

```sh
npm install
npm run dev
```

The local site runs at `http://localhost:4321`.

## Content

- `src/content/publications/` contains one Markdown record per publication.
- `src/content/posts/` contains long-form blog posts and short notes.
- `src/data/cv.ts` contains professional experience and education, referencing shared organization IDs.
- `src/data/site.ts` contains shared organizations, external links, service records, and projects.
- `public/media/` contains delivery-optimized site and post images.
- `public/files/` retains publication downloads and legacy media URLs.

Content schemas live in `src/content.config.ts`. The build fails when a record does not match its schema.

### Importing a gist

Import a Markdown gist into the posts collection with:

```sh
npm run import:gist -- https://gist.github.com/USER/GIST_ID
```

The importer derives the slug from the filename, the title from the first H1, the description from the first paragraph, and the date from the gist creation timestamp. Run it with `--help` for metadata overrides and multi-file gist support.

The **Import gist as post** workflow can also be run manually or called from another workflow. It imports the gist, validates the site, and opens a pull request containing the generated post.

## Build and deployment

```sh
npm run build
npm run preview
```

GitHub Actions builds `dist/` and deploys it to GitHub Pages. The custom domain is defined in `public/CNAME`.
