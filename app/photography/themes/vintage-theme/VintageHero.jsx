'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function VintageHero({ photos }) {
  const heroPhotos = photos?.slice(0, 4) || [];

  return (
    <section className="relative overflow-hidden pt-24 pb-12 md:pt-28 md:pb-14">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 md:grid-cols-[1.25fr_0.95fr] md:px-8">
        <div className="relative rounded-[28px] border border-[#c8b9a7] bg-[#fffdf9]/70 p-6 shadow-[0_22px_40px_rgba(74,52,28,0.08)] backdrop-blur-sm md:p-9">
          <p className="mb-4 w-fit rounded-full border border-[#947257]/35 bg-[#f8eedf] px-4 py-1 text-[11px] uppercase tracking-[0.22em] text-[#7a5b42]">
            Modern Vintage
          </p>

          <h1
            className="max-w-2xl text-4xl font-semibold leading-tight text-[#2f2a23] sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
          >
            Timeless Moments, Styled For Now
          </h1>

          <p
            className="mt-5 max-w-2xl text-base leading-relaxed text-[#56493d] md:text-lg"
            style={{ fontFamily: '"Avenir Next", "Trebuchet MS", sans-serif' }}
          >
            A modern-vintage collection where cinematic storytelling meets a refined editorial canvas.
            Warm grain, balanced spacing, and curated details give each frame a contemporary museum feel.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById('gallery')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="rounded-full border border-[#5f4a36] bg-[#5f4a36] px-7 py-2.5 text-sm uppercase tracking-[0.15em] text-[#f8f1e5] transition hover:bg-[#4d3b2b]"
            >
              Explore Archive
            </button>
            <Link
              href="/"
              className="rounded-full border border-[#9f856b]/50 bg-[#f7ecdb] px-7 py-2.5 text-sm uppercase tracking-[0.12em] text-[#5c4534] transition hover:bg-[#f2e1c7]"
            >
              Full Portfolio
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 border-t border-[#d7cabb] pt-4 text-center">
            <div>
              <p className="text-xl font-semibold text-[#403328]">50+</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#7a6551]">Photographs</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-[#403328]">9</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#7a6551]">Categories</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-[#403328]">1</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#7a6551]">Visual Story</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {heroPhotos.map((photo, index) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden rounded-2xl border border-[#ccbba8] bg-[#efe1ce] shadow-[0_18px_34px_rgba(70,50,30,0.12)] ${
                index === 0 ? 'col-span-2 h-52 md:h-60' : 'h-40 md:h-44'
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover sepia-[0.1]"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f1711]/55 to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 line-clamp-1 text-xs uppercase tracking-[0.14em] text-[#f8ebd9]">
                {photo.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
