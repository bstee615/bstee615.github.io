import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import {
  publicationVenueTypes,
  publicationVisuals,
} from "./utils/publications";

const linkSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1),
});

const coverSchema = z.object({
  src: z.string().startsWith("/"),
  srcMedium: z.string().startsWith("/").optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
  credit: z
    .object({
      name: z.string().min(1),
      id: z.string().min(1).optional(),
    })
    .optional(),
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
    links: z.array(linkSchema).default([]),
    selected: z.boolean().default(false),
    excludeFromCv: z.boolean().default(false),
    visual: z.enum(publicationVisuals).optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    kind: z.enum(["blog", "stream"]),
    cover: coverSchema.optional(),
    math: z.boolean().default(false),
  }),
});

export const collections = { publications, posts };
