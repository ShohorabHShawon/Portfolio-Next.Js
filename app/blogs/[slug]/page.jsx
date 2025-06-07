import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
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
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to blogs</span>
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <header className="mb-12">
            {/* Categories */}
            {blog.categories && blog.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full shadow-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-lexend text-4xl md:text-6xl text-gray-900 dark:text-white mb-8 leading-tight bg-gradient-to-r from-gray-900 dark:from-white to-gray-600 dark:to-gray-300 bg-clip-text text-transparent">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <time>
                  {blog.publishedDate
                    ? new Date(blog.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Unknown'}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{readingTime} min read</span>
              </div>
              <button className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>

            {/* Summary Section */}
            {blog.summary && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8 shadow-sm text-black dark:text-white">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Summary:
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {blog.summary}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Hero Background Image */}
            {blog.thumbnail && (
              <div className="relative -mx-4 mb-12 rounded-3xl overflow-hidden">
                <div className="relative h-96 md:h-[500px]">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
              </div>
            )}
          </header>

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 md:p-12 text-black dark:text-white">
            <div className="prose prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:bg-gray-100 dark:prose-code:bg-gray-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-gray-800 dark:prose-code:text-gray-200">
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
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Thanks for reading!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                If you enjoyed this article, consider sharing it with others or
                checking out more of my work.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/blogs"
                  className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-full shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
                >
                  More Articles
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full shadow-sm hover:shadow-md transition-shadow"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </footer>
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    return notFound();
  }
}
