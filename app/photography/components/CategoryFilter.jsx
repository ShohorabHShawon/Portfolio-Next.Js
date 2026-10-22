'use client';
import { Check, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const CategoryFilter = ({
  categories,
  categoryCounts = {},
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  sortOptions,
  resultCount,
  onReset,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Close the sort menu on outside click or Escape.
  useEffect(() => {
    if (!isSortOpen) return undefined;

    const handlePointerDown = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsSortOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSortOpen]);

  const activeSort = sortOptions.find((option) => option.value === sortBy) || sortOptions[0];
  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedCategory !== 'All' || sortBy !== 'featured';

  return (
    <div className="sticky top-0 z-40 -mx-4 mb-6 border-b border-[#d6a85f]/15 bg-[#1a1512]/95 px-4 pb-3 pt-3 backdrop-blur-md sm:-mx-6 sm:px-6 md:mb-8 md:pb-4 md:pt-4">
      {/* Search + sort */}
      <div className="flex items-center gap-2 md:gap-3">
        <label className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full border border-white/10 bg-[#211914] px-4 py-2.5 transition focus-within:border-[#d6a85f]/60 focus-within:bg-[#2a211b] md:py-3">
          <Search className="h-4 w-4 shrink-0 text-white/45" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search photos, places, moods…"
            aria-label="Search photos"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="shrink-0 rounded-full p-1 text-white/45 transition hover:bg-white/10 hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>

        <div className="relative shrink-0" ref={sortRef}>
          <button
            type="button"
            onClick={() => setIsSortOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={isSortOpen}
            aria-label={`Sort: ${activeSort.label}`}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-2.5 text-sm transition md:px-4 md:py-3 ${
              isSortOpen || sortBy !== 'featured'
                ? 'border-[#d6a85f]/60 bg-[#2a211b] text-[#d6a85f]'
                : 'border-white/10 bg-[#211914] text-white hover:border-white/25'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4 shrink-0" />
            <span className="hidden whitespace-nowrap sm:inline">{activeSort.label}</span>
            <ChevronDown className={`hidden h-4 w-4 shrink-0 transition-transform sm:block ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSortOpen && (
            <ul
              role="listbox"
              aria-label="Sort photos"
              className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#211914] p-1.5 shadow-2xl"
            >
              {sortOptions.map((option) => {
                const isActive = option.value === sortBy;
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                        isActive ? 'bg-[#d6a85f]/15 text-[#d6a85f]' : 'text-white/75 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {option.label}
                      {isActive && <Check className="h-4 w-4" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Category chips: wrap on desktop, swipe on mobile */}
      <div
        role="tablist"
        aria-label="Filter by category"
        className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(category)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition md:text-sm ${
                isActive
                  ? 'bg-[#d6a85f] text-[#1a1512]'
                  : 'bg-[#211914] text-white/70 hover:bg-[#2a211b] hover:text-white'
              }`}
            >
              {category}
              {categoryCounts[category] != null && (
                <span className={`text-[10px] tabular-nums ${isActive ? 'text-[#1a1512]/60' : 'text-white/35'}`}>
                  {categoryCounts[category]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Result summary */}
      <div className="mt-2 flex min-h-[24px] items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
        <span>
          {resultCount} {resultCount === 1 ? 'photo' : 'photos'}
          {selectedCategory !== 'All' ? ` · ${selectedCategory}` : ''}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-white/15 px-2.5 py-1 text-white/65 transition hover:border-[#d6a85f]/60 hover:text-[#d6a85f]"
          >
            Reset
          </button>
        )}
      </div>

      <style jsx global>{`
        input[type='search']::-webkit-search-cancel-button,
        input[type='search']::-webkit-search-decoration,
        input[type='search']::-webkit-search-results-button,
        input[type='search']::-webkit-search-results-decoration {
          -webkit-appearance: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryFilter;
