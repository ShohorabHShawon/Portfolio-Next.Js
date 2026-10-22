import { pageMetadata, PERSON_ID, PERSON_NAME, WEBSITE_ID } from '@/lib/site';
import { groq } from 'next-sanity';
import { DM_Sans, Lora } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';
import BackToTopButton from './BackToTopButton';
import { AuthorAvatar, BlogFooter, BlogHeader, isSiteAuthor } from './BlogChrome';
import BlogModernFilterBar from './BlogModernFilterBar';
import BlogMotionSection from './BlogMotionSection';
import BlogThemeShell from './BlogThemeShell';
import {
  ArrowIcon,
  CategoryChips,
  EntryRow,
  entryNumber,
  formatDate,
  ImageFallback,
  SectionLabel,
} from './JournalUI';
import QuoteOfDayCard from './QuoteOfDayCard';
import { getQuoteOfTheDay } from './quotes';
import { estimateReadingTime } from './readingTime';

export const revalidate = 120;
export const dynamic = 'force-static';

const SITE_URL = 'https://shohorab.com';

export const metadata = pageMetadata({
  title: 'Journal',
  description:
    'The journal of Shohorab H Shawon (Shohorab Hossain Shawon): notes on filmmaking, photography, visual storytelling and software development.',
  path: '/journal',
});

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

function getFilterAttributes(post) {
  return {
    'data-blog-post-item': 'true',
    'data-slug': post.slug || post._id,
    'data-search': `${post.title} ${post.excerpt} ${post.author} ${(post.categories || []).join(' ')}`,
    'data-categories': (post.categories || []).join('|'),
  };
}

function getPostHref(post) {
  return post.slug && !post.isDraft ? `/journal/${post.slug}` : null;
}

