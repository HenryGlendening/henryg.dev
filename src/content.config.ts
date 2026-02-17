import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default("Henry"),
    pubDatetime: z.date(),
    modDatetime: z.date().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    canonicalURL: z.string().url().optional(),
  }),
});

export const collections = { blog };
