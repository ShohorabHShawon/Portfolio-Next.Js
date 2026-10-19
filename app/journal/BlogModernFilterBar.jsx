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
  quickCategories = [],
}) {
  const instanceId = useId();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [visibleCount, setVisibleCount] = useState(totalPosts);
  const [mounted, setMounted] = useState(false);

  const normalizedCategories = useMemo(() => {
    return Array.isArray(categories)
      ? categories.filter(Boolean).sort((a, b) => a.localeCompare(b))
      : [];
  }, [categories]);

  const quickFilters = useMemo(() => {
    return Array.isArray(quickCategories)
      ? quickCategories.filter(Boolean)
      : [];
  }, [quickCategories]);

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

  const hasActiveFilters = Boolean(query.trim() || selectedCategory);
  const showCategorySelect = normalizedCategories.length > quickFilters.length;

  const chipBase =
    'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition';
  const chipInactive =
    'bg-white text-zinc-600 ring-1 ring-inset ring-zinc-200 hover:text-zinc-900 hover:ring-zinc-300 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-zinc-800 dark:hover:text-white dark:hover:ring-zinc-700';
  const chipActive =
    'bg-zinc-900 text-white ring-1 ring-inset ring-zinc-900 dark:bg-white dark:text-zinc-900 dark:ring-white';

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search blog posts</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search stories, topics, or authors"
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
          />
        </label>

        <div className="flex items-center gap-2">
          {showCategorySelect && (
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="h-11 min-w-0 flex-1 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-700 outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-zinc-600 md:w-48 md:flex-none"
              aria-label="Filter by category"
            >
              <option value="">All categories</option>
              {normalizedCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}

          <p className="whitespace-nowrap px-2 text-xs tabular-nums text-zinc-500 dark:text-zinc-400" aria-live="polite">
            {visibleCount} / {totalPosts}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedCategory('');
              }}
              className="h-11 rounded-xl px-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {quickFilters.length > 0 && (
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setSelectedCategory('')}
            aria-pressed={!selectedCategory}
            className={`${chipBase} ${!selectedCategory ? chipActive : chipInactive}`}
          >
            All topics
          </button>
          {quickFilters.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(isActive ? '' : category)}
                aria-pressed={isActive}
                className={`${chipBase} ${isActive ? chipActive : chipInactive}`}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}

      {visibleCount === 0 && (
        <p className="mt-3 rounded-xl bg-zinc-100 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-300">
          No stories match your search. Try a different keyword or topic.
        </p>
      )}
    </div>
  );
}
