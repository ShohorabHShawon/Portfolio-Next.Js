import { OG_IMAGE, PERSON_ID, PERSON_NAME, WEBSITE_ID } from '@/lib/site';
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
import {
  ArrowIcon,
  CategoryChips,
  EntryRow,
  entryNumber,
  formatDate,
  SectionLabel,
} from '../JournalUI';
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

const headingBase = 'scroll-mt-24 font-medium tracking-[-0.035em] text-journal-ink';

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      const altText = value?.alt || value?.caption || 'Journal image';

      return (
        <figure className="my-12">
          <div className="blog-image-skeleton relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={urlFor(value).width(1400).height(875).url()}
              alt={altText}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 720px"
            />
          </div>
          {(value?.caption || value?.alt) && (
            <figcaption className="mt-3 flex gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted">
              <span className="text-journal-accent">FR</span>
              {value.caption || value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => <h2 className={`${headingBase} mt-16 text-[2rem] leading-[1.05] md:text-[2.4rem]`}>{children}</h2>,
    h2: ({ children, value }) => (
      <h2 id={getHeadingId(value)} className={`${headingBase} mt-14 text-[1.75rem] leading-[1.08] md:text-[2.15rem]`}>
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={getHeadingId(value)} className={`${headingBase} mt-10 text-[1.3rem] leading-snug md:text-[1.5rem]`}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-journal-accent">{children}</h4>
    ),
    normal: ({ children }) => <p className="mt-6">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="relative my-12 border-y border-journal-line py-8 pl-10 text-[1.45rem] italic leading-[1.5] text-journal-ink md:text-[1.6rem]">
        <span aria-hidden="true" className="absolute left-0 top-6 font-serif text-5xl leading-none text-journal-accent">
          &ldquo;
        </span>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc space-y-2 pl-6 marker:text-journal-accent">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-6 marker:font-mono marker:text-sm marker:text-journal-accent">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-journal-ink">{children}</strong>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="text-journal-ink underline decoration-journal-accent decoration-1 underline-offset-[4px] transition hover:text-journal-accent"
      >
        {children}
      </a>
    ),
  },
};

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

function AuthorMark({ name, size }) {
  if (isSiteAuthor(name)) return <AuthorAvatar size={size} />;

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-journal-ink font-mono text-[11px] text-journal-paper"
      style={{ width: size, height: size }}
    >
      {getInitials(name)}
    </span>
  );
}

const panelClass = 'border border-journal-line bg-journal-surface';

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
  const image = post.mainImage
    ? { url: urlFor(post.mainImage).width(1200).height(630).url(), width: 1200, height: 630, alt: post.title }
    : OG_IMAGE;
  const authorName = post.author || PERSON_NAME;
  // The root layout's title template adds " | Shohorab H Shawon".
  const title = `${post.title} — Journal`;

  return {
    title,
    description,
    authors: [{ name: authorName, url: SITE_URL }],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} | ${PERSON_NAME}`,
      description,
      url: canonicalUrl,
      siteName: PERSON_NAME,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [authorName],
      tags: post.categories || [],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${PERSON_NAME}`,
      description,
      images: [image.url],
    },
  };
}

