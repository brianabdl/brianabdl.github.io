import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/header";
import Footer from "@/app/footer";
import { getAllTags, getPostsByTag } from "@/lib/posts";

// Pre-render one static page per tag at build time.
export function generateStaticParams() {
    return getAllTags().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({ params }) {
    const { tag } = await params;
    const { posts, label } = getPostsByTag(tag);
    if (posts.length === 0) return {};

    const url = `/blog/tags/${tag}`;
    return {
        title: `#${label} — M. Brian Abdillah`,
        description: `Posts tagged "${label}".`,
        alternates: { canonical: url },
        openGraph: {
            title: `#${label} — M. Brian Abdillah`,
            description: `Posts tagged "${label}".`,
            url,
            type: "website",
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

export default async function TagPage({ params }) {
    const { tag } = await params;
    const { posts, label } = getPostsByTag(tag);
    if (posts.length === 0) notFound();

    return (
        <div className="inter w-full">
            <Header />
            <main className="min-h-screen bg-slate-900 py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href="/blog/tags"
                        className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                    >
                        ← All tags
                    </Link>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mt-6 mb-2">
                        #{label}
                    </h1>
                    <p className="text-gray-400 mb-12">
                        {posts.length} {posts.length === 1 ? "post" : "posts"}
                    </p>

                    <div className="flex flex-col space-y-6">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="block p-6 rounded-lg bg-slate-800 border border-slate-700 shadow-md hover:border-cyan-400 transition-colors duration-200"
                            >
                                <h2 className="text-xl font-bold text-white hover:text-cyan-400 transition-colors">
                                    {post.title}
                                </h2>
                                {post.date && (
                                    <p className="text-sm text-gray-500 mt-1">{formatDate(post.date)}</p>
                                )}
                                {post.description && (
                                    <p className="text-gray-400 mt-3">{post.description}</p>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
