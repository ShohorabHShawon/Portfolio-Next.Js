import { groq } from 'next-sanity';
import { DM_Sans, Lora } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';
import BackToTopButton from './BackToTopButton';
import { BlogFooter, BlogHeader } from './BlogChrome';
import BlogModernFilterBar from './BlogModernFilterBar';
import BlogMotionSection from './BlogMotionSection';
import BlogThemeShell from './BlogThemeShell';
import QuoteOfDayCard from './QuoteOfDayCard';
import { getQuoteOfTheDay } from './quotes';
import { estimateReadingTime } from './readingTime';

export const revalidate = 120;
export const dynamic = 'force-static';

const SITE_URL = 'https://shohorab.com';

export const metadata = {
  title: 'Journal | Shohorab H Shawon',
  description:
    'Read software engineering stories, product lessons, and creative experiments by Shohorab H Shawon (Shohorab Hossain Shawon).',
  keywords: [
    'Shohorab H Shawon journal',
    'Shohorab Hossain Shawon journal',
    'Shohorab Shawon journal',
    'Shawon journal',
    'Shohorab journal',
    'software engineering journal',
    'Next.js journal',
    'web development articles',
    'developer journal',
    'tech stories',
  ],
  alternates: {
    canonical: '/journal',
  },
  openGraph: {
    title: 'Journal | Shohorab H Shawon',
    description:
      'Software engineering and creative stories by Shohorab H Shawon. Explore practical web development insights and project lessons.',
    url: `${SITE_URL}/journal`,
    siteName: 'Shohorab H Shawon Journal',
    type: 'website',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Shohorab H Shawon Journal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal | Shohorab H Shawon',
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

const sansFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-blog-modern-sans',
});

const quoteFont = Lora({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic'],
});

const BLOG_THEME_BOOTSTRAP_SCRIPT = `(function () {
  try {
    window.localStorage.setItem('blog-theme', 'modern');
  } catch (err) {}
  document.documentElement.setAttribute('data-blog-theme', 'modern');
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
    "plainText": coalesce(pt::text(body), ""),
    "imageCount": count(body[_type == "image"])
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

function getFilterAttributes(post) {
  return {
    'data-blog-post-item': 'true',
    'data-slug': post.slug || post._id,
    'data-search': `${post.title} ${post.excerpt} ${post.author} ${(post.categories || []).join(' ')}`,
    'data-categories': (post.categories || []).join('|'),
  };
}

function PostLink({ post, className, children }) {
  const isLinkable = post.slug && !post.isDraft;

  if (isLinkable) {
    return (
      <Link href={`/journal/${post.slug}`} className={className} {...getFilterAttributes(post)}>
        {children}
      </Link>
    );
  }

  return (
    <div className={className} {...getFilterAttributes(post)}>
      {children}
    </div>
  );
}

function PostMeta({ post, className = '' }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400 ${className}`}
    >
      <span className="font-medium text-zinc-700 dark:text-zinc-300">{post.author}</span>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
      <span>{post.readingTimeMinutes} min read</span>
    </div>
  );
}

function CategoryChips({ post, limit }) {
  const categories = (post.categories || []).filter(Boolean).slice(0, limit);
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((cat) => (
        <span
          key={`${post._id}-${cat}`}
          className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/15 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20"
        >
          {cat}
        </span>
      ))}
    </div>
  );
}

function ImageFallback() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-zinc-100 via-zinc-50 to-emerald-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-emerald-950/60" />
  );
}

function ArrowIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

const cardSurface =
  'rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(24,24,27,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_18px_40px_-24px_rgba(24,24,27,0.35)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 dark:hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]';