export default async function JournalPage() {
  const posts = await client.fetch(BLOG_POSTS_QUERY, {}, { next: { revalidate } });
  const quoteOfDay = getQuoteOfTheDay();
  const normalizedPosts = (posts || []).map((post, index, list) => ({
    ...post,
    entryNumber: list.length - index,
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

  const stats = [
    { label: 'Entries', value: String(normalizedPosts.length).padStart(2, '0') },
    { label: 'Topics', value: String(allCategories.length).padStart(2, '0') },
    { label: 'Avg. read', value: averageReadTime ? `${averageReadTime} min` : '—' },
    { label: 'Last entry', value: featured?.publishedAt ? formatDate(featured.publishedAt) : '—' },
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
    // Same Person node as the site-wide graph in the root layout.
    author: { '@type': 'Person', '@id': PERSON_ID, name: PERSON_NAME, url: SITE_URL },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
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

  const featuredHref = featured ? getPostHref(featured) : null;
  const FeaturedWrapper = featuredHref ? Link : 'div';

  return (
    <BlogThemeShell showToggle={false}>
      <main
        className={`${sansFont.className} ${sansFont.variable} journal-grain blog-list-page relative min-h-screen bg-journal-paper text-journal-ink antialiased transition-colors duration-300 selection:bg-journal-accent selection:text-journal-paper [&_:is(a,button,input,select):focus-visible]:outline-none [&_:is(a,button,input,select):focus-visible]:ring-2 [&_:is(a,button,input,select):focus-visible]:ring-journal-accent/60`}
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

        <BlogHeader />

        <div className="relative z-[1] mx-auto max-w-6xl px-5 md:px-8">
          {/* Masthead */}
          <BlogMotionSection delay={0.04} y={16}>
            <section className="grid gap-12 border-b border-journal-line pb-14 pt-14 md:pt-20 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
              <div>
                <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-journal-accent">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-journal-rec" />
                  SHS Journal · Vol. {new Date().getFullYear()}
                </p>
                <h1 className="mt-7 max-w-3xl text-[clamp(2.8rem,7.5vw,6rem)] font-medium leading-[0.9] tracking-[-0.06em] text-journal-ink">
                  Notes from behind <span className="text-journal-accent">the lens.</span>
                </h1>
                <p className="mt-7 max-w-lg text-base leading-relaxed text-journal-body md:text-lg">
                  Field notes on filmmaking, photography and building for the web — the process, the
                  gear, and the stories in between.
                </p>
                {normalizedPosts.length > 0 && (
                  <a
                    href="#featured-entry"
                    className="group mt-9 inline-flex items-center gap-3 border border-journal-accent bg-journal-accent px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-journal-paper transition hover:bg-transparent hover:text-journal-accent"
                  >
                    Read the entries
                    <ArrowIcon className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
                  </a>
                )}
              </div>

              {quoteOfDay && (
                <QuoteOfDayCard initialQuote={quoteOfDay} quoteFontClassName={quoteFont.className} />
              )}
            </section>

            <dl className="grid grid-cols-2 gap-px border-b border-journal-line bg-journal-line md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-journal-paper py-5 pr-4 [&:nth-child(even)]:pl-5 md:[&:not(:first-child)]:pl-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-journal-muted">{stat.label}</dt>
                  <dd className="mt-1.5 text-xl font-medium tracking-[-0.02em] text-journal-ink md:text-2xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </BlogMotionSection>

          {/* Filters */}
          <BlogMotionSection delay={0.08} y={14}>
            <section className="py-10">
              <BlogModernFilterBar
                categories={allCategories}
                totalPosts={normalizedPosts.length}
                quickCategories={topCategories}
              />
            </section>
          </BlogMotionSection>

          {/* Featured entry */}
          {featured ? (
            <BlogMotionSection delay={0.12} y={20}>
              <section id="featured-entry" className="scroll-mt-24 pb-16">
                <SectionLabel index="01" className="mb-6">Latest entry</SectionLabel>
                <FeaturedWrapper
                  {...(featuredHref ? { href: featuredHref } : {})}
                  {...getFilterAttributes(featured)}
                  className="group grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-12"
                >
                  <div className="relative">
                    <div className="blog-image-skeleton relative aspect-[16/10] overflow-hidden">
                      {featured.mainImage ? (
                        <Image
                          src={urlFor(featured.mainImage).width(1600).height(1000).url()}
                          alt={featured.title}
                          fill
                          priority
                          className="object-cover transition duration-1000 group-hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                      ) : (
                        <ImageFallback />
                      )}
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[7%] bg-black/55" />
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[7%] bg-black/55" />
                      <span className="absolute left-4 top-[9%] flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/85">
                        <span className="h-1.5 w-1.5 rounded-full bg-journal-rec" />
                        {entryNumber(featured.entryNumber)}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted">
                      <span>FR {String(featured.entryNumber).padStart(3, '0')}</span>
                      <span>{formatDate(featured.publishedAt, 'long')}</span>
                    </div>
                  </div>

                  <div>
                    <CategoryChips categories={featured.categories} limit={3} />
                    <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.4rem)] font-medium leading-[0.98] tracking-[-0.05em] text-journal-ink transition-colors group-hover:text-journal-accent">
                      {featured.title}
                    </h2>
                    <p className="mt-5 line-clamp-4 text-base leading-relaxed text-journal-body">
                      {featured.excerpt}…
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-journal-line pt-5">
                      <span className="flex items-center gap-2.5 text-sm text-journal-ink">
                        {isSiteAuthor(featured.author) && <AuthorAvatar size={28} />}
                        {featured.author}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted">
                        {featured.readingTimeMinutes} min read
                      </span>
                      {featuredHref ? (
                        <span className="ml-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-journal-accent">
                          Read entry
                          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted">
                          Add a slug in Studio to open
                        </span>
                      )}
                    </div>
                  </div>
                </FeaturedWrapper>
              </section>
            </BlogMotionSection>
          ) : (
            <BlogMotionSection delay={0.12} y={20}>
              <section className="pb-24">
                <div className="border border-dashed border-journal-line px-6 py-20 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-journal-accent">Reel empty</p>
                  <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-journal-ink">No entries yet</h2>
                  <p className="mt-2 text-sm text-journal-body">
                    Create your first post in Sanity Studio and it will appear here.
                  </p>
                </div>
              </section>
            </BlogMotionSection>
          )}

          {/* Entries log */}
          {restPosts.length > 0 && (
            <BlogMotionSection delay={0.18} y={22}>
              <section id="entries" className="scroll-mt-24 pb-24">
                <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <SectionLabel index="02" className="mb-4">The log</SectionLabel>
                    <h2 className="text-4xl font-medium tracking-[-0.05em] text-journal-ink md:text-5xl">
                      Earlier entries
                    </h2>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted">
                    {String(restPosts.length).padStart(2, '0')} more
                  </p>
                </div>

                <div className="border-b border-journal-line">
                  {restPosts.map((post) => (
                    <EntryRow
                      key={post._id}
                      post={post}
                      number={post.entryNumber}
                      href={getPostHref(post)}
                      filterAttributes={getFilterAttributes(post)}
                    />
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
