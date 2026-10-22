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
    <div className="sticky top-16 z-40 -mx-5 mb-8 md:top-20 border-b border-[#d6a85f]/15 bg-[#0d0b0a]/95 px-5 pb-3 pt-3 md:-mx-10 md:mb-10 md:px-10 md:pb-4 md:pt-4">
      {/* Search + sort */}
      <div className="flex items-center gap-2 md:gap-3">
        <label className="flex min-w-0 flex-1 items-center gap-3 border-b border-white/15 py-2 transition focus-within:border-[#d6a85f] md:py-2.5">
          <Search className="h-4 w-4 shrink-0 text-[#d6a85f]/70" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search the archive — rickshaw, moon, kash…"
            aria-label="Search photos"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30 md:text-base"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="shrink-0 p-1 text-white/45 transition hover:text-[#d6a85f]"
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
            className={`flex items-center gap-2 border px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
              isSortOpen || sortBy !== 'featured'
                ? 'border-[#d6a85f] text-[#d6a85f]'
                : 'border-white/15 text-white/70 hover:border-white/35 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden whitespace-nowrap sm:inline">{activeSort.label}</span>
            <ChevronDown className={`hidden h-3.5 w-3.5 shrink-0 transition-transform sm:block ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSortOpen && (
            <ul
              role="listbox"
              aria-label="Sort photos"
              className="absolute right-0 top-full z-50 mt-2 w-52 border border-[#d6a85f]/25 bg-[#15110e] p-1 shadow-2xl"
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
                      className={`flex w-full items-center justify-between px-3 py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.16em] transition ${
                        isActive ? 'bg-[#d6a85f]/15 text-[#d6a85f]' : 'text-white/65 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {option.label}
                      {isActive && <Check className="h-3.5 w-3.5" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Rolls: wrap on desktop, swipe on mobile */}
      <div
        role="tablist"
        aria-label="Filter by category"
        className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category, index) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(category)}
              className={`group flex shrink-0 items-center gap-2 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition ${
                isActive
                  ? 'border-[#d6a85f] bg-[#d6a85f] text-[#1a1512]'
                  : 'border-white/15 text-white/60 hover:border-[#d6a85f]/60 hover:text-white'
              }`}
            >
              <span className={isActive ? 'text-[#1a1512]/55' : 'text-[#d6a85f]/60'}>
                {String(index).padStart(2, '0')}
              </span>
              {category === 'All' ? 'Full archive' : category}
              {categoryCounts[category] != null && (
                <span className={`tabular-nums ${isActive ? 'text-[#1a1512]/55' : 'text-white/30'}`}>
                  {categoryCounts[category]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Result summary */}
      <div className="mt-2 flex min-h-[24px] items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
        <span>
          <span className="text-[#d6a85f]">{String(resultCount).padStart(2, '0')}</span>{' '}
          {resultCount === 1 ? 'frame' : 'frames'}
          {selectedCategory !== 'All' ? ` · roll: ${selectedCategory}` : ''}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="border border-white/15 px-2.5 py-1 text-white/60 transition hover:border-[#d6a85f] hover:text-[#d6a85f]"
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
