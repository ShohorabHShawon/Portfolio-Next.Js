import { groq } from 'next-sanity';
import { Bangers, Comic_Neue, DM_Sans, Lora, Source_Serif_4 } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';
import BlogModernFilterBar from './BlogModernFilterBar';
import BlogMotionSection from './BlogMotionSection';
import BlogThemeShell from './BlogThemeShell';
import QuoteOfDayCard from './QuoteOfDayCard';
import { getQuoteOfTheDay } from './quotes';

export const revalidate = 120;
export const dynamic = 'force-static';

const SITE_URL = 'https://shohorab.com';

export const metadata = {
  title: 'Blog | Shohorab H Shawon',
  description:
    'Read software engineering stories, product lessons, and creative experiments by Shohorab H Shawon (Shohorab Hossain Shawon).',
  keywords: [
    'Shohorab H Shawon blog',
    'Shohorab Hossain Shawon blog',
    'Shohorab Shawon blog',
    'Shawon blog',
    'Shohorab blog',
    'software engineering blog',
    'Next.js blog',
    'web development articles',
    'developer journal',
    'tech stories',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Shohorab H Shawon',
    description:
      'Software engineering and creative stories by Shohorab H Shawon. Explore practical web development insights and project lessons.',
    url: `${SITE_URL}/blog`,
    siteName: 'Shohorab H Shawon Blog',
    type: 'website',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Shohorab H Shawon Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Shohorab H Shawon',
    description:
      'Read web development and software engineering stories by Shohorab H Shawon.',
    images: ['/profile.jpg'],
    creator: '@shohorab',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const comicTitleFont = Bangers({
  subsets: ['latin'],
  weight: '400',
});

const comicBodyFont = Comic_Neue({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const modernSansFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-blog-modern-sans',
});

const modernSerifFont = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-blog-modern-serif',
});

const modernQuoteFont = Lora({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic'],
});

const BLOG_THEME_BOOTSTRAP_SCRIPT = `(function () {
  try {
    var storedTheme = window.localStorage.getItem('blog-theme');
    if (storedTheme === 'modern' || storedTheme === 'manga') {
      document.documentElement.setAttribute('data-blog-theme', storedTheme);
      return;
    }
  } catch (err) {}
  document.documentElement.setAttribute('data-blog-theme', 'manga');
})();`;

const BLOG_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    "title": coalesce(title, "Untitled post"),
    "slug": slug.current,
    "publishedAt": coalesce(publishedAt, _createdAt),
    mainImage,
    "author": coalesce(author->name, "Unknown Author"),
    "categories": categories[]->title,
    "excerpt": coalesce(pt::text(body)[0...190], "A thoughtful story is waiting for you here."),
    "plainText": coalesce(pt::text(body), "")
  }
