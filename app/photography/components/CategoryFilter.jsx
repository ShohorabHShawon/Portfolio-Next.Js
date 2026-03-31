'use client';
import { motion } from 'framer-motion';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
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
  const dropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
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

  return (
    <motion.div
      className="sticky top-0 z-50 mb-16 border-b border-[#181A1B]/10 bg-white py-4 dark:border-gray-800 dark:bg-[#181A1B]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="mb-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_auto] lg:items-center">
          <label className="flex items-center gap-3 rounded-2xl border border-[#181A1B]/10 bg-white px-4 py-3 shadow-sm transition focus-within:border-[#181A1B]/30 dark:border-white/10 dark:bg-[#121314]/80 dark:focus-within:border-white/25">
            <Search className="h-4 w-4 shrink-0 text-[#181A1B]/50 dark:text-white/45" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search title, category, or description"
              className="w-full bg-transparent text-sm text-[#181A1B] outline-none placeholder:text-[#181A1B]/40 dark:text-white dark:placeholder:text-white/35"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="rounded-full p-1 text-[#181A1B]/45 transition hover:bg-[#181A1B]/5 hover:text-[#181A1B] dark:text-white/45 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>

          <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex w-full items-center gap-3 rounded-2xl border border-[#181A1B]/10 bg-white px-4 py-3 shadow-sm transition hover:border-[#181A1B]/20 dark:border-white/10 dark:bg-[#121314]/80 dark:hover:border-white/15"
            >
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-[#181A1B]/50 dark:text-white/45" />
              <span className="flex-1 text-left text-sm text-[#181A1B] dark:text-white">
                {sortOptions.find((opt) => opt.value === sortBy)?.label || 'Sort'}
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

          <div className="hidden text-right text-xs uppercase tracking-[0.18em] text-[#181A1B]/45 dark:text-white/35 lg:block">
            {resultCount} of {totalCount} photos
          </div>
        </div>

        <div className="hidden md:block">
          <div className="relative mx-auto rounded-full border border-[#181A1B]/10 bg-white p-2 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-[#0f1011]/60">
            <div className="flex gap-1 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#181A1B] text-white shadow-lg dark:bg-white/20 dark:text-white'
                      : 'text-[#181A1B] hover:bg-[#181A1B]/5 hover:text-[#181A1B] dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white'
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative md:hidden" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-[#181A1B]/10 bg-white px-6 py-3 text-sm font-medium text-[#181A1B] shadow-lg transition-all hover:bg-[#181A1B]/5 dark:border-white/10 dark:bg-[#121314]/80 dark:text-white dark:hover:bg-[#121314]"
          >
            <span>{selectedCategory}</span>
            <ChevronDown
              className="h-5 w-5 transition-transform duration-300"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {isOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0f1011]/95 shadow-2xl backdrop-blur-xl">
              <div className="max-h-[60vh] overflow-y-auto">
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
    </motion.div>
  );
};

export default CategoryFilter;
