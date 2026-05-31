import Link from "next/link";
import Image from "next/image";
import Header from "@/app/header";
import Footer from "@/app/footer";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
    title: "Blog — M. Brian Abdillah",
    description: "Articles and notes by M. Brian Abdillah.",
    alternates: { canonical: "/blog" },
    openGraph: {
        title: "Blog — M. Brian Abdillah",
        description: "Articles and notes by M. Brian Abdillah.",
        url: "/blog",
        type: "website",
    },
};

function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <div className="inter w-full">
            <Header />
            <main className="min-h-screen bg-slate-900 py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Blog</h1>
                    <p className="text-gray-400 mb-4">Articles and notes.</p>
                    <Link
                        href="/blog/tags"
                        className="inline-block text-cyan-400 hover:text-cyan-300 text-sm mb-12 transition-colors"
                    >
                        Browse by tag →
                    </Link>

                    {posts.length === 0 ? (
                        <p className="text-gray-400">No posts yet. Check back soon!</p>
                    ) : (
                        <div className="flex flex-col space-y-6">
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="block rounded-lg bg-slate-800 border border-slate-700 shadow-md hover:border-cyan-400 transition-colors duration-200 overflow-hidden"
                                >
                                    {post.cover && (
                                        <Image
                                            src={post.cover}
                                            alt={post.title}
                                            width={800}
                                            height={420}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-6">
                                    <h2 className="text-xl font-bold text-white hover:text-cyan-400 transition-colors">
                                        {post.title}
                                    </h2>
                                    {post.date && (
                                        <p className="text-sm text-gray-500 mt-1">{formatDate(post.date)}</p>
                                    )}
                                    {post.description && (
                                        <p className="text-gray-400 mt-3">{post.description}</p>
                                    )}
                                    {post.tags?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs px-2 py-1 rounded-full bg-slate-700 text-cyan-300"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
