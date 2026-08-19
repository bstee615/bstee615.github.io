# Astro migration brief

## Purpose

Replace the inherited academicpages/Jekyll theme with a small, custom Astro site that is easier to understand, faster to evolve, and more recognizably personal.

The migration is successful when the website feels like a concise research notebook and portfolio rather than a generated academic template.

## Product tenets

1. **The homepage introduces a person, not a database.** A visitor should understand Benjamin's current role, research focus, strongest work, recent activity, and personality without opening another page.
2. **Define facts once.** Publications, projects, organizations, links, dates, tags, and service entries have one canonical record. Pages are views over those records.
3. **Show selected work; link to complete archives.** The homepage remains editorial. Full publication, writing, project, and CV views remain available without dominating the introduction.
4. **Research should be visual.** Featured work gets a purposeful figure, diagram, screenshot, or lightweight demo. Decorative stock photography is not a substitute for explaining the work.
5. **Personal details belong, but do not interrupt.** Personal projects, interests, quotes, and small experiments should be easy to discover and visually quieter than the primary research narrative.
6. **Static by default.** Every page is useful as plain HTML. JavaScript is added only for an interaction that materially improves the experience.
7. **Fast is a budget, not a feeling.** Optimize images at build time, self-host fonts when practical, avoid third-party runtime dependencies, and keep the initial page lightweight.
8. **URLs are durable.** Preserve current public URLs or provide explicit redirects. External links, citations, and search results should survive the migration.
9. **Accessibility is part of the design.** Semantic landmarks, visible focus states, useful image alternatives, keyboard navigation, sufficient contrast, and reduced-motion support are required.
10. **Own the visual identity.** Use DaisyUI as a maintained component and theme foundation, then keep site-specific composition in a small set of local components instead of adopting a broad website theme.

## Desired experience

The visual direction combines:

- Michele Tufano's continuous-page clarity and compact timeline/news treatment.
- Robin Ding's pictorial explanation of selected publications.
- Miltos Allamanis's concise professional positioning and undisturbed personal material.
- Julia Gong's confidence in showing projects beyond formal research.
- Boris Cherny's reading width, typography, and lack of interface noise.

The result should be clean rather than card-heavy: sans-serif typography throughout, crisp light surfaces, pastel green and pink accents, generous whitespace, thin rules, and occasional asymmetric composition. It must include a coordinated dark theme rather than treating dark mode as a color inversion.

## Information architecture

### Homepage

1. Hero: current role, research focus, portrait, and primary profile links.
2. Posts and service: compact parallel summaries that make current activity easy to scan.
3. Selected publications: concise rows with year, venue, authors, summary, and direct resource links.
4. Complete archives remain separate; the homepage intentionally avoids reproducing the CV.

### Supporting routes

- `/publications/`: complete, filterable publication archive.
- `/publication/[slug]/`: publication detail generated from the same record.
- `/writing/`: articles and short notes.
- Existing `/posts/.../` routes: preserved for individual posts.
- `/projects/`: research software and personal projects.
- `/cv/`: generated CV view plus a PDF link when available.

## Proposed content model

```text
src/content/
  publications/
  posts/
  notes/
  projects/
  experience/
  education/
  service/
  people/
  venues/
```

Publications should store structured authors, venue, year, abstract, contribution summary, tags, links, and media. Display citations are generated from those fields rather than hand-maintained as a second copy.

Projects and publications may reference each other. A project can appear on the homepage, CV, or publication detail page without being redefined. People and venues should become separate collections only when repeated metadata justifies the extra indirection.

## Performance budget

- Static output on GitHub Pages.
- No required client-side JavaScript for navigation or content.
- Aim for less than 100 KB transferred HTML and CSS on the homepage, excluding images.
- Responsive AVIF/WebP research images with explicit dimensions.
- Lazy-load below-the-fold media.
- DaisyUI and Tailwind are compiled locally; no CDN-loaded CSS framework, icon library, analytics bundle, or web font.
- Target Lighthouse scores of 95 or better in performance, accessibility, best practices, and SEO.

## Migration plan

### 1. Inventory and freeze

- Record current routes, redirects, metadata, feeds, and custom-domain behavior.
- Classify Jekyll includes, plugins, scripts, and data as migrate, replace, or delete.
- Identify duplicated facts and select a canonical source for each.

### 2. Establish the Astro foundation

- Create a static Astro project with strict TypeScript.
- Define content schemas and fail the build on invalid content.
- Add the local design tokens, layout, SEO metadata, feed, sitemap, and 404 page.
- Configure the official Astro GitHub Pages action and custom domain.

### 3. Migrate content

- Convert publications first and generate citations from normalized fields.
- Convert posts and preserve their current permalinks.
- Consolidate CV, education, experience, service, and project data.
- Move owned media beside the content that uses it where practical.

### 4. Build the presentation

- Implement the homepage narrative and selected-work visuals.
- Build complete archive and detail routes from the same records.
- Add responsive navigation, print styles, and accessible interaction states.
- Add interactivity only after the static experience is complete.

### 5. Verify parity

- Compare every old route against the generated output.
- Validate canonical URLs, metadata, RSS, sitemap, redirects, and custom-domain configuration.
- Check mobile, keyboard, reduced-motion, and print behavior.
- Measure output size and Lighthouse results.

### 6. Cut over and clean up

- Deploy the Astro output from a preview branch.
- Review on the custom domain before changing the Pages source.
- Remove Jekyll, Ruby, legacy npm, notebooks, and unused theme assets only after parity is established.
- Keep a tagged pre-migration commit for reference.

## Current implementation

The Astro application now lives at the repository root. Publications and posts are canonical Markdown collections under `src/content/`; CV and service records live under `src/data/`; owned media lives under `public/`. The previous Jekyll implementation and inherited theme runtime have been removed after content and URL parity were established.

The publication illustrations are intentionally schematic placeholders. Final artwork should come from each paper's real figures, systems, screenshots, or purpose-built diagrams.

## Review questions

- Does the hero say enough without becoming a biography?
- Are selected-work visuals informative or too decorative?
- Is the page density comfortable on both desktop and mobile?
- Should news be more prominent, quieter, or removed?
- Does the experience timeline earn its homepage space?
- Which personal material feels natural to include?
- Should the overall tone become more playful, more technical, or more restrained?

## Acceptance criteria

- Every reusable datum has one canonical source.
- Existing public URLs resolve directly or redirect intentionally.
- The homepage works without JavaScript and remains useful with images disabled.
- Featured work has meaningful, consistently sized visual media.
- The site builds reproducibly and deploys to GitHub Pages.
- The old Jekyll toolchain and unused theme code can be removed completely.
