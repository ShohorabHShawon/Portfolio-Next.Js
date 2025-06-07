'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Loading from './components/Loading';
import ThemeToggle from './components/ThemeToggle';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        console.log('Fetched blogs:', data);

        // Handle both array response and object with blogs property
        let blogsArray = [];
        if (Array.isArray(data)) {
          blogsArray = data;
        } else if (data && Array.isArray(data.blogs)) {
          blogsArray = data.blogs;
        } else if (data && data.data && Array.isArray(data.data)) {
          blogsArray = data.data;
        }

        const validBlogs = blogsArray.filter((blog) => 
          blog && 
          typeof blog === 'object' && 
          blog.title && 
          blog.route
        );

        console.log('Valid blogs after filtering:', validBlogs.length);
        setBlogs(validBlogs);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 shadow-lg">
        <div className="absolute top-6 left-8 z-10">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 backdrop-blur-sm border border-white/20"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </Link>
        </div>
        <div className="absolute top-6 right-8 z-10">
          <ThemeToggle />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-16 text-center font-sans relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Explore <span className="bg-white/20 px-3 py-1 rounded-xl text-blue-200">Modern Blogs</span>
          </h1>
          <p className="text-2xl text-blue-100 max-w-2xl mx-auto mb-8">
            Fresh perspectives, tutorials, and stories on web development, design, and tech.
          </p>
        </div>
        <svg className="absolute bottom-0 left-0 w-full h-16 text-white/20" viewBox="0 0 1440 320">
          <path fill="currentColor" d="M0,224L1440,96L1440,320L0,320Z" />
        </svg>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {blogs.length === 0 ? (
          <div className="text-center py-24">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No blogs found</h3>
            <p className="text-gray-500 dark:text-gray-400">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 place-items-center">
            {blogs.map((blog, index) => (
              <Link
                key={blog.id || `${index}-${blog.title}`}
                href={blog.route}
                prefetch={true}
                className="group"
                tabIndex={-1}
                aria-label={blog.title}
              >
                <article className="bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={500}
                      height={280}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={blog.thumbnail || ''}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {blog.categories?.slice(0, 2).map((category, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      {blog.title}
                    </h2>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <time dateTime={blog.publishedDate}>
                        {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Read
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
                      {blog.description || 'No description available.'}
                    </p>
                    <span className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 hover:text-indigo-700 dark:hover:text-blue-300 transition-colors group mt-auto">
                      Read article
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
