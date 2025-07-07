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
              width={400}
              height={200}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-4 p-2">
          <div className="space-y-2">
            <h2 className="font-lexend text-2xl hover:underline font-bold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-200 line-clamp-2">
              {post.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
              {post.summary || 'No summary available'}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 space-x-3">
              <time className="flex items-center space-x-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  {post.date
                    ? new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'No date'}
                </span>
              </time>

              {post.author && (
                <>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span className="flex items-center space-x-1">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{post.author}</span>
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center text-xs text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
              {loading || isPending ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span className="font-medium">Read more</span>
                  <svg
                    className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200 dark:bg-[#181A1B] mt-12"></div>
    </article>
  );
}