export default async function JournalEntryPage({ params }) {
  const { slug } = await params;
  const [post, relatedPostsRaw, navPostsRaw] = await Promise.all([
    client.fetch(POST_QUERY, { slug }, { next: { revalidate } }),
    client.fetch(RELATED_POSTS_QUERY, { slug }, { next: { revalidate } }),
    client.fetch(POST_NAV_QUERY, {}, { next: { revalidate } }),
  ]);

  if (!post) {
    notFound();
  }

  const navPosts = navPostsRaw || [];
  const numberBySlug = new Map(navPosts.map((item, index) => [item.slug, navPosts.length - index]));
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
  const currentIndex = navPosts.findIndex((item) => item.slug === slug);
  const newerPost = currentIndex > 0 ? navPosts[currentIndex - 1] : null;
  const olderPost = currentIndex >= 0 ? navPosts[currentIndex + 1] : null;
  const currentNumber = numberBySlug.get(slug) || 1;
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
    // Posts by the site owner point at the same Person node as the root layout's graph.
    author: !post.author || isSiteAuthor(post.author)
      ? { '@type': 'Person', '@id': PERSON_ID, name: PERSON_NAME, alternateName: NAME_VARIATIONS, url: SITE_URL }
      : { '@type': 'Person', name: post.author },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
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
        className={`${sansFont.className} ${sansFont.variable} ${serifFont.variable} journal-grain blog-slug-page relative min-h-screen overflow-x-clip bg-journal-paper text-journal-ink antialiased transition-colors duration-300 selection:bg-journal-accent selection:text-journal-paper [&_:is(a,button,summary):focus-visible]:outline-none [&_:is(a,button,summary):focus-visible]:ring-2 [&_:is(a,button,summary):focus-visible]:ring-journal-accent/60`}
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

        <BlogHeader />

        <div className="relative z-[1] mx-auto max-w-6xl px-5 md:px-8">
          {/* Title block */}
          <BlogMotionSection delay={0.04} y={14}>
            <header className="pb-10 pt-10 md:pb-14 md:pt-14">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-journal-line pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-journal-muted">
                <Link href="/journal" className="group inline-flex items-center gap-2 transition hover:text-journal-accent">
                  <ArrowIcon direction="left" className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                  All entries
                </Link>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-journal-rec" />
                  {entryNumber(currentNumber)} · SHS Journal
                </span>
              </div>

              <div className="mx-auto max-w-4xl pt-12 text-center md:pt-16">
                {categories.length > 0 && (
                  <div className="flex justify-center">
                    <CategoryChips categories={categories} limit={3} linked />
                  </div>
                )}
                <h1 className="mt-6 text-balance text-[clamp(2.3rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.055em] text-journal-ink">
                  {post.title}
                </h1>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                  <span className="flex items-center gap-2.5 text-sm text-journal-ink">
                    <AuthorMark name={post.author} size={34} />
                    {post.author}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, 'long')}</time>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted">
                    {readingTimeMinutes} min read
                  </span>
                </div>
              </div>
            </header>

            {post.mainImage && (
              <figure className="mx-auto max-w-5xl">
                <div className="blog-image-skeleton relative aspect-[16/9] overflow-hidden md:aspect-[2.2/1]">
                  <Image
                    src={urlFor(post.mainImage).width(2200).height(1000).url()}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-white/25 md:inset-5" />
                </div>
                <figcaption className="mt-3 flex justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted">
                  <span>FR {String(currentNumber).padStart(3, '0')} — {post.title}</span>
                  <span className="hidden shrink-0 sm:block">Dhaka, BD</span>
                </figcaption>
              </figure>
            )}
          </BlogMotionSection>

          {/* Body + sidebar */}
          <BlogMotionSection delay={0.1} y={18}>
            <div className="mx-auto mt-14 grid max-w-5xl gap-12 pb-20 md:mt-20 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-16">
              <article className="min-w-0">
                <div className="mb-8 flex items-center justify-between gap-3 border-y border-journal-line py-3 lg:hidden">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted">Share</span>
                  <PostShareActions url={canonicalUrl} title={post.title} />
                </div>

                {showTableOfContents && (
                  <details className={`group mb-10 p-4 lg:hidden ${panelClass}`}>
                    <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-journal-accent [&::-webkit-details-marker]:hidden">
                      On this page
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-journal-muted transition-transform group-open:rotate-180"
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

                <div className="blog-post-body text-[1.15rem] leading-[1.85] text-journal-body md:text-[1.2rem] [&>*:first-child]:mt-0 [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-1 [&>p:first-of-type]:first-letter:text-[3.6rem] [&>p:first-of-type]:first-letter:font-medium [&>p:first-of-type]:first-letter:leading-[0.85] [&>p:first-of-type]:first-letter:text-journal-accent">
                  <PortableText value={post.body || []} components={portableTextComponents} />
                </div>

                <p aria-hidden="true" className="mt-14 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-journal-muted">
                  — Cut —
                </p>

                <div className={`mt-10 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between ${panelClass}`}>
                  <div className="flex items-center gap-4">
                    <AuthorMark name={post.author} size={56} />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-journal-muted">Written by</p>
                      <p className="mt-1 text-lg font-medium tracking-[-0.02em] text-journal-ink">{post.author}</p>
                      <p className="mt-0.5 text-sm text-journal-body/80">Thanks for reading. Share it if it moved you.</p>
                    </div>
                  </div>
                  <PostShareActions url={canonicalUrl} title={post.title} />
                </div>

                {categories.length > 0 && (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-journal-muted">Filed under</span>
                    <CategoryChips categories={categories} linked />
                  </div>
                )}

                {(newerPost || olderPost) && (
                  <nav aria-label="More entries" className="mt-12 grid border-y border-journal-line sm:grid-cols-2">
                    {olderPost ? (
                      <Link href={`/journal/${olderPost.slug}`} className="group py-6 sm:pr-6">
                        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted">
                          <ArrowIcon direction="left" className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                          Previous · {entryNumber(numberBySlug.get(olderPost.slug))}
                        </span>
                        <span className="mt-2 line-clamp-2 block text-lg font-medium leading-snug tracking-[-0.02em] text-journal-ink transition-colors group-hover:text-journal-accent">
                          {olderPost.title}
                        </span>
                      </Link>
                    ) : (
                      <span aria-hidden="true" className="hidden sm:block" />
                    )}

                    {newerPost ? (
                      <Link
                        href={`/journal/${newerPost.slug}`}
                        className="group border-t border-journal-line py-6 text-right sm:border-l sm:border-t-0 sm:pl-6"
                      >
                        <span className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted">
                          Next · {entryNumber(numberBySlug.get(newerPost.slug))}
                          <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                        <span className="mt-2 line-clamp-2 block text-lg font-medium leading-snug tracking-[-0.02em] text-journal-ink transition-colors group-hover:text-journal-accent">
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
                <div className={`shrink-0 p-5 ${panelClass}`}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-journal-accent">Slate</p>
                  <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4">
                    <div>
                      <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-journal-muted">Entry</dt>
                      <dd className="mt-1 text-sm font-medium text-journal-ink">{entryNumber(currentNumber)}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-journal-muted">Runtime</dt>
                      <dd className="mt-1 text-sm font-medium text-journal-ink">{readingTimeMinutes} min</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-journal-muted">Published</dt>
                      <dd className="mt-1 text-sm font-medium text-journal-ink">{formatDate(post.publishedAt, 'long')}</dd>
                    </div>
                  </dl>

                  <div className="mt-5">
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em]">
                      <span className="text-journal-muted">Progress</span>
                      <span className="tabular-nums text-journal-ink" data-reading-progress-value="true">
                        0%
                      </span>
                    </div>
                    <div className="mt-2 h-[3px] overflow-hidden bg-journal-line">
                      <span className="block h-full w-full origin-left bg-journal-accent transition-transform duration-200 [transform:scaleX(var(--blog-reading-progress,0))]" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-2 border-t border-journal-line pt-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-journal-muted">Share</span>
                    <PostShareActions url={canonicalUrl} title={post.title} />
                  </div>
                </div>

                {showTableOfContents && (
                  <div
                    className={`blog-aside-toc min-h-[7rem] shrink overflow-y-auto overscroll-contain ${panelClass}`}
                    data-lenis-prevent
                  >
                    <p className="sticky top-0 z-[1] bg-journal-surface px-5 pb-3 pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-journal-accent">
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
            <section className="relative z-[1] border-t border-journal-line py-20">
              <div className="mx-auto max-w-6xl px-5 md:px-8">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <SectionLabel className="mb-4">Keep reading</SectionLabel>
                    <h2 className="text-4xl font-medium tracking-[-0.05em] text-journal-ink md:text-5xl">More entries</h2>
                  </div>
                  <Link
                    href="/journal"
                    className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted transition hover:text-journal-accent"
                  >
                    All entries
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div className="border-b border-journal-line">
                  {relatedPosts.map((item) => (
                    <EntryRow
                      key={item._id}
                      post={item}
                      number={numberBySlug.get(item.slug) || 1}
                      href={`/journal/${item.slug}`}
                    />
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
