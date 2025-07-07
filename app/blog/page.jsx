import { getAllPosts } from '@/lib/notion';
import BlogCard from './components/BlogCard';
import Link from 'next/link';
import HomeButton from './components/HomeButton';

export const revalidate = 60;

export default async function BlogListPage() {
  let posts = [];
  let error = null;

  try {
    posts = await getAllPosts();
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <>
        <div className="fixed top-4 left-4 z-50">
          <HomeButton className="text-black dark:text-white" />
        </div>
        <div className="min-h-screen bg-white dark:bg-[#181A1B] transition-colors">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Blog
              </h1>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mt-8">
                <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
                  Unable to Load Posts
                </h2>
                <p className="text-red-600 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <>
        <div className="fixed top-4 left-4 z-50 text-gray-600 dark:text-gray-400">
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Go Home
          </Link>
        </div>
        <div className="min-h-screen bg-white dark:bg-[#181A1B] transition-colors">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <header className="text-center mb-16">
              <h1 className="font-grailga text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Blog
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Thoughts, stories and ideas
              </p>
              <div className="w-24 h-px bg-gray-300 dark:bg-gray-700 mx-auto mt-6"></div>
            </header>
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No blog posts available at the moment.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#181A1B] transition-colors">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <header className="text-center mb-16">
            <h1 className="text-6xl font-grailga font-bold text-gray-900 dark:text-white mb-4">
              Blog
            </h1>
            <p className="text-lg font-lexend text-gray-600 dark:text-gray-300">
              Thoughts, stories and ideas
            </p>
            <div className="w-24 h-px bg-gray-300 dark:bg-gray-700 mx-auto mt-6"></div>
          </header>

          <div className="space-y-12">
            {posts
              .filter((post) => post && (post.id || post.slug))
              .map((post, index) => (
                <BlogCard
                  key={post.id || post.slug || `post-${index}`}
                  post={post}
                />
              ))}
          </div>
        </div>
      </div>
      <footer className="bg-black text-white py-8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-300">
            © 2025 Shohorab H Shawon. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
