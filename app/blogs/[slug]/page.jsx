import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';

export default async function BlogDetailPage({ params }) {
  const { slug } = params;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://shohorabhshawon.vercel.app';

  const res = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });
  const blogs = await res.json();

  const blog = blogs.find((b) => b.slug === slug || b.id === slug);

  if (!blog) return notFound();

  // Calculate reading time (rough estimate)
  const readingTime = blog.content
    ? Math.ceil(blog.content.split(' ').length / 200)
    : 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to blogs</span>
          </Link>
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

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
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
            <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>

          {/* Summary Section */}
          {blog.summary && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm text-black">
              <div className="flex items-start gap-4">
                <div className="w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 mb-3">
                    Summary:
                  </h1>
                  <p className="text-gray-700 leading-relaxed text-lg">
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
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12 text-black">
          <div className="prose prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm">
            {blog.content ? (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <p className="text-gray-500 text-lg">Content coming soon...</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Thanks for reading!
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you enjoyed this article, consider sharing it with others or
              checking out more of my work.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/blogs"
                className="px-6 py-3 bg-white text-gray-900 font-medium rounded-full shadow-sm hover:shadow-md transition-shadow border border-gray-200"
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
}
