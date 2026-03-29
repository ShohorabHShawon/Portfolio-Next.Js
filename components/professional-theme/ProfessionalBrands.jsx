'use client';

const BRANDS = [
  { name: 'Simple Declaration', category: 'Brand Identity' },
  { name: 'AAT Art Cafe', category: 'Creative Business' },
  { name: 'MJ Education and Visa Services', category: 'Education Services' },
];

export default function ProfessionalBrands() {
  return (
    <div className="bg-white py-14 dark:bg-[#020617]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">Collaborations</p>
            <p className="mt-2 max-w-2xl text-lg font-semibold text-slate-900 dark:text-slate-100">
              Partnerships with teams in technology, education, and creative sectors.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {BRANDS.map((brand) => (
              <article key={brand.name} className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{brand.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">{brand.category}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
