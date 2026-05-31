import Link from "next/link";
import Header from "@/app/header";
import Footer from "@/app/footer";
import { getAllTags } from "@/lib/posts";

export const metadata = {
    title: "Tags — M. Brian Abdillah",
    description: "Browse blog posts by tag.",
    alternates: { canonical: "/blog/tags" },
    openGraph: {
        title: "Tags — M. Brian Abdillah",
        description: "Browse blog posts by tag.",
        url: "/blog/tags",
        type: "website",
    },
};

export default function TagsIndex() {
    const tags = getAllTags();

    return (
        <div className="inter w-full">
            <Header />
            <main className="min-h-screen bg-slate-900 py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href="/blog"
                        className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                    >
                        ← Back to blog
                    </Link>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mt-6 mb-2">Tags</h1>
                    <p className="text-gray-400 mb-12">Browse posts by topic.</p>

                    {tags.length === 0 ? (
                        <p className="text-gray-400">No tags yet.</p>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            {tags.map(({ tag, slug, count }) => (
                                <Link
                                    key={slug}
                                    href={`/blog/tags/${slug}`}
                                    className="px-3 py-2 rounded-full bg-slate-800 border border-slate-700 text-cyan-300 hover:border-cyan-400 transition-colors duration-200"
                                >
                                    #{tag} <span className="text-gray-500">({count})</span>
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
