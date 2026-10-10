import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostFrontmatter } from "./schema";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const IS_PROD = process.env.NODE_ENV === "production";

export type PostMeta = PostFrontmatter;
export type Post = PostFrontmatter & { content: string };

function readPost(filename: string): Post {
  const slug = filename.replace(/\.(mdx|md)$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = PostFrontmatter.parse({ slug, ...data });
  return { ...frontmatter, content };
}

function isVisible(post: Post) {
  return !IS_PROD || !post.draft;
}

function byDateDesc(a: Post, b: Post) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(readPost)
    .filter(isVisible)
    .sort(byDateDesc);
}

export function getPostBySlug(slug: string): Post | null {
  for (const ext of ["mdx", "md"]) {
    const filePath = path.join(POSTS_DIR, `${slug}.${ext}`);
    if (!fs.existsSync(filePath)) continue;
    const post = readPost(`${slug}.${ext}`);
    if (IS_PROD && post.draft) return null;
    return post;
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getPostsByAuthor(author: string): Post[] {
  return getAllPosts().filter((p) => p.author === author);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getAllAuthors(): string[] {
  const authors = new Set<string>();
  getAllPosts().forEach((p) => authors.add(p.author));
  return Array.from(authors).sort();
}

export function getPostContent(slug: string): string {
  return getPostBySlug(slug)?.content ?? "";
}
