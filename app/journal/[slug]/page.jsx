import { groq, PortableText } from 'next-sanity';
import { DM_Sans, Source_Serif_4 } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';
import BackToTopButton from '../BackToTopButton';
import { AuthorAvatar, BlogFooter, BlogHeader, isSiteAuthor } from '../BlogChrome';
import BlogMotionSection from '../BlogMotionSection';
import BlogThemeShell from '../BlogThemeShell';
import PostShareActions from '../PostShareActions';
import ReadingProgressBar from '../ReadingProgressBar';
import {
  countPortableTextImages,
  estimateReadingTime,
  portableTextToPlainText,
} from '../readingTime';
import TableOfContents from '../TableOfContents';

export const revalidate = 120;
export const dynamic = 'force-static';

const SITE_URL = 'https://shohorab.com';
const NAME_VARIATIONS = ['Shohorab H Shawon', 'Shohorab Hossain Shawon', 'Shohorab Shawon', 'Shawon'];

const sansFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-blog-modern-sans',
});

const serifFont = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-blog-modern-serif',
});

const BLOG_THEME_BOOTSTRAP_SCRIPT = `(function () {
  try {
    window.localStorage.setItem('blog-theme', 'modern');
  } catch (err) {}
  document.documentElement.setAttribute('data-blog-theme', 'modern');
})();`;

const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    publishedAt,
    mainImage,
    body,
    "author": coalesce(author->name, "Unknown Author"),
    "categories": categories[]->title
  }
`;

const POST_METADATA_QUERY = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    title,
    publishedAt,
    mainImage,
    "author": coalesce(author->name, "Unknown Author"),
    "categories": categories[]->title,
    "excerpt": coalesce(pt::text(body)[0...220], "Read this post on the Shohorab H Shawon journal.")
  }
`;

const SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`;

const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && slug.current != $slug && !(_id in path("drafts.**"))]
  | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
    _id,
    "title": coalesce(title, "Untitled post"),
    "slug": slug.current,
    "publishedAt": coalesce(publishedAt, _createdAt),
    mainImage,
    "categories": categories[]->title,
    "excerpt": coalesce(pt::text(body)[0...140], "Read this post for practical ideas."),
    "plainText": coalesce(pt::text(body), ""),
    "imageCount": count(body[_type == "image"])
  }
`;

const POST_NAV_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(coalesce(publishedAt, _createdAt) desc) {
    "slug": slug.current,
    "title": coalesce(title, "Untitled post")
  }
