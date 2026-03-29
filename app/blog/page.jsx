import { groq } from 'next-sanity';
import { Bangers, Comic_Neue } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import ThemeToggle from '@/components/ThemeToggle';
import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';
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

const BLOG_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    "title": coalesce(title, "Untitled post"),
    "slug": slug.current,
    "publishedAt": coalesce(publishedAt, _createdAt),
    mainImage,
    "author": coalesce(author->name, "Unknown Author"),
    "categories": categories[]->title,
    "excerpt": coalesce(pt::text(body)[0...190], "A thoughtful story is waiting for you here.")
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

export default async function BlogPage() {
  const posts = await client.fetch(BLOG_POSTS_QUERY, {}, { next: { revalidate } });
  const quoteOfDay = getQuoteOfTheDay();
  const featured = posts?.[0];
  const restPosts = posts?.slice(1) || [];
  const indexablePosts = posts || [];

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
    <main className={`${comicBodyFont.className} relative min-h-screen overflow-hidden bg-[#fff9e8] text-[#111111] transition-colors dark:bg-[#050b18] dark:text-[#e6f3ff]`}>
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

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#111111_0.8px,transparent_0.8px)] opacity-[0.14] [background-size:16px_16px] dark:bg-[radial-gradient(#5eead4_0.8px,transparent_0.8px)] dark:opacity-[0.2]" />
        <div className="absolute inset-0 hidden [background-image:radial-gradient(#020617_0.8px,transparent_0.8px)] opacity-[0.28] [background-size:16px_16px] [background-position:2px_2px] dark:block" />
        <div className="absolute -left-24 top-24 h-52 w-52 rounded-full border-4 border-black bg-[#fb7185] dark:border-[#5eead4] dark:bg-[#1a2d52]" />
        <div className="absolute -right-24 bottom-24 h-44 w-44 rounded-full border-4 border-black bg-[#60a5fa] dark:border-[#5eead4] dark:bg-[#145e66]" />
        <div className="absolute left-[7%] top-[34%] h-8 w-36 rotate-[-8deg] rounded-full border-4 border-black bg-[#fde047] dark:border-[#5eead4] dark:bg-[#1b3652]" />
        <div className="absolute right-[11%] top-[18%] h-20 w-20 rounded-full border-4 border-black bg-[#fdba74] dark:border-[#5eead4] dark:bg-[#2c496f]" />
      </div>

      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle variant="manga" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pb-10 pt-20 md:px-8 md:pt-24">
        {quoteOfDay && <QuoteOfDayCard initialQuote={quoteOfDay} />}

        <div className="rotate-[-1deg] rounded-[30px] border-4 border-black bg-[#ffdb4d] px-6 py-8 shadow-[8px_8px_0_#111111] dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[8px_8px_0_#0a3a46] md:px-10 md:py-10">
          <p className="inline-flex rounded-full border-2 border-black bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]">
            Manga Journal
          </p>
          <h1 className={`${comicTitleFont.className} mt-5 max-w-4xl text-5xl uppercase leading-[0.95] tracking-wide dark:text-[#fbbf24] md:text-7xl`}>
            Panels Of Code, Stories Of Shipping
          </h1>
          <p className="mt-5 max-w-2xl text-base font-semibold text-[#1e293b] dark:text-[#cfe7f7] md:text-lg">
            Adventures from software missions, product battles, and creative experiments.
          </p>
          <p className="mt-3 max-w-3xl text-sm font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-[#b7d6ea]">
            By Shohorab H Shawon (Shohorab Hossain Shawon, Shawon)
          </p>

          <div className="mt-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-800 transition hover:-translate-y-0.5 hover:bg-[#fff7cc] dark:border-[#5eead4] dark:bg-[#13233a] dark:text-[#d8ebf8] dark:hover:bg-[#1b3652]"
            >
              <span
                aria-hidden="true"
                className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-[#ef4444] text-[10px] font-black leading-none text-white shadow-[2px_2px_0_#111111] transition-transform duration-200 before:absolute before:-right-1 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rotate-45 before:border-b-2 before:border-r-2 before:border-black before:bg-[#ef4444] group-hover:-translate-x-0.5 dark:border-[#5eead4] dark:bg-[#fbbf24] dark:text-[#0b1220] dark:shadow-[2px_2px_0_#0a3a46] dark:before:border-[#5eead4] dark:before:bg-[#fbbf24]"
              >
                {'<'}
              </span>
              Go To Portfolio
            </Link>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="relative mx-auto max-w-6xl px-6 pb-12 md:px-8 md:pb-14">
          {featured.slug && !featured.isDraft ? (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-[28px] border-4 border-black bg-white p-4 shadow-[7px_7px_0_#111111] transition hover:-translate-y-1 dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[7px_7px_0_#0a3a46]"
            >
              <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
                <div className="relative min-h-72 overflow-hidden rounded-2xl">
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

                <div className="flex flex-col justify-between rounded-2xl border-4 border-black bg-[#fff7cc] p-6 dark:border-[#5eead4] dark:bg-[#13233a]">
                  <div>
                    <p className="mb-4 inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]">
                      Main Episode
                    </p>
                    <h2 className={`${comicTitleFont.className} text-4xl uppercase leading-[0.95] tracking-wide text-slate-900 dark:text-[#fbbf24] md:text-5xl`}>
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-slate-700 dark:text-[#b7d6ea]">{featured.excerpt}...</p>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-[#b7d6ea]">
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fbbf24]" />
                    <span>{featured.author}</span>
                    <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fbbf24]" />
                    <span>Read story</span>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="group block overflow-hidden rounded-[28px] border-4 border-black bg-white p-4 shadow-[7px_7px_0_#111111] dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[7px_7px_0_#0a3a46]">
              <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
                <div className="relative min-h-72 overflow-hidden rounded-2xl">
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

                <div className="flex flex-col justify-between rounded-2xl border-4 border-black bg-[#fff7cc] p-6 dark:border-[#5eead4] dark:bg-[#13233a]">
                  <div>
                    <p className="mb-4 inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]">
                      Draft Episode
                    </p>
                    <h2 className={`${comicTitleFont.className} text-4xl uppercase leading-[0.95] tracking-wide text-slate-900 dark:text-[#fbbf24] md:text-5xl`}>
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-slate-700 dark:text-[#b7d6ea]">{featured.excerpt}...</p>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-[#b7d6ea]">
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fbbf24]" />
                    <span>{featured.author}</span>
                    <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fbbf24]" />
                    <span>Add slug in Studio to open this post</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-6 pb-16 md:px-8">
          <div className="rounded-[28px] border-4 border-black bg-[#fde68a] p-8 text-center shadow-[7px_7px_0_#111111] dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[7px_7px_0_#0a3a46]">
            <h2 className={`${comicTitleFont.className} text-4xl uppercase dark:text-[#fbbf24]`}>Next Episode Loading</h2>
            <p className="mt-3 text-base font-semibold text-slate-700 dark:text-[#b7d6ea]">Create your first post in Sanity Studio and it will appear here automatically.</p>
          </div>
        </section>
      )}

      {restPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20 md:px-8">
          <div className="mb-7 flex items-end justify-between">
            <h3 className={`${comicTitleFont.className} text-4xl uppercase dark:text-[#eef6ff] md:text-5xl`}>More Episodes</h3>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700 dark:text-[#b7d6ea]">Recent drops</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {restPosts.map((post, index) => (
              post.slug && !post.isDraft ? (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post._id}
                  className="group rounded-[24px] border-4 border-black bg-white p-4 shadow-[6px_6px_0_#111111] transition duration-300 hover:-translate-y-1 dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[6px_6px_0_#0a3a46]"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="relative mb-4 h-48 overflow-hidden rounded-xl">
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

                  <p className="inline-flex rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]">{formatDate(post.publishedAt)}</p>
                  <h4 className={`${comicTitleFont.className} mt-3 text-3xl uppercase leading-[0.95] text-slate-900 dark:text-[#fbbf24]`}>{post.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-[#b7d6ea]">{post.excerpt}...</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(post.categories || []).slice(0, 2).map((cat) => (
                      <span
                        key={`${post._id}-${cat}`}
                        className="rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </Link>
              ) : (
                <div
                  key={post._id}
                  className="rounded-[24px] border-4 border-black bg-white p-4 shadow-[6px_6px_0_#111111] dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[6px_6px_0_#0a3a46]"
                >
                  <div className="relative mb-4 h-48 overflow-hidden rounded-xl">
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

                  <p className="inline-flex rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]">{formatDate(post.publishedAt)}</p>
                  <h4 className={`${comicTitleFont.className} mt-3 text-3xl uppercase leading-[0.95] text-slate-900 dark:text-[#fbbf24]`}>{post.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-[#b7d6ea]">{post.excerpt}...</p>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:text-[#b7d6ea]">Add a slug in Studio to open this post</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(post.categories || []).slice(0, 2).map((cat) => (
                      <span
                        key={`${post._id}-${cat}`}
                        className="rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]"
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
      )}
    </main>
  );
}