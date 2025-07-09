import { getAllPosts, getPostBySlug } from '@/lib/notion';
import { NotionAPI } from 'notion-client';
import { parsePageId } from 'notion-utils';
import NotionPageWrapper from '../components/NotionPageWrapper';
import 'react-notion-x/src/styles.css';

import BackButton from '../components/BackButton';
import Image from 'next/image';

const notion = new NotionAPI();

// ✅ Enable ISR with revalidation every 60 seconds
export const revalidate = 60;
export const dynamicParams = true;

// ✅ Generate static paths for common posts only
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    // Only pre-generate first 10 posts, others will be generated on-demand
    return posts.slice(0, 10).map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// ✅ Setup SEO metadata
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: 'Not found' };

    return {
      title: post.title,
      description: post.summary,
      authors: [
        {
          name: post.author,
        },
      ],
      openGraph: {
        title: post.title,
        description: post.summary,
        images: post.thumbnail ? [post.thumbnail] : [],
      },
    };
  } catch (error) {
    return { title: 'Error loading post' };
  }
}

// ✅ Main blog post renderer
export default async function BlogPostPage({ params }) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post)
      return (
        <div className="min-h-screen bg-white dark:bg-[#181A1B] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
              404
            </h1>
            <p className="text-gray-600 dark:text-white">Post not found</p>
          </div>
        </div>
      );

    // ✅ This is the FIX — parse the ID to correct dashed format
    const pageId = parsePageId(post.id);
    const recordMap = await notion.getPage(pageId);

    return (
      <>
        <div className="min-h-screen antialiased text-black dark:text-white bg-white dark:bg-[#181A1B]">
          <BackButton className="text-black dark:text-white" />
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Image
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
              width={800}
              height={400}
            />
          </div>
          <article className="max-w-4xl mx-auto px-6 py-6">
            {/* Header Section */}
            <header className="mb-12 pb-6 border-b border-gray-200 dark:border-gray-800 px-4">
              <h1 className="text-2xl md:text-4xl font-bold text-black dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {post.author}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {post.date
                    ? new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </span>
              </div>

              {/* Summary */}
              {post.summary && (
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                  {post.summary}
                </p>
              )}
            </header>

            {/* Content Section */}
            <div className="">
              <NotionPageWrapper recordMap={recordMap} darkMode={true} />
            </div>
          </article>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    return (
      <div className="min-h-screen bg-white dark:bg-[#181A1B] flex items-center justify-center">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn&apos;t load this blog post. Please try again later.
            </p>
            <a
              href={`/blog/${slug}`}
              className="inline-block px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Try Again
            </a>
          </div>
        </div>
      </div>
    );
  }
}