`;

const headingBase = 'scroll-mt-24 font-semibold tracking-[-0.02em] text-zinc-900 dark:text-white';

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      const altText = value?.alt || value?.caption || 'Journal image';

      return (
        <figure className="my-10">
          <div className="blog-image-skeleton relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={urlFor(value).width(1400).height(875).url()}
              alt={altText}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 720px"
            />
          </div>
          {(value?.caption || value?.alt) && (
            <figcaption className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
              {value.caption || value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => <h2 className={`${headingBase} mt-14 text-3xl leading-tight`}>{children}</h2>,
    h2: ({ children, value }) => (
      <h2 id={getHeadingId(value)} className={`${headingBase} mt-12 text-[1.65rem] leading-tight md:text-3xl`}>
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={getHeadingId(value)} className={`${headingBase} mt-10 text-xl leading-snug md:text-[1.4rem]`}>
        {children}
      </h3>
    ),
    h4: ({ children }) => <h4 className={`${headingBase} mt-8 text-lg leading-snug`}>{children}</h4>,
    normal: ({ children }) => <p className="mt-6">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-emerald-500 pl-6 text-[1.3rem] italic leading-relaxed text-zinc-900 dark:border-emerald-400 dark:text-zinc-100">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc space-y-2 pl-6 marker:text-zinc-400 dark:marker:text-zinc-600">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-6 marker:text-zinc-400 dark:marker:text-zinc-600">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-zinc-900 dark:text-white">{children}</strong>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-emerald-700 underline decoration-emerald-500/40 decoration-1 underline-offset-[3px] transition hover:decoration-emerald-500 dark:text-emerald-400 dark:decoration-emerald-400/40 dark:hover:decoration-emerald-400"
      >
        {children}
      </a>
    ),
  },
};

function formatDate(dateString, month = 'long') {
  if (!dateString) return 'Coming soon';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
  }).format(new Date(dateString));
}

function toDescription(blocks, fallback = 'Read this journal entry by Shohorab H Shawon.') {
  const text = portableTextToPlainText(blocks);

  if (!text) return fallback;
  if (text.length <= 165) return text;
  return `${text.slice(0, 162).trim()}...`;
}

function getInitials(name) {
  return String(name || 'S')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function ArrowIcon({ direction = 'right', className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`${className} ${direction === 'left' ? 'rotate-180' : ''}`}
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

function CategoryChips({ categories = [], limit }) {
  const items = categories.filter(Boolean).slice(0, limit);
  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((cat) => (
        <Link
          key={cat}
          href={`/journal?cat=${encodeURIComponent(cat)}`}
          className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/15 transition hover:bg-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20 dark:hover:bg-emerald-400/15"
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}

const cardSurface =
  'rounded-2xl border border-zinc-200/80 bg-white transition duration-300 dark:border-zinc-800 dark:bg-zinc-900/60';

export async function generateStaticParams() {
  const slugs = await client.fetch(SLUGS_QUERY);
  return slugs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await client.fetch(POST_METADATA_QUERY, { slug }, { next: { revalidate } });

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  const description = post.excerpt || `Read ${post.title} by ${post.author}.`;
  const canonicalPath = `/journal/${slug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${SITE_URL}/profile.jpg`;
  const authorName = post.author || 'Shohorab Hossain Shawon';
  const keywords = [
    post.title,
    `${post.title} journal`,
    `${authorName} journal`,
    'Shohorab H Shawon journal',
    'Shohorab Hossain Shawon journal',
    'Shohorab Shawon journal',
    'Shawon journal',
    'developer journal',
    ...((post.categories || []).filter(Boolean)),
  ];

  return {
    title: `${post.title} | Shohorab H Shawon Journal`,
    description,
    keywords,
    authors: [{ name: authorName, url: `${SITE_URL}/journal` }],
    creator: 'Shohorab Hossain Shawon',
    publisher: 'Shohorab Hossain Shawon',
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${post.title} | Shohorab H Shawon Journal`,
      description,
      url: canonicalUrl,
      siteName: 'Shohorab H Shawon Journal',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [authorName, ...NAME_VARIATIONS.filter((name) => name !== authorName)],
      tags: post.categories || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Shohorab H Shawon Journal`,
      description,
      images: [imageUrl],
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
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const [post, relatedPostsRaw, navPostsRaw] = await Promise.all([
    client.fetch(POST_QUERY, { slug }, { next: { revalidate } }),
    client.fetch(RELATED_POSTS_QUERY, { slug }, { next: { revalidate } }),
    client.fetch(POST_NAV_QUERY, {}, { next: { revalidate } }),
  ]);

  if (!post) {
    notFound();
  }

  const readingTimeMinutes = estimateReadingTime(
    portableTextToPlainText(post.body),
    countPortableTextImages(post.body)
  );
  const relatedPosts = (relatedPostsRaw || []).map((item) => ({
    ...item,
    readingTimeMinutes: estimateReadingTime(item.plainText || item.excerpt, item.imageCount),
  }));
  const tableOfContents = buildTableOfContents(post.body);
  const showTableOfContents = tableOfContents.length >= 3;
  const navPosts = navPostsRaw || [];
  const currentIndex = navPosts.findIndex((item) => item.slug === slug);
  const newerPost = currentIndex > 0 ? navPosts[currentIndex - 1] : null;
  const olderPost = currentIndex >= 0 ? navPosts[currentIndex + 1] : null;
  const categories = (post.categories || []).filter(Boolean);

  const canonicalUrl = `${SITE_URL}/journal/${slug}`;
  const description = toDescription(post.body, `Read ${post.title} by ${post.author}.`);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    author: {
      '@type': 'Person',
      name: post.author || 'Shohorab H Shawon',
      alternateName: NAME_VARIATIONS,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Shohorab Hossain Shawon',
      alternateName: NAME_VARIATIONS,
      url: SITE_URL,
    },
    articleSection: categories,
    inLanguage: 'en-US',
    timeRequired: `PT${readingTimeMinutes}M`,
    image: [
      post.mainImage
        ? urlFor(post.mainImage).width(1200).height(630).url()
        : `${SITE_URL}/profile.jpg`,
    ],
  };

  return (
    <BlogThemeShell showToggle={false}>
      <main
        className={`${sansFont.className} ${sansFont.variable} ${serifFont.variable} blog-slug-page relative min-h-screen overflow-x-clip bg-zinc-50 text-zinc-900 antialiased transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100 [&_:is(a,button,summary):focus-visible]:outline-none [&_:is(a,button,summary):focus-visible]:ring-2 [&_:is(a,button,summary):focus-visible]:ring-emerald-500/60`}
      >
        <ReadingProgressBar />
        <BackToTopButton />

        <script
          id="blog-theme-bootstrap"
          dangerouslySetInnerHTML={{ __html: BLOG_THEME_BOOTSTRAP_SCRIPT }}
        />
        <script
          id={`blog-post-schema-${post._id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[480px] overflow-hidden">
          <div className="absolute left-1/2 top-[-280px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-200/35 blur-3xl dark:bg-emerald-500/10" />
        </div>

        <BlogHeader />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <BlogMotionSection delay={0.04} y={14}>
            <header className="mx-auto max-w-3xl pb-10 pt-10 text-center md:pt-16">
              <Link
                href="/journal"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                <ArrowIcon direction="left" className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                All stories
              </Link>

              {categories.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <CategoryChips categories={categories} limit={3} />
                </div>
              )}

              <h1 className="mt-5 text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] text-zinc-900 dark:text-white sm:text-5xl md:text-[3.4rem]">
                {post.title}
              </h1>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-2.5">
                  {isSiteAuthor(post.author) ? (
                    <AuthorAvatar size={36} />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900">
                      {getInitials(post.author)}
                    </span>
                  )}
                  <span className="font-medium text-zinc-900 dark:text-white">{post.author}</span>
                </div>
                <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700 sm:block" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span>{readingTimeMinutes} min read</span>
              </div>
            </header>

            {post.mainImage && (
              <div className="blog-image-skeleton relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-200/80 dark:bg-zinc-900 dark:ring-zinc-800 md:aspect-[2/1]">
                <Image
                  src={urlFor(post.mainImage).width(2000).height(1000).url()}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            )}
          </BlogMotionSection>

          <BlogMotionSection delay={0.1} y={18}>
            <div className="mx-auto mt-12 grid max-w-5xl gap-12 pb-20 md:mt-16 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
              <article className="min-w-0">
                <div className="mb-8 flex items-center justify-between gap-3 border-y border-zinc-200 py-3 dark:border-zinc-800 lg:hidden">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Share</span>
                  <PostShareActions url={canonicalUrl} title={post.title} />
                </div>

                {showTableOfContents && (
                  <details className="group mb-10 rounded-2xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60 lg:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-zinc-900 dark:text-white [&::-webkit-details-marker]:hidden">
                      On this page
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-zinc-500 transition-transform group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </summary>
                    <TableOfContents tableOfContents={tableOfContents} className="mt-4" />
                  </details>
                )}

                <div className="blog-post-body text-[1.13rem] leading-[1.8] text-zinc-700 dark:text-zinc-300 md:text-[1.19rem] [&>*:first-child]:mt-0">
                  <PortableText value={post.body || []} components={portableTextComponents} />
                </div>

                <div className="mt-14 flex flex-col gap-5 rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    {isSiteAuthor(post.author) ? (
                      <AuthorAvatar size={56} />
                    ) : (
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900">
                        {getInitials(post.author)}
                      </span>
                    )}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Written by</p>
                      <p className="mt-0.5 font-semibold text-zinc-900 dark:text-white">{post.author}</p>
                      <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">Thanks for reading. Share it if it helped.</p>
                    </div>
                  </div>
                  <PostShareActions url={canonicalUrl} title={post.title} />
                </div>

                {categories.length > 0 && (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Tagged</span>
                    <CategoryChips categories={categories} />
                  </div>
                )}

                {(newerPost || olderPost) && (
                  <nav aria-label="More posts" className="mt-10 grid gap-3 sm:grid-cols-2">
                    {olderPost ? (
                      <Link
                        href={`/journal/${olderPost.slug}`}
                        className={`group p-5 hover:-translate-y-0.5 hover:border-zinc-300 dark:hover:border-zinc-700 ${cardSurface}`}
                      >
                        <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                          <ArrowIcon direction="left" className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                          Previous
                        </span>
                        <span className="mt-2 line-clamp-2 block font-semibold leading-snug text-zinc-900 dark:text-white">
                          {olderPost.title}
                        </span>
                      </Link>
                    ) : (
                      <span aria-hidden="true" className="hidden sm:block" />
                    )}

                    {newerPost ? (
                      <Link
                        href={`/journal/${newerPost.slug}`}
                        className={`group p-5 text-right hover:-translate-y-0.5 hover:border-zinc-300 dark:hover:border-zinc-700 ${cardSurface}`}
                      >
                        <span className="flex items-center justify-end gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                          Next
                          <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                        <span className="mt-2 line-clamp-2 block font-semibold leading-snug text-zinc-900 dark:text-white">
                          {newerPost.title}
                        </span>
                      </Link>
                    ) : (
                      <span aria-hidden="true" className="hidden sm:block" />
                    )}
                  </nav>
                )}
              </article>

              <aside className="hidden lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100vh-7rem)] lg:flex-col lg:gap-4 lg:self-start lg:pb-2">
                <div className={`shrink-0 p-5 ${cardSurface}`}>
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-4 text-sm">
                    <div>
                      <dt className="text-xs text-zinc-500">Published</dt>
                      <dd className="mt-0.5 font-medium text-zinc-900 dark:text-white">
                        {formatDate(post.publishedAt, 'short')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500">Reading time</dt>
                      <dd className="mt-0.5 font-medium text-zinc-900 dark:text-white">{readingTimeMinutes} min</dd>
                    </div>
                  </dl>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Progress</span>
                      <span className="font-medium tabular-nums text-zinc-900 dark:text-white" data-reading-progress-value="true">
                        0%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <span className="block h-full w-full origin-left rounded-full bg-emerald-500 transition-transform duration-200 [transform:scaleX(var(--blog-reading-progress,0))] dark:bg-emerald-400" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                    <span className="text-xs text-zinc-500">Share</span>
                    <PostShareActions url={canonicalUrl} title={post.title} />
                  </div>
                </div>

                {showTableOfContents && (
                  <div
                    className={`blog-aside-toc min-h-[7rem] shrink overflow-y-auto overscroll-contain ${cardSurface}`}
                    data-lenis-prevent
                  >
                    <p className="sticky top-0 z-[1] rounded-t-2xl bg-white px-5 pb-2 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:bg-[#111113]">
                      On this page
                    </p>
                    <TableOfContents tableOfContents={tableOfContents} className="mx-5 mb-5" />
                  </div>
                )}
              </aside>
            </div>
          </BlogMotionSection>
        </div>

        {relatedPosts.length > 0 && (
          <BlogMotionSection delay={0.14} y={20}>
            <section className="relative border-t border-zinc-200 bg-white/50 py-16 dark:border-zinc-800 dark:bg-zinc-900/20">
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                      Keep reading
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      More stories
                    </h2>
                  </div>
                  <Link
                    href="/journal"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  >
                    View all
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((item) => (
                    <Link
                      key={item._id}
                      href={`/journal/${item.slug}`}
                      className={`group flex flex-col overflow-hidden hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_18px_40px_-24px_rgba(24,24,27,0.35)] dark:hover:border-zinc-700 ${cardSurface}`}
                    >
                      <div className="blog-image-skeleton relative aspect-[16/10] overflow-hidden">
                        {item.mainImage ? (
                          <Image
                            src={urlFor(item.mainImage).width(800).height(500).url()}
                            alt={item.title}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-[1.04]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-zinc-100 via-zinc-50 to-emerald-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-emerald-950/60" />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-[-0.015em] text-zinc-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                          {item.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {item.excerpt}…
                        </p>
                        <p className="mt-auto pt-4 text-xs text-zinc-500 dark:text-zinc-400">
                          {formatDate(item.publishedAt, 'short')} · {item.readingTimeMinutes} min read
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </BlogMotionSection>
        )}

        <BlogFooter />
      </main>
    </BlogThemeShell>
  );
}

function extractBlockText(block) {
  if (!block || !Array.isArray(block.children)) return '';
  return block.children
    .map((child) => child?.text || '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getHeadingId(block) {
  if (!block) return '';
  return block._key ? `section-${block._key}` : '';
}

function buildTableOfContents(blocks) {
  if (!Array.isArray(blocks)) return [];

  return blocks
    .filter((block) => block?._type === 'block' && (block.style === 'h2' || block.style === 'h3'))
    .map((block) => ({
      id: getHeadingId(block),
      title: extractBlockText(block),
      level: block.style === 'h3' ? 3 : 2,
    }))
    .filter((item) => item.id && item.title);
}
