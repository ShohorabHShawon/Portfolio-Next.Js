import React from 'react';

export default function ArticlePageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Navigation Skeleton */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section Skeleton */}
        <header className="mb-12">
          {/* Categories Skeleton */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          {/* Title Skeleton */}
          <div className="mb-8 space-y-4">
            <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-3/4 h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Meta Information Skeleton */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Summary Skeleton */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-1 h-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Skeleton */}
          <div className="relative -mx-4 mb-12 rounded-3xl overflow-hidden">
            <div className="h-96 md:h-[500px] bg-gray-200 animate-pulse"></div>
          </div>
        </header>

        {/* Main Content Skeleton */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-4/6 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
            <div className="space-y-2 mb-6">
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
            <div className="flex justify-center gap-4">
              <div className="w-32 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-32 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
