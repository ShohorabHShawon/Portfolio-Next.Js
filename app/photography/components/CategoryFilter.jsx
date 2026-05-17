'use client';
import { motion } from 'framer-motion';
import { ChevronDown, Search, SlidersHorizontal, Tag, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  resultCount,
  totalCount,
  sortOptions,
  isGalleryGridInView = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isMobileControlsVisible, setIsMobileControlsVisible] = useState(true);
  const dropdownRef = useRef(null);
  const dropdownRefMobile = useRef(null);
  const sortDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (dropdownRefMobile.current && !dropdownRefMobile.current.contains(event.target)) {
        setIsOpenMobile(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let rafId = 0;
    let lastScrollY = window.scrollY;

    const updateMobileVisibility = () => {
      const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
      const currentScrollY = window.scrollY;

      if (!isMobileViewport) {
        setIsMobileControlsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (!isGalleryGridInView) {
        setIsMobileControlsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY < 72) {
        setIsMobileControlsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsMobileControlsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsMobileControlsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    const handleScrollOrResize = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        updateMobileVisibility();
        rafId = 0;
      });
    };

    updateMobileVisibility();
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isGalleryGridInView]);

  useEffect(() => {
    if (!isMobileControlsVisible) {
      setIsOpen(false);
      setIsSortOpen(false);
      setIsOpenMobile(false);
    }
  }, [isMobileControlsVisible]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  const handleSelectCategoryMobile = (category) => {
    setSelectedCategory(category);
    setIsOpenMobile(false);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
    setIsOpen(false);
    setIsSortOpen(false);
    setIsOpenMobile(false);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedCategory !== 'All' || sortBy !== 'featured';

  const resultSummary =
    resultCount === totalCount
      ? `Showing all ${totalCount} photos`
      : `Showing ${resultCount} of ${totalCount} photos`;

  return (
    <div
      className={`sticky top-0 z-50 mb-16 border-b border-[#181A1B]/10 bg-white py-4 transition-[transform,opacity] duration-300 ease-out dark:border-gray-800 dark:bg-[#181A1B] md:translate-y-0 md:opacity-100 md:pointer-events-auto ${
        isMobileControlsVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="mb-4 hidden gap-3 md:grid md:grid-cols-[minmax(0,1fr)_180px_180px] lg:grid-cols-[minmax(0,1fr)_220px_180px] lg:items-center">
          <label className="flex items-center gap-3 rounded-2xl border border-[#181A1B]/10 bg-white px-4 py-3 shadow-sm transition focus-within:border-[#181A1B]/30 dark:border-white/10 dark:bg-[#121314]/80 dark:focus-within:border-white/25 md:rounded-xl md:px-3 md:py-3">
            <Search className="h-4 w-4 shrink-0 text-[#181A1B]/50 dark:text-white/45" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search title, category, or description"
              className="w-full bg-transparent text-sm text-[#181A1B] outline-none placeholder:text-[#181A1B]/40 dark:text-white dark:placeholder:text-white/35 md:text-xs lg:text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="shrink-0 rounded-full p-1 text-[#181A1B]/45 transition hover:bg-[#181A1B]/5 hover:text-[#181A1B] dark:text-white/45 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>

          <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex w-full items-center gap-2 rounded-xl border border-[#181A1B]/10 bg-white px-3 py-3 text-xs shadow-sm transition hover:border-[#181A1B]/20 dark:border-white/10 dark:bg-[#121314]/80 dark:hover:border-white/15 lg:gap-3 lg:rounded-2xl lg:px-4 lg:text-sm"
            >
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-[#181A1B]/50 dark:text-white/45" />
              <span className="hidden flex-1 text-left text-[#181A1B] dark:text-white lg:block">
                {sortOptions.find((opt) => opt.value === sortBy)?.label || 'Sort'}
              </span>
              <span className="flex-1 text-left text-[#181A1B] dark:text-white lg:hidden">
                {sortOptions.find((opt) => opt.value === sortBy)?.label?.split(' ')[0] || 'Sort'}
              </span>
              <ChevronDown
                className="h-4 w-4 shrink-0 text-[#181A1B]/50 transition-transform dark:text-white/45"
                style={{ transform: isSortOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {isSortOpen && (
              <div className="animation absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0f1011]/95 shadow-2xl backdrop-blur-xl">
                <div className="max-h-[300px] overflow-y-auto">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full border-b border-white/5 px-6 py-4 text-left text-sm font-medium transition-all duration-200 last:border-b-0 ${
                        sortBy === option.value
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center gap-2 rounded-xl border border-[#181A1B]/10 bg-white px-3 py-3 text-xs shadow-sm transition hover:border-[#181A1B]/20 dark:border-white/10 dark:bg-[#121314]/80 dark:hover:border-white/15 lg:gap-3 lg:rounded-2xl lg:px-4 lg:text-sm"
            >
              <Tag className="h-4 w-4 shrink-0 text-[#181A1B]/50 dark:text-white/45" />
              <span className="flex-1 text-left text-[#181A1B] dark:text-white">{selectedCategory}</span>
              <ChevronDown
                className="h-4 w-4 shrink-0 text-[#181A1B]/50 transition-transform dark:text-white/45"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {isOpen && (
              <div className="animation absolute right-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f1011]/95 shadow-2xl backdrop-blur-xl" onWheel={(e) => e.stopPropagation()}>
                <div className="max-h-[300px] overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleSelectCategory(category)}
                      className={`w-full border-b border-white/5 px-6 py-4 text-left text-sm font-medium transition-all duration-200 last:border-b-0 ${
                        selectedCategory === category
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-2 md:hidden">
          <label className="flex items-center gap-2 rounded-xl border border-[#181A1B]/10 bg-white px-3 py-2.5 shadow-sm transition focus-within:border-[#181A1B]/30 dark:border-white/10 dark:bg-[#121314]/80 dark:focus-within:border-white/25">
            <Search className="h-3.5 w-3.5 shrink-0 text-[#181A1B]/50 dark:text-white/45" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search title, category, or description"
              className="min-w-0 flex-1 bg-transparent text-xs text-[#181A1B] outline-none placeholder:text-[#181A1B]/35 dark:text-white dark:placeholder:text-white/30"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="shrink-0 rounded-full p-1 text-[#181A1B]/45 transition hover:bg-[#181A1B]/5 hover:text-[#181A1B] dark:text-white/45 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </label>

          <div className="grid grid-cols-2 gap-2">
            <div className="relative" ref={sortDropdownRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex w-full min-w-0 items-center gap-1.5 rounded-xl border border-[#181A1B]/10 bg-white px-3 py-2.5 text-[11px] font-medium shadow-sm transition hover:border-[#181A1B]/20 dark:border-white/10 dark:bg-[#121314]/80 dark:hover:border-white/15"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 shrink-0 text-[#181A1B]/50 dark:text-white/45" />
                <span className="min-w-0 flex-1 truncate whitespace-nowrap text-left text-[#181A1B] dark:text-white">
                  {sortOptions.find((opt) => opt.value === sortBy)?.label?.split(' ')[0] || 'Sort'}
                </span>
                <ChevronDown
                  className="h-3.5 w-3.5 shrink-0 text-[#181A1B]/50 transition-transform dark:text-white/45"
                  style={{ transform: isSortOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {isSortOpen && (
                <div className="animation absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0f1011]/95 shadow-2xl backdrop-blur-xl">
                  <div className="max-h-[52vh] overflow-y-auto md:max-h-[300px]">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full border-b border-white/5 px-4 py-3 text-left text-xs font-medium transition-all duration-200 last:border-b-0 md:px-6 md:py-4 md:text-sm ${
                          sortBy === option.value
                            ? 'bg-white/10 text-white'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={dropdownRefMobile}>
              <button
                onClick={() => setIsOpenMobile(!isOpenMobile)}
                className="flex w-full min-w-0 items-center gap-1.5 rounded-xl border border-[#181A1B]/10 bg-white px-3 py-2.5 text-[11px] font-medium shadow-sm transition hover:border-[#181A1B]/20 dark:border-white/10 dark:bg-[#121314]/80 dark:hover:border-white/15"
              >
                <Tag className="h-3.5 w-3.5 shrink-0 text-[#181A1B]/50 dark:text-white/45" />
                <span
                  className="min-w-0 flex-1 truncate whitespace-nowrap text-left text-[#181A1B] dark:text-white"
                  title={selectedCategory}
                >
                  {selectedCategory}
                </span>
                <ChevronDown
                  className="h-3.5 w-3.5 shrink-0 text-[#181A1B]/50 transition-transform dark:text-white/45"
                  style={{ transform: isOpenMobile ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {isOpenMobile && (
                <div className="animation absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0f1011]/95 shadow-2xl backdrop-blur-xl" onWheel={(e) => e.stopPropagation()}>
                  <div className="max-h-[52vh] overflow-y-auto md:max-h-[300px]">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleSelectCategoryMobile(category)}
                        className={`w-full border-b border-white/5 px-4 py-3 text-left text-xs font-medium transition-all duration-200 last:border-b-0 md:px-6 md:py-4 md:text-sm ${
                          selectedCategory === category
                            ? 'bg-white/10 text-white'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl bg-[#181A1B]/5 px-3 py-2 text-[11px] text-[#181A1B]/65 dark:bg-white/5 dark:text-white/55">
            <p className="min-w-0 truncate">{resultSummary}</p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="shrink-0 rounded-full border border-[#181A1B]/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-[#181A1B]/75 transition hover:border-[#181A1B]/20 hover:bg-white dark:border-white/10 dark:text-white/70 dark:hover:border-white/20 dark:hover:bg-white/10"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 hidden items-center justify-between gap-4 rounded-2xl bg-[#181A1B]/5 px-4 py-3 text-sm text-[#181A1B]/65 dark:bg-white/5 dark:text-white/55 md:flex">
          <p>{resultSummary}</p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="rounded-full border border-[#181A1B]/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-[#181A1B]/75 transition hover:border-[#181A1B]/20 hover:bg-white dark:border-white/10 dark:text-white/70 dark:hover:border-white/20 dark:hover:bg-white/10"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      <style jsx global>{`
        input[type='search']::-webkit-search-cancel-button,
        input[type='search']::-webkit-search-decoration,
        input[type='search']::-webkit-search-results-button,
        input[type='search']::-webkit-search-results-decoration {
          -webkit-appearance: none;
        }
      `}</style>
      </motion.div>
    </div>
  );
};

export default CategoryFilter;