export default async function BlogPage() {
  const posts = await client.fetch(BLOG_POSTS_QUERY, {}, { next: { revalidate } });
  const quoteOfDay = getQuoteOfTheDay();
  const normalizedPosts = (posts || []).map((post) => ({
    ...post,
    readingTimeMinutes: estimateReadingTime(post.plainText || post.excerpt, post.imageCount),
  }));
  const featured = normalizedPosts[0];
  const restPosts = normalizedPosts.slice(1);
  const allCategories = Array.from(
    new Set(
      normalizedPosts.flatMap((post) => (Array.isArray(post.categories) ? post.categories : []))
    )
  )
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const categoryCounts = normalizedPosts.reduce((acc, post) => {
    (post.categories || []).forEach((category) => {
      if (!category) return;
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {});

  const topCategories = Object.entries(categoryCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 6)
    .map(([category]) => category);

  const averageReadTime = normalizedPosts.length
    ? Math.round(
        normalizedPosts.reduce((sum, post) => sum + (post.readingTimeMinutes || 0), 0) /
          normalizedPosts.length
      )
    : 0;

  const latestPublishedDate = featured?.publishedAt ? formatDate(featured.publishedAt) : 'Updating';

  const stats = [
    { label: 'Stories', value: normalizedPosts.length },
    { label: 'Topics', value: allCategories.length },
    { label: 'Avg. read', value: averageReadTime ? `${averageReadTime} min` : '—' },
  ];

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Shohorab H Shawon Journal',
    alternateName: ['Shohorab Hossain Shawon Journal', 'Shohorab Shawon Journal', 'Shawon Journal'],
    description:
      'Software engineering stories, product lessons, and creative experiments by Shohorab H Shawon.',
    url: `${SITE_URL}/journal`,
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
    itemListElement: normalizedPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/journal/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <BlogThemeShell showToggle={false}>
      <main
        className={`${sansFont.className} ${sansFont.variable} blog-list-page relative min-h-screen bg-zinc-50 text-zinc-900 antialiased transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100 [&_:is(a,button,input,select):focus-visible]:outline-none [&_:is(a,button,input,select):focus-visible]:ring-2 [&_:is(a,button,input,select):focus-visible]:ring-emerald-500/60`}
      >
        <BackToTopButton />
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

        {/* Soft ambient glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
          <div className="absolute left-1/2 top-[-260px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-500/10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(24,24,27,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
        </div>

        <BlogHeader />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <BlogMotionSection delay={0.04} y={16}>
            <section className="grid gap-10 pb-12 pt-14 md:pt-20 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-14">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Updated {latestPublishedDate}
                </p>
                <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
                  Notes on building for the web,{' '}
                  <span className="text-zinc-400 dark:text-zinc-500">one story at a time.</span>
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg">
                  Engineering lessons, product reflections, and creative experiments by Shohorab H
                  Shawon.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {normalizedPosts.length > 0 && (
                    <a
                      href="#latest-stories"
                      className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      Browse stories
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )}
                  <Link
                    href="/"
                    className="inline-flex items-center rounded-full border border-zinc-300 bg-white/60 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
                  >
                    About me
                  </Link>
                </div>

                <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500">
                        {stat.label}
                      </dt>
                      <dd className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {quoteOfDay && (
                <QuoteOfDayCard initialQuote={quoteOfDay} quoteFontClassName={quoteFont.className} />
              )}
            </section>
          </BlogMotionSection>

          <BlogMotionSection delay={0.08} y={14}>
            <section className="pb-10">
              <BlogModernFilterBar
                categories={allCategories}
                totalPosts={normalizedPosts.length}
                quickCategories={topCategories}
              />
            </section>
          </BlogMotionSection>

          {featured ? (
            <BlogMotionSection delay={0.12} y={20}>
              <section id="featured-story" className="pb-14">
                <PostLink
                  post={featured}
                  className={`group grid overflow-hidden md:grid-cols-[1.15fr_1fr] ${cardSurface}`}
                >
                  <div className="blog-image-skeleton relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[360px]">
                    {featured.mainImage ? (
                      <Image
                        src={urlFor(featured.mainImage).width(1400).height(900).url()}
                        alt={featured.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 55vw"
                        priority
                      />
                    ) : (
                      <ImageFallback />
                    )}
                  </div>

                  <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                          {featured.slug && !featured.isDraft ? 'Featured' : 'Draft'}
                        </span>
                        <CategoryChips post={featured} limit={2} />
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.025em] text-zinc-900 dark:text-white sm:text-3xl lg:text-[2.1rem]">
                        {featured.title}
                      </h2>
                      <p className="mt-4 line-clamp-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {featured.excerpt}…
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                      <PostMeta post={featured} />
                      {featured.slug && !featured.isDraft ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-white">
                          Read article
                          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-500">Add a slug in Studio to open this post</span>
                      )}
                    </div>
                  </div>
                </PostLink>
              </section>
            </BlogMotionSection>
          ) : (
            <BlogMotionSection delay={0.12} y={20}>
              <section className="pb-20">
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/60 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    No posts yet
                  </h2>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Create your first post in Sanity Studio and it will appear here.
                  </p>
                </div>
              </section>
            </BlogMotionSection>
          )}

          {restPosts.length > 0 && (
            <BlogMotionSection delay={0.18} y={22}>
              <section id="latest-stories" className="scroll-mt-24 pb-24">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
                  <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
                    Latest stories
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {normalizedPosts.length} published
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {restPosts.map((post) => (
                    <PostLink
                      key={post._id}
                      post={post}
                      className={`group flex h-full flex-col overflow-hidden ${cardSurface}`}
                    >
                      <div className="blog-image-skeleton relative aspect-[16/10] overflow-hidden">
                        {post.mainImage ? (
                          <Image
                            src={urlFor(post.mainImage).width(900).height(600).url()}
                            alt={post.title}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-[1.04]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <ImageFallback />
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <CategoryChips post={post} limit={2} />
                        <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug tracking-[-0.015em] text-zinc-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                          {post.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {post.excerpt}…
                        </p>
                        {!(post.slug && !post.isDraft) && (
                          <p className="mt-2 text-xs text-zinc-500">Add a slug in Studio to open this post</p>
                        )}
                        <div className="mt-auto pt-5">
                          <PostMeta post={post} className="border-t border-zinc-100 pt-4 dark:border-zinc-800" />
                        </div>
                      </div>
                    </PostLink>
                  ))}
                </div>
              </section>
            </BlogMotionSection>
          )}
        </div>

        <BlogFooter />
      </main>
    </BlogThemeShell>
  );
}
