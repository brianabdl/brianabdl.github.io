import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Header from "@/app/header";
import Footer from "@/app/footer";
import { getAllSlugs, getPostBySlug, slugifyTag } from "@/lib/posts";

const SITE_URL = "https://brianabdl.my.id";

// Pre-render one static page per post at build time.
export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

// Per-post SEO metadata (title, description, Open Graph, canonical).
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};

    const url = `/blog/${post.slug}`;
    return {
        title: `${post.title} — M. Brian Abdillah`,
        description: post.description,
        alternates: { canonical: url },
        openGraph: {
            title: post.title,
            description: post.description,
            url,
            type: "article",
            publishedTime: post.date || undefined,
            images: post.cover ? [post.cover] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: post.cover ? [post.cover] : undefined,
        },
    };
}

function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    // JSON-LD structured data for rich search results.
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date || undefined,
        author: { "@type": "Person", name: "M. Brian Abdillah" },
        url: `${SITE_URL}/blog/${post.slug}`,
    };

    return (
        <div className="inter w-full">
            <Header />
            <main className="min-h-screen bg-slate-900 py-16 px-4">
                <article className="max-w-3xl mx-auto">
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    />
                    <Link
                        href="/blog"
                        className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                    >
                        ← Back to blog
                    </Link>

                    <header className="mt-6 mb-10">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white">{post.title}</h1>
                        {post.date && (
                            <p className="text-sm text-gray-500 mt-2">{formatDate(post.date)}</p>
                        )}
                        {post.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {post.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/blog/tags/${slugifyTag(tag)}`}
                                        className="text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-300 hover:border-cyan-400 transition-colors"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </header>


                    {post.cover && (
                        <Image
                            src={post.cover}
                            alt={post.title}
                            width={1200}
                            height={630}
                            className="mt-6 w-full h-auto rounded-lg border border-slate-700 shadow-md object-cover"
                            priority
                        />
                    )}
                    <div className="mt-6 prose prose-invert prose-cyan max-w-none prose-headings:text-white prose-a:text-cyan-400 prose-pre:border prose-pre:border-slate-700">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw, rehypeHighlight]}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
