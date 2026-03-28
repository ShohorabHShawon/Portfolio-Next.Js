'use client';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
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
    <div className="flex justify-center mb-16">
      {/* Desktop Filter */}
      <div className="hidden md:block relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-full p-2 shadow-xl">
        <div className="flex gap-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-white text-black shadow-lg transform scale-105'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
              {selectedCategory === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full -z-10 blur-sm" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden w-full px-4" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-6 py-3 text-white text-sm font-medium shadow-xl hover:bg-white/10 transition-all flex items-center justify-between"
        >
          <span>{selectedCategory}</span>
          <ChevronDown
            className="w-5 h-5 transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="max-h-[60vh] overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleSelectCategory(category)}
                  className={`w-full px-6 py-4 text-left text-sm font-medium transition-all duration-200 border-b border-white/5 last:border-b-0 ${
                    selectedCategory === category
                      ? 'bg-white/20 text-white'
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
  );
};

export default CategoryFilter;
