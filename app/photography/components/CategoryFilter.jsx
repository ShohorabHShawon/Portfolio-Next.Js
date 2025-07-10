'use client';
import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
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
      <div className="md:hidden relative">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="appearance-none bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 text-white text-sm font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-white/30 min-w-[200px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 1rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '3rem',
          }}
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
              className="bg-zinc-900 text-white"
            >
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;
