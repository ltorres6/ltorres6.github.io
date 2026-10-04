import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const publications = defineCollection({
  loader: file('src/content/publications.json'),
  schema: z.object({
    title: z.string(),
    /** Display form, "Surname Initials". Luis is any entry starting "Torres L". */
    authors: z.array(z.string()).min(1),
    /** True when the author list above is truncated. */
    etAl: z.boolean().default(false),
    coFirst: z.boolean().default(false),
    venue: z.string(),
    year: z.number().int(),
    type: z.enum(['journal', 'conference', 'preprint', 'thesis']),
    citations: z.number().int().nonnegative().default(0),
    doi: z.string().optional(),
    url: z.url().optional(),
    /** Shown on the home page. */
    selected: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: file('src/content/projects.json'),
  schema: z.object({
    name: z.string(),
    kind: z.string(),
    url: z.url(),
    summary: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    /** Display order, ascending. */
    order: z.number().int().default(99),
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    dateAdded: z.coerce.date(),
  }),
});

export const collections = { publications, projects, recipes };
