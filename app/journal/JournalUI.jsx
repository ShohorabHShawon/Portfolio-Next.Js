import Image from 'next/image';
import Link from 'next/link';

import { urlFor } from '../../sanity/lib/image';

export function formatDate(dateString, month = 'short') {
  if (!dateString) return 'Coming soon';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
  }).format(new Date(dateString));
}

export function entryNumber(number) {
  return `No. ${String(number).padStart(2, '0')}`;
}

export function ArrowIcon({ direction = 'right', className = '' }) {
  const rotation = { right: '', left: 'rotate-180', up: '-rotate-45' }[direction] || '';
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`${className} ${rotation}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function SectionLabel({ children, index, className = '' }) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-journal-accent ${className}`}
    >
      <span aria-hidden="true" className="inline-block h-px w-8 bg-current opacity-60" />
      {children}
      {index ? <span className="text-journal-muted">/ {index}</span> : null}
    </p>
  );
}

export function CategoryChips({ categories = [], limit, linked = false }) {
  const items = (categories || []).filter(Boolean).slice(0, limit);
  if (items.length === 0) return null;

  const chipClass =
    'border border-journal-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-journal-muted transition';

  return (
    <span className="flex flex-wrap gap-1.5">
      {items.map((cat) =>
        linked ? (
          <Link
            key={cat}
            href={`/journal?cat=${encodeURIComponent(cat)}`}
            className={`${chipClass} hover:border-journal-accent hover:text-journal-accent`}
          >
            {cat}
          </Link>
        ) : (
          <span key={cat} className={chipClass}>
            {cat}
          </span>
        )
      )}
    </span>
  );
}

export function ImageFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-journal-line/50">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-journal-muted">No frame</span>
    </div>
  );
}

// One entry in the journal log: number, copy and a framed thumbnail.
export function EntryRow({ post, number, href, filterAttributes = {}, priority = false }) {
  const Wrapper = href ? Link : 'div';
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      {...filterAttributes}
      className="group grid gap-5 border-t border-journal-line py-8 sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-8 md:grid-cols-[72px_minmax(0,1fr)_260px] md:py-10"
    >
      <span className="hidden pt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-journal-muted transition-colors group-hover:text-journal-accent md:block">
        {entryNumber(number)}
      </span>

      <div className="order-2 min-w-0 sm:order-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted md:hidden">
            {entryNumber(number)}
          </span>
          <CategoryChips categories={post.categories} limit={2} />
        </div>
        <h3 className="mt-3 text-[1.6rem] font-medium leading-[1.08] tracking-[-0.035em] text-journal-ink transition-colors group-hover:text-journal-accent md:text-[2rem]">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-2 max-w-2xl text-[15px] leading-relaxed text-journal-body/80">
          {post.excerpt}…
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-journal-muted">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTimeMinutes} min read</span>
          {href ? (
            <span className="ml-auto hidden items-center gap-1.5 text-journal-ink transition-colors group-hover:text-journal-accent sm:inline-flex">
              Read
              <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          ) : (
            <span>Add a slug in Studio to open</span>
          )}
        </div>
      </div>

      <div className="blog-image-skeleton relative order-1 aspect-[16/10] overflow-hidden sm:order-2 sm:aspect-[4/3]">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(720).height(540).url()}
            alt={post.title}
            fill
            priority={priority}
            className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
            sizes="(max-width: 640px) 100vw, 260px"
          />
        ) : (
          <ImageFallback />
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 border border-white/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    </Wrapper>
  );
}
