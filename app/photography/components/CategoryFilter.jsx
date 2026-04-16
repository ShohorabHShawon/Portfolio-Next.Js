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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
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

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  const handleSelectCategoryMobile = (category) => {
    setSelectedCategory(category);
    setIsOpenMobile(false);
  };

  return (
    <motion.div
      className="sticky top-0 z-50 mb-16 border-b border-[#181A1B]/10 bg-white py-4 dark:border-gray-800 dark:bg-[#181A1B]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="mb-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px] lg:grid-cols-[minmax(0,1fr)_220px_180px] lg:items-center">
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
                className="rounded-full p-1 text-[#181A1B]/45 transition hover:bg-[#181A1B]/5 hover:text-[#181A1B] dark:text-white/45 dark:hover:bg-white/10 dark:hover:text-white shrink-0"
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

        <div className="relative md:hidden" ref={dropdownRefMobile}>
          <button
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="flex w-full items-center gap-2 rounded-xl border border-[#181A1B]/10 bg-white px-3 py-3 text-xs shadow-sm transition hover:border-[#181A1B]/20 dark:border-white/10 dark:bg-[#121314]/80 dark:hover:border-white/15 lg:gap-3 lg:rounded-2xl lg:px-4 lg:text-sm"
          >
            <Tag className="h-4 w-4 shrink-0 text-[#181A1B]/50 dark:text-white/45" />
            <span className="flex-1 text-left text-[#181A1B] dark:text-white">{selectedCategory}</span>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-[#181A1B]/50 transition-transform dark:text-white/45"
              style={{ transform: isOpenMobile ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {isOpenMobile && (
            <div className="animation absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0f1011]/95 shadow-2xl backdrop-blur-xl" onWheel={(e) => e.stopPropagation()}>
              <div className="max-h-[60vh] overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleSelectCategoryMobile(category)}
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

      <style jsx global>{`
        input[type='search']::-webkit-search-cancel-button,
        input[type='search']::-webkit-search-decoration,
        input[type='search']::-webkit-search-results-button,
        input[type='search']::-webkit-search-results-decoration {
          -webkit-appearance: none;
        }
      `}</style>
    </motion.div>
  );
};

export default CategoryFilter;
