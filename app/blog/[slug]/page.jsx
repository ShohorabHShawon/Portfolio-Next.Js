import { getAllPosts, getPostBySlug } from '@/lib/notion';
import { NotionAPI } from 'notion-client';
import { parsePageId } from 'notion-utils';
import NotionPageWrapper from '../components/NotionPageWrapper';
import 'react-notion-x/src/styles.css';
import BackButton from '../components/BackButton';
import Image from 'next/image';

const notion = new NotionAPI();

// ✅ Enable ISR — regenerate every 60 seconds
export const revalidate = 60;
export const dynamicParams = true;
// ✅ Pre-render top 10 popular blog slugs
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.slice(0, 10).map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// ✅ SEO metadata
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams; // ✅ Fixed
    const post = await getPostBySlug(slug);
    if (!post) return { title: 'Not found' };

    return {
      title: post.title,
      description: post.summary,
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.summary,
        images: post.thumbnail ? [post.thumbnail] : [],
      },
    };
  } catch {
    return { title: 'Error loading post' };
  }
}

export default async function BlogPostPage({ params }) {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const post = await getPostBySlug(slug);
    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#181A1B]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
              404
            </h1>
            <p className="text-gray-600 dark:text-white">Post not found</p>
          </div>
        </div>
      );
    }

    const pageId = parsePageId(post.id);
    const recordMap = await notion.getPage(pageId);

    return (
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
          <header className="mb-12 pb-6 border-b border-gray-200 dark:border-gray-800 px-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
              <span className="flex items-center">👤 {post.author}</span>
              <span className="flex items-center">
                📅{' '}
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            {post.summary && (
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                {post.summary}
              </p>
            )}
          </header>
          <div>
            <NotionPageWrapper recordMap={recordMap} darkMode={true} />
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#181A1B]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Failed to load this blog post. Try again.
          </p>
        </div>
      </div>
    );
  }
}
