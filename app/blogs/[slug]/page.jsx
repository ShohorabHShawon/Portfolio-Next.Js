import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';

export default async function BlogDetailPage({ params }) {
  const { slug } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: 'force-cache',
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }

    const blogs = await res.json();

    if (!blogs || blogs.length === 0) {
      return notFound();
    }

    const blog = blogs.find((b) => b.slug === slug || b.id === slug);

    if (!blog) return notFound();

    // Calculate reading time (rough estimate)
    const readingTime = blog.content
      ? Math.ceil(blog.content.split(' ').length / 200)
      : 5;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 transition-colors duration-300">
      {/* Top Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <Link
      href="/blogs"
      className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold"
      >
      <ArrowLeft size={20} />
      <span>Back</span>
      </Link>
      <ThemeToggle />
      </div>
      </nav>

      {/* Main Blog Layout */}
      <main className="max-w-6xl mx-auto px-4 md:px-0 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* /* Blog List (Left) */}
      <aside className="hidden lg:block lg:col-span-2">
      <div className="sticky top-28 space-y-4">
      <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Other Blogs</h2>
      <ul className="space-y-2">
      {blogs
        .filter((b) => b.slug !== blog.slug)
        .slice(0, 8)
        .map((b) => (
        <li key={b.slug || b.id}>
        <Link
        href={`/blogs/${b.slug || b.id}`}
        className="block px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors text-gray-700 dark:text-gray-200"
        >
        {b.title}
        {b.thumbnail && (
          <div className="mt-2 rounded-lg overflow-hidden aspect-[16/9] relative">
          <Image
          src={b.thumbnail}
          alt={b.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 300px"
          />
          </div>
        )}
        </Link>
        </li>
        ))}
      </ul>
      </div>
      </aside>

      {/* Blog Content (Center) */}
      <article className="lg:col-span-7">
      {/* Hero Image */}
      {blog.thumbnail && (
      <div className="relative mb-8 rounded-3xl overflow-hidden shadow-lg aspect-[16/7]">
      <Image
      src={blog.thumbnail}
      alt={blog.title}
      fill
      className="object-cover"
      priority
      sizes="(max-width: 1024px) 100vw, 900px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
      </div>
      )}

      {/* Title & Summary */}
      <header className="mb-10">
      <h1 className="font-lexend text-4xl md:text-6xl text-gray-900 dark:text-white mb-6 leading-tight">
        {blog.title}
      </h1>
      {blog.summary && (
        <div className="mb-8">
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
          {blog.summary}
        </p>
        </div>
      )}
      </header>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none 
      prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-white 
      prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:font-normal prose-p:text-lg
      prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline hover:prose-a:no-underline 
      prose-strong:font-semibold prose-strong:text-gray-900 dark:prose-strong:text-white 
      prose-em:italic prose-em:text-gray-700 dark:prose-em:text-gray-300
      prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-gray-800 dark:prose-code:text-gray-200
      prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
      prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700 dark:prose-li:text-gray-300">
      {blog.content ? (
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      ) : (
        <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl">📝</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Content coming soon...
        </p>
        </div>
      )}
      </div>
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl p-8 text-center shadow">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
      Thanks for reading!
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
      If you enjoyed this article, consider sharing it or exploring more posts.
      </p>
      <div className="flex justify-center gap-4">
      <Link
      href="/blogs"
      className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-full shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
      >
      More Articles
      </Link>
      <Link
      href="/"
      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full shadow hover:shadow-lg transition-shadow"
      >
      Portfolio
      </Link>
      </div>
      </div>
      </footer>
      </article>
        {/* Blog Details (Right) */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Blog Details</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                {blog.publishedDate && (
                  <li className="flex flex-col">
                    <span className="font-semibold text-gray-900 dark:text-white">Published:</span>
                    <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
                  </li>
                )}
                {blog.lastEdited && (
                  <li className="flex flex-col">
                    <span className="font-semibold text-gray-900 dark:text-white">Updated:</span>
                    <span>{new Date(blog.lastEdited).toLocaleDateString()}</span>
                  </li>
                )}
                <li className="flex flex-col">
                  <span className="font-semibold text-gray-900 dark:text-white">Reading Time:</span>
                  <span>{readingTime} min read</span>
                </li>
                {blog.authorName && (
                  <li className="flex flex-col">
                    <span className="font-semibold text-gray-900 dark:text-white">Author:</span>
                    <span>{blog.authorName}</span>
                  </li>
                )}
                {blog.categories && blog.categories.length > 0 && (
                  <li className="flex flex-col">
                    <span className="font-semibold text-gray-900 dark:text-white mb-2">Categories:</span>
                    <div className="flex flex-wrap gap-2">
                      {blog.categories.map((cat) => (
                        <span
                          key={cat}
                          className="inline-block bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full px-3 py-1 text-xs font-semibold"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </li>
                )}
                {blog.tags && blog.tags.length > 0 && (
                  <li className="flex flex-col">
                    <span className="font-semibold text-gray-900 dark:text-white mb-2">Tags:</span>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full px-3 py-1 text-xs font-semibold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
  } catch (error) {
    console.error('Error fetching blog:', error);
    return notFound();
  }
}
