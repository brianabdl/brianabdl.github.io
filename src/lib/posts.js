import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

/**
 * Read every .md file in /posts and return its metadata + slug,
 * sorted newest first. Runs at build time only.
 */
export function getAllPosts() {
    if (!fs.existsSync(postsDirectory)) return [];

    const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

    const posts = files.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
            slug,
            title: data.title ?? slug,
            description: data.description ?? "",
            date: data.date ?? null,
            tags: data.tags ?? [],
            cover: data.cover ?? "",
        };
    });

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Read a single post (metadata + raw markdown body) by its slug.
 */
export function getPostBySlug(slug) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? null,
        tags: data.tags ?? [],
        cover: data.cover ?? "",
        content,
    };
}

export function getAllSlugs() {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs
        .readdirSync(postsDirectory)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(/\.md$/, ""));
}

/**
 * Turn a tag label into a URL-safe slug, e.g. "Next JS" -> "next-js".
 */
export function slugifyTag(tag) {
    return String(tag)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

/**
 * Every unique tag across all posts, with its slug and post count,
 * sorted by count (then alphabetically).
 */
export function getAllTags() {
    const counts = new Map();
    for (const post of getAllPosts()) {
        for (const tag of post.tags ?? []) {
            const slug = slugifyTag(tag);
            if (!counts.has(slug)) counts.set(slug, { tag, slug, count: 0 });
            counts.get(slug).count += 1;
        }
    }
    return [...counts.values()].sort(
        (a, b) => b.count - a.count || a.tag.localeCompare(b.tag)
    );
}

/**
 * All posts that carry the given tag slug, plus the tag's display label.
 */
export function getPostsByTag(tagSlug) {
    const posts = getAllPosts().filter((post) =>
        (post.tags ?? []).some((tag) => slugifyTag(tag) === tagSlug)
    );
    const label =
        posts
            .flatMap((p) => p.tags ?? [])
            .find((tag) => slugifyTag(tag) === tagSlug) ?? tagSlug;
    return { posts, label };
}