`;

function formatDate(dateString) {
  if (!dateString) return 'Coming soon';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(dateString));
}

function estimateReadingTime(textContent) {
  const words = String(textContent || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

export default async function BlogPage() {
  const posts = await client.fetch(BLOG_POSTS_QUERY, {}, { next: { revalidate } });
  const quoteOfDay = getQuoteOfTheDay();
  const normalizedPosts = (posts || []).map((post) => ({
    ...post,
    readingTimeMinutes: estimateReadingTime(post.plainText || post.excerpt),
  }));
  const featured = normalizedPosts?.[0];
  const restPosts = normalizedPosts?.slice(1) || [];
  const indexablePosts = normalizedPosts || [];
  const allCategories = Array.from(
    new Set(
      normalizedPosts.flatMap((post) => (Array.isArray(post.categories) ? post.categories : []))
    )
  )
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Shohorab H Shawon Blog',
    alternateName: ['Shohorab Hossain Shawon Blog', 'Shohorab Shawon Blog', 'Shawon Blog'],
    description:
      'Software engineering stories, product lessons, and creative experiments by Shohorab H Shawon.',
    url: `${SITE_URL}/blog`,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: 'Shohorab H Shawon',
      alternateName: ['Shohorab Hossain Shawon', 'Shohorab Shawon', 'Shawon'],
      url: SITE_URL,
    },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: indexablePosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <BlogThemeShell>
      <main
        className={`${comicBodyFont.className} ${modernSansFont.variable} ${modernSerifFont.variable} blog-page-root blog-list-page relative min-h-screen overflow-hidden bg-[#fff9e8] text-[#111111] transition-colors dark:bg-[#050b18] dark:text-[#e6f3ff]`}
      >
        <script
          id="blog-theme-bootstrap"
          dangerouslySetInnerHTML={{ __html: BLOG_THEME_BOOTSTRAP_SCRIPT }}
        />
        <script
          id="blog-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
        <script
          id="blog-list-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />

        <div className="blog-theme-decor pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(#111111_0.8px,transparent_0.8px)] opacity-[0.14] [background-size:16px_16px] dark:bg-[radial-gradient(#5eead4_0.8px,transparent_0.8px)] dark:opacity-[0.2]" />
          <div className="absolute inset-0 hidden [background-image:radial-gradient(#020617_0.8px,transparent_0.8px)] opacity-[0.28] [background-size:16px_16px] [background-position:2px_2px] dark:block" />
          <div className="absolute -left-24 top-24 h-52 w-52 rounded-full border-4 border-black bg-[#fb7185] dark:border-[#5eead4] dark:bg-[#1a2d52]" />
          <div className="absolute -right-24 bottom-24 h-44 w-44 rounded-full border-4 border-black bg-[#60a5fa] dark:border-[#5eead4] dark:bg-[#145e66]" />
          <div className="absolute left-[7%] top-[34%] h-8 w-36 rotate-[-8deg] rounded-full border-4 border-black bg-[#fde047] dark:border-[#5eead4] dark:bg-[#1b3652]" />
          <div className="absolute right-[11%] top-[18%] h-20 w-20 rounded-full border-4 border-black bg-[#fdba74] dark:border-[#5eead4] dark:bg-[#2c496f]" />
        </div>

      <div className="blog-theme-view blog-theme-view-manga">
      <BlogMotionSection delay={0.04} y={16}>
        <section className="blog-list-hero-section relative mx-auto max-w-6xl px-6 pb-4 pt-20 md:px-8 md:pt-24">
          <div className="blog-hero-panel blog-modern-surface rotate-[-1deg] rounded-[30px] border-4 border-black bg-[#ffdb4d] px-6 py-8 shadow-[8px_8px_0_#111111] dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[8px_8px_0_#0a3a46] md:px-10 md:py-10">
            <p className="blog-theme-pill inline-flex rounded-full border-2 border-black bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]">
              Manga Journal
            </p>
            <h1 className={`${comicTitleFont.className} blog-theme-heading mt-5 max-w-4xl text-5xl uppercase leading-[0.95] tracking-wide dark:text-[#fbbf24] md:text-7xl`}>
              Panels Of Code, Stories Of Shipping
            </h1>
            <p className="blog-hero-summary mt-5 max-w-2xl text-base font-semibold text-[#1e293b] dark:text-[#cfe7f7] md:text-lg">
              Adventures from software missions, product battles, and creative experiments.
            </p>
            <p className="blog-hero-author mt-3 max-w-3xl text-sm font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-[#b7d6ea]">
              By Shohorab H Shawon (Shohorab Hossain Shawon, Shawon)
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="blog-theme-action group inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-800 transition hover:-translate-y-0.5 hover:bg-[#fff7cc] dark:border-[#5eead4] dark:bg-[#13233a] dark:text-[#d8ebf8] dark:hover:bg-[#1b3652]"
              >
                <span
                  aria-hidden="true"
                  className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-[#ef4444] text-[10px] font-black leading-none text-white shadow-[2px_2px_0_#111111] transition-transform duration-200 before:absolute before:-right-1 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rotate-45 before:border-b-2 before:border-r-2 before:border-black before:bg-[#ef4444] group-hover:-translate-x-0.5 dark:border-[#5eead4] dark:bg-[#fbbf24] dark:text-[#0b1220] dark:shadow-[2px_2px_0_#0a3a46] dark:before:border-[#5eead4] dark:before:bg-[#fbbf24]"
                >
                  {'<'}
                </span>
                Go To Portfolio
              </Link>

              <Link
                href="/photography"
                className="blog-theme-action group inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#ffedd5] px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-800 transition hover:-translate-y-0.5 hover:bg-[#fde68a] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8] dark:hover:bg-[#2e5b86]"
              >
                <span
                  aria-hidden="true"
                  className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-white text-slate-900 shadow-[2px_2px_0_#111111] transition-transform duration-200 group-hover:rotate-6 group-hover:scale-105 dark:border-[#5eead4] dark:bg-[#13233a] dark:text-[#d8ebf8] dark:shadow-[2px_2px_0_#0a3a46] before:absolute before:-right-1 before:-top-1 before:h-2 before:w-2 before:rotate-45 before:border before:border-black before:bg-[#fbbf24] dark:before:border-[#5eead4] dark:before:bg-[#f59e0b]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 8h4l1.4-2h5.2L16 8h4v10H4z" />
                    <circle cx="12" cy="13" r="3.2" />
                  </svg>
                </span>
                Photography
              </Link>
            </div>
          </div>

          {quoteOfDay && (
            <div className="mt-5 md:mt-6">
              <QuoteOfDayCard initialQuote={quoteOfDay} variant="manga" compact />
            </div>
          )}
        </section>
      </BlogMotionSection>

      <BlogMotionSection delay={0.08} y={14}>
        <section className="mx-auto max-w-6xl px-6 pb-8 md:px-8">
          <BlogModernFilterBar
            categories={allCategories}
            totalPosts={normalizedPosts.length}
            variant="manga"
          />
        </section>
      </BlogMotionSection>

      {featured ? (
        <BlogMotionSection delay={0.12} y={20}>
          <section className="blog-list-featured-section relative mx-auto max-w-6xl px-6 pb-12 md:px-8 md:pb-14">
            {featured.slug && !featured.isDraft ? (
              <Link
                href={`/blog/${featured.slug}`}
                className="blog-featured-card blog-modern-surface group block overflow-hidden rounded-[28px] border-4 border-black bg-white p-4 shadow-[7px_7px_0_#111111] transition hover:-translate-y-1 dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[7px_7px_0_#0a3a46]"
                data-blog-post-item="true"
                data-slug={featured.slug}
                data-search={`${featured.title} ${featured.excerpt} ${featured.author} ${(featured.categories || []).join(' ')}`}
                data-categories={(featured.categories || []).join('|')}
              >
                <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
                  <div className="blog-image-skeleton relative min-h-72 overflow-hidden rounded-2xl">
                    {featured.mainImage ? (
                      <Image
                        src={urlFor(featured.mainImage).width(1400).height(900).url()}
                        alt={featured.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 55vw"
                        priority
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#fecdd3] via-[#fde68a] to-[#bfdbfe] dark:from-[#243f73] dark:via-[#2a5f8f] dark:to-[#146368]" />
                    )}
                  </div>

                  <div className="blog-featured-content flex flex-col justify-between rounded-2xl border-4 border-black bg-[#fff7cc] p-6 dark:border-[#5eead4] dark:bg-[#13233a]">
                    <div>
                      <p className="blog-theme-pill mb-4 inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]">
                        Main Episode
                      </p>
                      <h2 className={`${comicTitleFont.className} blog-theme-heading blog-post-title text-4xl uppercase leading-[0.95] tracking-wide text-slate-900 dark:text-[#fbbf24] md:text-5xl`}>
                        {featured.title}
                      </h2>
                      <p className="blog-post-excerpt mt-4 text-base leading-7 text-slate-700 dark:text-[#b7d6ea]">{featured.excerpt}...</p>
                    </div>
                    <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-[#b7d6ea]">
                      <span>{formatDate(featured.publishedAt)}</span>
                      <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fbbf24]" />
                      <span>{featured.author}</span>
                      <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fbbf24]" />
                      <span>{featured.readingTimeMinutes} min read</span>
                      <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fbbf24]" />
                      <span>Read story</span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
                <div
                  className="blog-featured-card blog-modern-surface group block overflow-hidden rounded-[28px] border-4 border-black bg-white p-4 shadow-[7px_7px_0_#111111] dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[7px_7px_0_#0a3a46]"
                  data-blog-post-item="true"
                  data-slug={featured.slug || featured._id}
                  data-search={`${featured.title} ${featured.excerpt} ${featured.author} ${(featured.categories || []).join(' ')}`}
                  data-categories={(featured.categories || []).join('|')}
                >
                <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
                  <div className="blog-image-skeleton relative min-h-72 overflow-hidden rounded-2xl">
                    {featured.mainImage ? (
                      <Image
                        src={urlFor(featured.mainImage).width(1400).height(900).url()}
                        alt={featured.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 55vw"
                        priority
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#fecdd3] via-[#fde68a] to-[#bfdbfe] dark:from-[#243f73] dark:via-[#2a5f8f] dark:to-[#146368]" />
                    )}
                  </div>

                  <div className="blog-featured-content flex flex-col justify-between rounded-2xl border-4 border-black bg-[#fff7cc] p-6 dark:border-[#5eead4] dark:bg-[#13233a]">
                    <div>
                      <p className="blog-theme-pill mb-4 inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]">
                        Draft Episode
                      </p>
                      <h2 className={`${comicTitleFont.className} blog-theme-heading blog-post-title text-4xl uppercase leading-[0.95] tracking-wide text-slate-900 dark:text-[#fbbf24] md:text-5xl`}>
                        {featured.title}
                      </h2>
                      <p className="blog-post-excerpt mt-4 text-base leading-7 text-slate-700 dark:text-[#b7d6ea]">{featured.excerpt}...</p>
                    </div>
                    <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-[#b7d6ea]">
                      <span>{formatDate(featured.publishedAt)}</span>
                      <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fbbf24]" />
                      <span>{featured.author}</span>
                      <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fbbf24]" />
                      <span>{featured.readingTimeMinutes} min read</span>
                      <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fbbf24]" />
                      <span>Add slug in Studio to open this post</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </BlogMotionSection>
      ) : (
        <BlogMotionSection delay={0.12} y={20}>
          <section className="mx-auto max-w-6xl px-6 pb-16 md:px-8">
            <div className="rounded-[28px] border-4 border-black bg-[#fde68a] p-8 text-center shadow-[7px_7px_0_#111111] dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[7px_7px_0_#0a3a46]">
              <h2 className={`${comicTitleFont.className} text-4xl uppercase dark:text-[#fbbf24]`}>Next Episode Loading</h2>
              <p className="mt-3 text-base font-semibold text-slate-700 dark:text-[#b7d6ea]">Create your first post in Sanity Studio and it will appear here automatically.</p>
            </div>
          </section>
        </BlogMotionSection>
      )}

      {restPosts.length > 0 && (
        <BlogMotionSection delay={0.2} y={22}>
          <section className="blog-list-grid-section mx-auto max-w-6xl px-6 pb-20 md:px-8">
            <div className="mb-7 flex items-end justify-between">
              <h3 className={`${comicTitleFont.className} blog-theme-heading text-4xl uppercase dark:text-[#eef6ff] md:text-5xl`}>More Episodes</h3>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700 dark:text-[#b7d6ea]">Recent drops</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {restPosts.map((post) => (
                post.slug && !post.isDraft ? (
                  <Link
                    href={`/blog/${post.slug}`}
                    key={post._id}
                    className="blog-post-card blog-modern-surface group block h-full rounded-[24px] border-4 border-black bg-white p-4 shadow-[6px_6px_0_#111111] transition duration-300 hover:-translate-y-1 dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[6px_6px_0_#0a3a46]"
                    data-blog-post-item="true"
                    data-slug={post.slug}
                    data-search={`${post.title} ${post.excerpt} ${post.author} ${(post.categories || []).join(' ')}`}
                    data-categories={(post.categories || []).join('|')}
                  >
                    <div className="blog-image-skeleton relative mb-4 h-48 overflow-hidden rounded-xl">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(900).height(600).url()}
                          alt={post.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#fecaca] via-[#fef08a] to-[#bfdbfe] dark:from-[#243f73] dark:via-[#2a5f8f] dark:to-[#146368]" />
                      )}
                    </div>

                    <p className="blog-theme-pill inline-flex rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]">{formatDate(post.publishedAt)}</p>
                    <h4 className={`${comicTitleFont.className} blog-theme-heading blog-post-title mt-3 text-3xl uppercase leading-[0.95] text-slate-900 dark:text-[#fbbf24]`}>{post.title}</h4>
                    <p className="blog-post-excerpt mt-3 text-sm leading-6 text-slate-700 dark:text-[#b7d6ea]">{post.excerpt}...</p>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700 dark:text-[#b7d6ea]">
                      {post.readingTimeMinutes} min read
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {(post.categories || []).slice(0, 2).map((cat) => (
                        <span
                          key={`${post._id}-${cat}`}
                          className="blog-theme-chip rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </Link>
                ) : (
                  <div
                    key={post._id}
                    className="blog-post-card blog-modern-surface h-full rounded-[24px] border-4 border-black bg-white p-4 shadow-[6px_6px_0_#111111] dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[6px_6px_0_#0a3a46]"
                    data-blog-post-item="true"
                    data-slug={post.slug || post._id}
                    data-search={`${post.title} ${post.excerpt} ${post.author} ${(post.categories || []).join(' ')}`}
                    data-categories={(post.categories || []).join('|')}
                  >
                    <div className="blog-image-skeleton relative mb-4 h-48 overflow-hidden rounded-xl">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(900).height(600).url()}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#fecaca] via-[#fef08a] to-[#bfdbfe] dark:from-[#243f73] dark:via-[#2a5f8f] dark:to-[#146368]" />
                      )}
                    </div>

                    <p className="blog-theme-pill inline-flex rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]">{formatDate(post.publishedAt)}</p>
                    <h4 className={`${comicTitleFont.className} blog-theme-heading blog-post-title mt-3 text-3xl uppercase leading-[0.95] text-slate-900 dark:text-[#fbbf24]`}>{post.title}</h4>
                    <p className="blog-post-excerpt mt-3 text-sm leading-6 text-slate-700 dark:text-[#b7d6ea]">{post.excerpt}...</p>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700 dark:text-[#b7d6ea]">
                      {post.readingTimeMinutes} min read
                    </p>
                    <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:text-[#b7d6ea]">Add a slug in Studio to open this post</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {(post.categories || []).slice(0, 2).map((cat) => (
                        <span
                          key={`${post._id}-${cat}`}
                          className="blog-theme-chip rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>
        </BlogMotionSection>
      )}
      </div>

      <div className="blog-theme-view blog-theme-view-modern">
        <BlogMotionSection delay={0.04} y={16}>
          <section className="blog-modern-home-shell mx-auto max-w-6xl px-6 pb-12 pt-24 md:px-8 md:pt-28">
            <div className="blog-modern-home-head">
              <p className="blog-modern-kicker">Shohorab H Shawon Blog</p>
              <div className="blog-modern-hero-actions">
                <Link href="/" className="inline-flex items-center justify-center rounded-full border border-black bg-black px-[0.95rem] py-[0.45rem] text-xs font-medium text-white transition hover:bg-[#242424] hover:text-white dark:border-[#f3f3f3] dark:bg-[#f3f3f3] dark:text-black dark:hover:bg-[#e0e0e0]">
                  Portfolio
                </Link>
                <Link href="/photography" className="inline-flex items-center justify-center rounded-full border border-[#d0d0d0] bg-white px-[0.95rem] py-[0.45rem] text-xs font-medium text-black transition hover:border-[#aaaaaa] hover:bg-[#fafafa] dark:border-[#3a3a3a] dark:bg-transparent dark:text-[#f3f3f3] dark:hover:border-[#5a5a5a]">
                  Photography
                </Link>
              </div>
            </div>
            <h1 className={`${modernSerifFont.className} blog-modern-hero-title`}>
              Stories, Ideas, And Real-World Notes From Building On The Web.
            </h1>
            <p className="blog-modern-hero-text">
              Engineering lessons, product reflections, and creative experiments published in an editorial format.
            </p>
            <p className="blog-modern-hero-byline">By Shohorab H Shawon</p>
            {quoteOfDay && (
              <QuoteOfDayCard
                initialQuote={quoteOfDay}
                variant="modern"
                quoteFontClassName={modernQuoteFont.className}
              />
            )}
          </section>
        </BlogMotionSection>

        <BlogMotionSection delay={0.08} y={14}>
          <section className="blog-modern-featured-section mx-auto px-6 pb-8 md:px-8">
            <BlogModernFilterBar
              categories={allCategories}
              totalPosts={normalizedPosts.length}
              variant="modern"
            />
          </section>
        </BlogMotionSection>

        {featured ? (
          <BlogMotionSection delay={0.12} y={20}>
            <section className="blog-modern-featured-section mx-auto max-w-6xl px-6 pb-10 md:px-8">
              {featured.slug && !featured.isDraft ? (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="blog-modern-featured-card group"
                  data-blog-post-item="true"
                  data-slug={featured.slug}
                  data-search={`${featured.title} ${featured.excerpt} ${featured.author} ${(featured.categories || []).join(' ')}`}
                  data-categories={(featured.categories || []).join('|')}
                >
                  <div className="blog-modern-featured-copy">
                    <p className="blog-modern-meta">Featured Story</p>
                    <h2 className={`${modernSerifFont.className} blog-modern-featured-title`}>{featured.title}</h2>
                    <p className="blog-modern-featured-excerpt">{featured.excerpt}...</p>
                    <div className="blog-modern-featured-footer">
                      <span>{featured.author}</span>
                      <span>•</span>
                      <span>{formatDate(featured.publishedAt)}</span>
                      <span>•</span>
                      <span>{featured.readingTimeMinutes} min read</span>
                      <span>•</span>
                      <span>Read article</span>
                    </div>
                  </div>

                  <div className="blog-modern-featured-media">
                    {featured.mainImage ? (
                      <Image
                        src={urlFor(featured.mainImage).width(1400).height(900).url()}
                        alt={featured.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 52vw"
                        priority
                      />
                    ) : (
                      <div className="h-full w-full bg-[#e2e8f0] dark:bg-[#1e293b]" />
                    )}
                  </div>
                </Link>
              ) : (
                <div
                  className="blog-modern-featured-card"
                  data-blog-post-item="true"
                  data-slug={featured.slug || featured._id}
                  data-search={`${featured.title} ${featured.excerpt} ${featured.author} ${(featured.categories || []).join(' ')}`}
                  data-categories={(featured.categories || []).join('|')}
                >
                  <div className="blog-modern-featured-copy">
                    <p className="blog-modern-meta">Draft Post</p>
                    <h2 className={`${modernSerifFont.className} blog-modern-featured-title`}>{featured.title}</h2>
                    <p className="blog-modern-featured-excerpt">{featured.excerpt}...</p>
                    <div className="blog-modern-featured-footer">
                      <span>{featured.author}</span>
                      <span>•</span>
                      <span>{formatDate(featured.publishedAt)}</span>
                      <span>•</span>
                      <span>{featured.readingTimeMinutes} min read</span>
                      <span>•</span>
                      <span>Add slug in Studio to open this post</span>
                    </div>
                  </div>

                  <div className="blog-modern-featured-media">
                    {featured.mainImage ? (
                      <Image
                        src={urlFor(featured.mainImage).width(1400).height(900).url()}
                        alt={featured.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 52vw"
                        priority
                      />
                    ) : (
                      <div className="h-full w-full bg-[#e2e8f0] dark:bg-[#1e293b]" />
                    )}
                  </div>
                </div>
              )}
            </section>
          </BlogMotionSection>
        ) : (
          <BlogMotionSection delay={0.12} y={20}>
            <section className="mx-auto max-w-6xl px-6 pb-16 md:px-8">
              <div className="blog-modern-empty-state">
                <h2 className={`${modernSerifFont.className} text-4xl md:text-5xl`}>No Posts Yet</h2>
                <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                  Create your first post in Sanity Studio and it will appear here.
                </p>
              </div>
            </section>
          </BlogMotionSection>
        )}

        {restPosts.length > 0 && (
          <BlogMotionSection delay={0.2} y={22}>
            <section className="blog-modern-feed-shell mx-auto max-w-6xl px-6 pb-20 md:px-8">
              <div className="blog-modern-grid-head">
                <h3 className={`${modernSerifFont.className} blog-modern-grid-title`}>Latest Stories</h3>
                <p className="blog-modern-grid-subtitle">{normalizedPosts.length || 0} published posts</p>
              </div>

              <div className="blog-modern-feed-list">
                {restPosts.map((post) => (
                  post.slug && !post.isDraft ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      key={post._id}
                      className="blog-modern-feed-item group"
                      data-blog-post-item="true"
                      data-slug={post.slug}
                      data-search={`${post.title} ${post.excerpt} ${post.author} ${(post.categories || []).join(' ')}`}
                      data-categories={(post.categories || []).join('|')}
                    >
                      <div className="blog-modern-feed-copy">
                        <p className="blog-modern-meta">
                          {post.author} • {formatDate(post.publishedAt)} • {post.readingTimeMinutes} min read
                        </p>
                        <h4 className={`${modernSerifFont.className} blog-modern-post-title`}>{post.title}</h4>
                        <p className="blog-modern-post-excerpt">{post.excerpt}...</p>

                        <div className="blog-modern-chip-row">
                          {(post.categories || []).slice(0, 2).map((cat) => (
                            <span key={`${post._id}-${cat}`} className="blog-modern-chip">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="blog-modern-feed-media">
                        {post.mainImage ? (
                          <Image
                            src={urlFor(post.mainImage).width(900).height(600).url()}
                            alt={post.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 240px"
                          />
                        ) : (
                          <div className="h-full w-full bg-[#ececec] dark:bg-[#222222]" />
                        )}
                      </div>
                    </Link>
                  ) : (
                    <div
                      key={post._id}
                      className="blog-modern-feed-item blog-modern-feed-item-draft"
                      data-blog-post-item="true"
                      data-slug={post.slug || post._id}
                      data-search={`${post.title} ${post.excerpt} ${post.author} ${(post.categories || []).join(' ')}`}
                      data-categories={(post.categories || []).join('|')}
                    >
                      <div className="blog-modern-feed-copy">
                        <p className="blog-modern-meta">
                          {post.author} • {formatDate(post.publishedAt)} • {post.readingTimeMinutes} min read
                        </p>
                        <h4 className={`${modernSerifFont.className} blog-modern-post-title`}>{post.title}</h4>
                        <p className="blog-modern-post-excerpt">{post.excerpt}...</p>
                        <p className="blog-modern-draft-note">Add a slug in Studio to open this post</p>

                        <div className="blog-modern-chip-row">
                          {(post.categories || []).slice(0, 2).map((cat) => (
                            <span key={`${post._id}-${cat}`} className="blog-modern-chip">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="blog-modern-feed-media">
                        {post.mainImage ? (
                          <Image
                            src={urlFor(post.mainImage).width(900).height(600).url()}
                            alt={post.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 240px"
                          />
                        ) : (
                          <div className="h-full w-full bg-[#ececec] dark:bg-[#222222]" />
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </section>
          </BlogMotionSection>
        )}
      </div>
      </main>
    </BlogThemeShell>
  );
}