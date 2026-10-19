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
    'shrink-0 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition';
  const chipInactive =
    'border-journal-line text-journal-muted hover:border-journal-accent hover:text-journal-accent';
  const chipActive = 'border-journal-accent bg-journal-accent text-journal-paper';

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <label className="relative flex-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-journal-muted">Search the journal</span>
          <span className="relative mt-2 block">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-journal-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
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
              placeholder="Titles, topics, ideas…"
              className="h-12 w-full border-0 border-b border-journal-line bg-transparent pl-7 pr-2 text-lg text-journal-ink outline-none transition placeholder:text-journal-muted/70 focus:border-journal-accent focus:ring-0"
            />
          </span>
        </label>

        <div className="flex items-center gap-3">
          {showCategorySelect && (
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="h-10 min-w-0 flex-1 border border-journal-line bg-journal-paper px-3 font-mono text-[11px] uppercase tracking-[0.12em] text-journal-body outline-none transition focus:border-journal-accent md:w-48 md:flex-none"
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

          <p className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted" aria-live="polite">
            {String(visibleCount).padStart(2, '0')} / {String(totalPosts).padStart(2, '0')} shown
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedCategory('');
              }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-journal-accent underline-offset-4 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {quickFilters.length > 0 && (
        <div className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
        <p className="mt-5 border border-dashed border-journal-line px-4 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-journal-muted">
          Nothing on this reel. Try another word or topic.
        </p>
      )}
    </div>
  );
}
