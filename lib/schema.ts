import { z } from "zod";

export const PostFrontmatter = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  tags: z.array(z.string()).default([]),
  author: z.string(),
  canonical: z.string().url().optional(),
  draft: z.boolean().default(false),
});

export type PostFrontmatter = z.infer<typeof PostFrontmatter>;
