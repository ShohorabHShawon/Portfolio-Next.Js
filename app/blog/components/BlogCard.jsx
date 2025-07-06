'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function BlogCard({ post }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    // Check if post slug exists and is valid
    if (
      !post?.slug ||
      typeof post.slug !== 'string' ||
      post.slug.trim() === ''
    ) {
      console.error('Invalid or missing post slug');
      return;
    }

    setLoading(true);
    startTransition(() => {
      router.push(`/blog/${post.slug}`);
    });
  };

  const LoadingSpinner = () => (
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-300 rounded-full animate-spin"></div>
      <span>Loading...</span>
    </div>
  );

  return (
    <article onClick={handleClick} className="group cursor-pointer relative">
      {/* Loading Overlay */}
      {(loading || isPending) && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <LoadingSpinner />
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-[#181A1B]">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={800}
              height={450}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {post.title}
          </h2>

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
            <time>
              {post.date
                ? new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'No date'}
            </time>
            <span>•</span>
            <span>{post.author}</span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {post.summary}
          </p>

          <div className="pt-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
              {loading || isPending ? <LoadingSpinner /> : 'Read more →'}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200 dark:bg-[#181A1B] mt-12"></div>
    </article>
  );
}
