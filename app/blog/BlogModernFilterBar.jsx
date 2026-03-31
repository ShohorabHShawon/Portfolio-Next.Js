'use client';

import { useEffect, useId, useMemo, useState } from 'react';

function normalizeText(value) {
  return String(value || '').toLowerCase().trim();
}

function readUrlFilters() {
  if (typeof window === 'undefined') {
    return { query: '', category: '' };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    query: params.get('q') || '',
    category: params.get('cat') || '',
  };
}

export default function BlogModernFilterBar({
  categories = [],
  totalPosts = 0,
  variant = 'modern',
}) {
  const instanceId = useId();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [visibleCount, setVisibleCount] = useState(totalPosts);
  const [mounted, setMounted] = useState(false);
  const isManga = variant === 'manga';

  const normalizedCategories = useMemo(() => {
    return Array.isArray(categories)
      ? categories.filter(Boolean).sort((a, b) => a.localeCompare(b))
      : [];
  }, [categories]);

  useEffect(() => {
    const { query: initialQuery, category: initialCategory } = readUrlFilters();
    setQuery(initialQuery);
    setSelectedCategory(initialCategory);
    setMounted(true);

    function handlePopState() {
      const next = readUrlFilters();
      setQuery(next.query);
      setSelectedCategory(next.category);
    }

    function handleFilterSync(event) {
      const detail = event?.detail || {};
      if (detail.source === instanceId) return;

      setQuery(detail.query || '');
      setSelectedCategory(detail.category || '');
    }

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('blog-filter-sync', handleFilterSync);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('blog-filter-sync', handleFilterSync);
    };
  }, [instanceId]);

  useEffect(() => {
    const normalizedQuery = normalizeText(query);
    const normalizedCategory = normalizeText(selectedCategory);
    const items = Array.from(document.querySelectorAll('[data-blog-post-item="true"]'));
    const visibleSlugs = new Set();

    items.forEach((item) => {
      const searchable = normalizeText(item.getAttribute('data-search'));
      const categoriesText = normalizeText(item.getAttribute('data-categories'));
      const itemCategories = categoriesText ? categoriesText.split('|').filter(Boolean) : [];
      const itemSlug = item.getAttribute('data-slug') || '';

      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesCategory = !normalizedCategory || itemCategories.includes(normalizedCategory);
      const isVisible = matchesQuery && matchesCategory;

      item.style.display = isVisible ? '' : 'none';

      if (isVisible && itemSlug) {
        visibleSlugs.add(itemSlug);
      }
    });

    setVisibleCount(visibleSlugs.size);

    if (!mounted) return;

    const url = new URL(window.location.href);
    if (query.trim()) {
      url.searchParams.set('q', query.trim());
    } else {
      url.searchParams.delete('q');
    }

    if (selectedCategory.trim()) {
      url.searchParams.set('cat', selectedCategory.trim());
    } else {
      url.searchParams.delete('cat');
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState({}, '', nextUrl);
    window.dispatchEvent(
      new CustomEvent('blog-filter-sync', {
        detail: {
          source: instanceId,
          query,
          category: selectedCategory,
        },
      })
    );
  }, [query, selectedCategory, mounted, instanceId]);

  useEffect(() => {
    setVisibleCount(totalPosts);
  }, [totalPosts]);

  const panelClass = isManga
    ? 'rounded-2xl border-4 border-black bg-[#fff7cc] p-4 shadow-[6px_6px_0_#111111] dark:border-[#5eead4] dark:bg-[#13233a] dark:shadow-[6px_6px_0_#0a3a46]'
    : 'rounded-2xl border border-[#e6e6e6] bg-[#fafaf8] p-4 dark:border-[#2a2a2a] dark:bg-[#1b1d1e]';

  const labelClass = isManga
    ? 'text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700 dark:text-[#b7d6ea]'
    : 'text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b6b6b] dark:text-[#a0a0a0]';

  const metaClass = isManga
    ? 'mt-1 text-sm font-semibold text-slate-700 dark:text-[#d8ebf8]'
    : 'mt-1 text-sm text-[#5f5f5f] dark:text-[#b5b5b5]';

  const controlClass = isManga
    ? 'w-full rounded-xl border-2 border-black bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[#ef4444] dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:text-[#d8ebf8]'
    : 'w-full rounded-xl border border-[#d0d0d0] bg-white px-3 py-2 text-sm text-[#242424] outline-none transition focus:border-[#191919] dark:border-[#3a3a3a] dark:bg-[#131516] dark:text-[#f3f3f3]';

  const resetButtonClass = isManga
    ? 'rounded-xl border-2 border-black bg-[#fde047] px-3 py-2 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-[#facc15] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8] dark:hover:bg-[#2e5b86]'
    : 'rounded-xl border border-[#d0d0d0] bg-white px-3 py-2 text-sm font-medium text-[#3f3f3f] transition hover:border-[#191919] hover:text-[#191919] dark:border-[#3a3a3a] dark:bg-transparent dark:text-[#d1d1d1] dark:hover:border-[#f3f3f3] dark:hover:text-[#f3f3f3]';

  return (
    <div className={panelClass}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className={labelClass}>
            Find Stories
          </p>
          <p className={metaClass}>
            {visibleCount} of {totalPosts} visible
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row md:max-w-[620px]">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, author, or keywords"
            className={controlClass}
            aria-label="Search blog posts"
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className={controlClass}
            aria-label="Filter by category"
          >
            <option value="">All categories</option>
            {normalizedCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCategory('');
            }}
            className={resetButtonClass}
          >
            Reset
          </button>
        </div>
      </div>

      {visibleCount === 0 && (
        <p className="mt-3 rounded-xl border border-[#e3c7c7] bg-[#fff4f4] px-3 py-2 text-sm text-[#8b3a3a] dark:border-[#5b2b2b] dark:bg-[#2a1616] dark:text-[#f1b7b7]">
          No stories match your current search or category filter.
        </p>
      )}
    </div>
  );
}
