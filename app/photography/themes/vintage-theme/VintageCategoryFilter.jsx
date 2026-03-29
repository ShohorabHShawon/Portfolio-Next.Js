'use client';

export default function VintageCategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="sticky top-0 z-40 -mx-4 mb-8 border-y border-[#cbbbaa]/60 bg-[#f8f2e7]/90 px-4 py-3 backdrop-blur md:mx-0 md:rounded-2xl md:border">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-1">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition md:text-[13px] ${
                isActive
                  ? 'border-[#5f4a36] bg-[#5f4a36] text-[#f8f1e5] shadow-[0_10px_20px_rgba(80,58,40,0.22)]'
                  : 'border-[#b69f84]/55 bg-[#fefaf3] text-[#554232] hover:bg-[#f3e7d4]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
