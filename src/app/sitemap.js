import { getAllPosts, getAllTags } from "@/lib/posts";

export const dynamic = "force-static";

const SITE_URL = "https://brianabdl.my.id";

export default function sitemap() {
    const staticRoutes = [
        "",
        "/blog",
        "/blog/tags",
        "/creation",
        "/documentation",
    ].map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
    }));

    const postRoutes = getAllPosts().map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
    }));

    const tagRoutes = getAllTags().map(({ slug }) => ({
        url: `${SITE_URL}/blog/tags/${slug}`,
        lastModified: new Date(),
    }));

    return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
