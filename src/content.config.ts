import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { publicationVenueTypes } from "./utils/publications";

const linkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

const publications = defineCollection({
  loader: glob({ base: "./src/content/publications", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    venue: z.string(),
    venueType: z.enum(publicationVenueTypes),
    authors: z.array(z.string()).default([]),
    citation: z.string().default(""),
    tags: z.array(z.string()).default([]),
    links: z.array(linkSchema).default([]),
    selected: z.boolean().default(false),
    excludeFromCv: z.boolean().default(false),
    visual: z.enum(["trace", "mutation", "feedback", "dataflow"]).optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    kind: z.enum(["blog", "stream"]).default("blog"),
    legacyUrl: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCreditName: z.string().optional(),
    imageCreditId: z.string().optional(),
  }),
});

export const collections = { publications, posts };
