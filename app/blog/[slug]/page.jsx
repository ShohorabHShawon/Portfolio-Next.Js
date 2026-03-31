import { groq, PortableText } from 'next-sanity';
import {
    Bangers,
    Comic_Neue,
    DM_Sans,
    Permanent_Marker,
    Source_Serif_4,
} from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';
import BackToTopButton from '../BackToTopButton';
import BlogMotionSection from '../BlogMotionSection';
import BlogThemeShell from '../BlogThemeShell';
import PostShareActions from '../PostShareActions';
import ReadingProgressBar from '../ReadingProgressBar';

export const revalidate = 120;
export const dynamic = 'force-static';

const SITE_URL = 'https://shohorab.com';
const NAME_VARIATIONS = ['Shohorab H Shawon', 'Shohorab Hossain Shawon', 'Shohorab Shawon', 'Shawon'];

const headingFont = Bangers({
  subsets: ['latin'],
  weight: ['400'],
});

const bodyFont = Comic_Neue({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const accentFont = Permanent_Marker({
  subsets: ['latin'],
  weight: ['400'],
});

const modernSansFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-blog-modern-sans',
});

const modernSerifFont = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-blog-modern-serif',
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
    "excerpt": coalesce(pt::text(body)[0...220], "Read this post on the Shohorab H Shawon blog.")
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
    "excerpt": coalesce(pt::text(body)[0...120], "Read this post for practical ideas."),
    "plainText": coalesce(pt::text(body), "")
  }
`;

const POST_NAV_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(coalesce(publishedAt, _createdAt) desc) {
    "slug": slug.current,
    "title": coalesce(title, "Untitled post")
  }
`;

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      const imageUrl = urlFor(value).width(1400).height(900).url();
      const altText = value?.alt || value?.caption || 'Blog content image';

      return (
        <figure className="blog-rich-image my-10 overflow-hidden rounded-2xl border-4 border-black bg-white p-2 shadow-[6px_6px_0_#111111] dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[6px_6px_0_#0a3a46]">
          <div className="blog-image-skeleton relative aspect-[16/10] w-full overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              alt={altText}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>
          {value?.caption && (
            <figcaption className="blog-rich-caption px-2 pb-1 pt-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-[#b7d6ea]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1
        className={`${headingFont.className} blog-theme-heading mt-16 text-[2.9rem] uppercase leading-[0.9] tracking-wide text-[#111111] dark:text-[#eef6ff] md:text-[3.8rem]`}
      >
        {children}
      </h1>
    ),
    h2: ({ children, value }) => (
      <h2
        id={getHeadingId(value)}
        className={`${headingFont.className} blog-theme-heading mt-12 text-[2.2rem] uppercase leading-[0.95] tracking-wide text-[#111111] dark:text-[#eef6ff] md:text-[2.9rem]`}
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={getHeadingId(value)}
        className={`${accentFont.className} blog-theme-heading mt-9 text-[1.38rem] leading-tight text-[#0f172a] dark:text-[#fbbf24] md:text-[1.62rem]`}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className={`${bodyFont.className} mt-7 text-[1rem] font-bold uppercase tracking-[0.12em] text-[#1f2937] dark:text-[#cfe7f7] md:text-[1.12rem]`}
      >
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className={`${bodyFont.className} mt-6 text-[1.12rem] leading-[1.9] text-[#1f2937] dark:text-[#b7d6ea] md:text-[1.24rem]`}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={`${accentFont.className} blog-rich-blockquote mt-11 rounded-2xl border-4 border-black bg-[#fde047] px-5 py-4 text-[1.45rem] leading-[1.35] text-[#111111] shadow-[4px_4px_0_#111111] dark:border-[#5eead4] dark:bg-[#1b2f4a] dark:text-[#eef6ff] dark:shadow-[4px_4px_0_#0a3a46]`}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="font-bold text-[#0f172a] underline decoration-[#ef4444] decoration-2 underline-offset-4 transition-colors hover:text-[#ef4444] dark:text-[#fbbf24] dark:decoration-[#fbbf24] dark:hover:text-[#fde68a]"
      >
        {children}
      </a>
    ),
  },
};

function formatDate(dateString) {
  if (!dateString) return 'Coming soon';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
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

function toPlainText(blocks, fallback = 'Read this blog post by Shohorab H Shawon.') {
  if (!Array.isArray(blocks)) return fallback;

  const text = blocks
    .filter((block) => block?._type === 'block' && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child?.text || '').join(' '))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return fallback;
  if (text.length <= 165) return text;
  return `${text.slice(0, 162).trim()}...`;
}

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
  const canonicalPath = `/blog/${slug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${SITE_URL}/profile.jpg`;
  const authorName = post.author || 'Shohorab Hossain Shawon';
  const keywords = [
    post.title,
    `${post.title} blog`,
    `${authorName} blog`,
    'Shohorab H Shawon blog',
    'Shohorab Hossain Shawon blog',
    'Shohorab Shawon blog',
    'Shawon blog',
    'developer blog',
    ...((post.categories || []).filter(Boolean)),
  ];

  return {
    title: `${post.title} | Shohorab H Shawon Blog`,
    description,
    keywords,
    authors: [{ name: authorName, url: `${SITE_URL}/blog` }],
    creator: 'Shohorab Hossain Shawon',
    publisher: 'Shohorab Hossain Shawon',
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${post.title} | Shohorab H Shawon Blog`,
      description,
      url: canonicalUrl,
      siteName: 'Shohorab H Shawon Blog',
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
      title: `${post.title} | Shohorab H Shawon Blog`,
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

  const readingTimeMinutes = estimateReadingTime(toPlainText(post.body, ''));
  const relatedPosts = (relatedPostsRaw || []).map((item) => ({
    ...item,
    readingTimeMinutes: estimateReadingTime(item.plainText || item.excerpt),
  }));
  const tableOfContents = buildTableOfContents(post.body);
  const showTableOfContents = tableOfContents.length >= 3;
  const navPosts = navPostsRaw || [];
  const currentIndex = navPosts.findIndex((item) => item.slug === slug);
  const newerPost = currentIndex > 0 ? navPosts[currentIndex - 1] : null;
  const olderPost = currentIndex >= 0 ? navPosts[currentIndex + 1] : null;

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;
  const description = toPlainText(post.body, `Read ${post.title} by ${post.author}.`);
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
    articleSection: post.categories || [],
    inLanguage: 'en-US',
  };

  if (post.mainImage) {
    articleSchema.image = [urlFor(post.mainImage).width(1200).height(630).url()];
  } else {
    articleSchema.image = [`${SITE_URL}/profile.jpg`];
  }

  return (
    <BlogThemeShell>
      <main
        className={`${bodyFont.className} ${modernSansFont.variable} ${modernSerifFont.variable} blog-page-root blog-slug-page relative min-h-screen overflow-x-hidden bg-[#fff8e1] px-5 py-14 text-[#111111] transition-colors dark:bg-[#050b18] dark:text-[#e6f3ff] md:px-8 md:py-20`}
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

        <div className="blog-theme-decor pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(#111111_0.8px,transparent_0.8px)] opacity-[0.14] [background-size:16px_16px] dark:bg-[radial-gradient(#5eead4_0.8px,transparent_0.8px)] dark:opacity-[0.2]" />
          <div className="absolute inset-0 hidden [background-image:radial-gradient(#020617_0.8px,transparent_0.8px)] opacity-[0.28] [background-size:16px_16px] [background-position:2px_2px] dark:block" />
          <div className="absolute -left-24 top-20 h-48 w-48 rounded-full border-4 border-black bg-[#fb7185] dark:border-[#5eead4] dark:bg-[#1a2d52]" />
          <div className="absolute -right-20 bottom-16 h-40 w-40 rounded-full border-4 border-black bg-[#60a5fa] dark:border-[#5eead4] dark:bg-[#145e66]" />
        </div>

      <div className="blog-theme-view blog-theme-view-manga">
      <BlogMotionSection delay={0.04} y={16}>
        <div className="blog-slug-article-section relative mx-auto w-full max-w-[820px]">
          <article className="blog-article-shell blog-modern-surface relative w-full rounded-[30px] border-4 border-black bg-white px-6 py-8 shadow-[10px_10px_0_#111111] md:px-10 md:py-12 dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[10px_10px_0_#0a3a46]">
            <span className="blog-theme-pill absolute -top-5 left-8 inline-flex rounded-full border-2 border-black bg-[#ef4444] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white dark:border-[#5eead4] dark:bg-[#fbbf24] dark:text-[#0b1220]">
              STORY
            </span>
            <Link
              href="/blog"
              className="blog-theme-action group inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#fff7cc] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700 transition hover:-translate-y-0.5 hover:bg-[#fde68a] dark:border-[#5eead4] dark:bg-[#13233a] dark:text-[#d8ebf8] dark:hover:bg-[#1b3652]"
            >
              <span
                aria-hidden="true"
                className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-[#ef4444] text-[10px] font-black leading-none text-white shadow-[2px_2px_0_#111111] transition-transform duration-200 before:absolute before:-right-1 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rotate-45 before:border-b-2 before:border-r-2 before:border-black before:bg-[#ef4444] group-hover:-translate-x-0.5 dark:border-[#5eead4] dark:bg-[#fbbf24] dark:text-[#0b1220] dark:shadow-[2px_2px_0_#0a3a46] dark:before:border-[#5eead4] dark:before:bg-[#fbbf24]"
              >
                {'<'}
              </span>
              <span>Back to blog</span>
            </Link>

            <header className="blog-article-header mt-8">
              <div className="blog-article-meta mb-6 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-700 dark:text-[#b7d6ea]">
                <span>{formatDate(post.publishedAt)}</span>
                <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fbbf24]" />
                <span>{post.author}</span>
                <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fbbf24]" />
                <span>{readingTimeMinutes} min read</span>
              </div>

              <h1 className={`${headingFont.className} blog-theme-heading blog-post-title text-[2.9rem] uppercase leading-[0.9] tracking-wide text-slate-900 dark:text-[#eef6ff] md:text-[4.6rem]`}>
                {post.title}
              </h1>

              {post.categories?.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-2">
                  {post.categories.map((cat) => (
                    <span
                      key={`${post._id}-${cat}`}
                      className="blog-theme-chip rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:border-[#5eead4] dark:bg-[#1b3652] dark:text-[#d8ebf8]"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              <PostShareActions url={canonicalUrl} title={post.title} variant="manga" />
            </header>

            {showTableOfContents && (
              <aside className="mt-8 rounded-2xl border-4 border-black bg-[#fff7cc] p-4 shadow-[5px_5px_0_#111111] dark:border-[#5eead4] dark:bg-[#13233a] dark:shadow-[5px_5px_0_#0a3a46]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700 dark:text-[#b7d6ea]">
                  Jump To
                </p>
                <ul className="mt-3 space-y-2">
                  {tableOfContents.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className={`inline-flex text-sm font-bold transition hover:text-[#ef4444] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff7cc] dark:focus-visible:ring-[#fbbf24] dark:focus-visible:ring-offset-[#13233a] ${
                          heading.level === 3 ? 'ml-4 text-slate-600 dark:text-[#cfe7f7]' : 'text-slate-800 dark:text-[#e6f3ff]'
                        }`}
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {post.mainImage && (
              <div className="blog-article-hero blog-image-skeleton blog-modern-surface relative mt-10 h-[300px] w-full overflow-hidden rounded-3xl border-4 border-black md:h-[440px] dark:border-[#5eead4]">
                <span className="blog-theme-pill absolute left-3 top-3 z-10 rounded-full border-2 border-black bg-[#fde047] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#111111] dark:border-[#5eead4] dark:bg-[#1a2d52] dark:text-[#eef6ff]">
                  Scene
                </span>
                <Image
                  src={urlFor(post.mainImage).width(1600).height(1000).url()}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            )}

            <section className="blog-rich-content mt-12 max-w-none border-t-4 border-black pt-4 dark:border-[#5eead4]">
              <PortableText value={post.body || []} components={portableTextComponents} />
            </section>

            {(newerPost || olderPost) && (
              <nav className="mt-10 grid gap-3 border-t-4 border-black pt-5 dark:border-[#5eead4] sm:grid-cols-2">
                {newerPost ? (
                  <Link
                    href={`/blog/${newerPost.slug}`}
                    className="group rounded-2xl border-2 border-black bg-[#ffedd5] px-4 py-3 text-left transition hover:-translate-y-0.5 hover:bg-[#fde68a] dark:border-[#5eead4] dark:bg-[#13233a] dark:hover:bg-[#1b3652]"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700 dark:text-[#b7d6ea]">
                      Newer Post
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900 dark:text-[#e6f3ff]">{newerPost.title}</p>
                  </Link>
                ) : (
                  <span aria-hidden="true" />
                )}

                {olderPost ? (
                  <Link
                    href={`/blog/${olderPost.slug}`}
                    className="group rounded-2xl border-2 border-black bg-[#ffedd5] px-4 py-3 text-left transition hover:-translate-y-0.5 hover:bg-[#fde68a] dark:border-[#5eead4] dark:bg-[#13233a] dark:hover:bg-[#1b3652]"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700 dark:text-[#b7d6ea]">
                      Older Post
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900 dark:text-[#e6f3ff]">{olderPost.title}</p>
                  </Link>
                ) : (
                  <span aria-hidden="true" />
                )}
              </nav>
            )}
          </article>
        </div>
      </BlogMotionSection>

      {relatedPosts?.length > 0 && (
        <BlogMotionSection delay={0.14} y={20}>
          <section className="blog-related-section mx-auto mt-10 max-w-3xl pb-8">
            <div className="mb-5 flex items-end justify-between">
              <h2 className={`${headingFont.className} blog-theme-heading text-[2.7rem] uppercase leading-none tracking-wide text-slate-900 dark:text-[#eef6ff] md:text-[3.2rem]`}>Read Next</h2>
              <Link
                href="/blog"
                className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700 transition hover:text-[#ef4444] dark:text-[#b7d6ea] dark:hover:text-[#fbbf24]"
              >
                View all
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {relatedPosts.map((item) => (
                <Link
                  key={item._id}
                  href={`/blog/${item.slug}`}
                  className="blog-post-card blog-modern-surface group overflow-hidden rounded-2xl border-4 border-black bg-white p-3 shadow-[6px_6px_0_#111111] transition hover:-translate-y-1 hover:bg-[#fff7cc] dark:border-[#5eead4] dark:bg-[#0f1a2e] dark:shadow-[6px_6px_0_#0a3a46] dark:hover:bg-[#1b3652]"
                >
                  <div className="blog-image-skeleton relative h-36 overflow-hidden rounded-xl">
                    {item.mainImage ? (
                      <Image
                        src={urlFor(item.mainImage).width(800).height(520).url()}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#fecaca] via-[#fef08a] to-[#bfdbfe] dark:from-[#243f73] dark:via-[#2a5f8f] dark:to-[#146368]" />
                    )}
                  </div>

                  <p className="blog-theme-pill mt-3 inline-flex rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700 dark:border-[#5eead4] dark:bg-[#13233a] dark:text-[#d8ebf8]">
                    {formatDate(item.publishedAt)}
                  </p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-[#b7d6ea]">
                    {item.readingTimeMinutes} min read
                  </p>
                  <h3 className={`${accentFont.className} blog-theme-heading blog-post-title mt-3 text-2xl leading-[1] text-slate-900 dark:text-[#fbbf24]`}>
                    {item.title}
                  </h3>
                  <p className="blog-post-excerpt mt-2 line-clamp-3 text-sm leading-6 text-slate-700 dark:text-[#b7d6ea]">
                    {item.excerpt}...
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </BlogMotionSection>
      )}
      </div>

      <div className="blog-theme-view blog-theme-view-modern">
        <BlogMotionSection delay={0.04} y={16}>
          <section className="blog-modern-post-shell mx-auto max-w-6xl px-6 pb-8 pt-24 md:px-8 md:pt-28">
            <article className="blog-modern-post-article">
              <div className="blog-modern-post-header">
                <Link href="/blog" className="blog-modern-back-btn">
                  Back To Stories
                </Link>
                <p className="blog-modern-meta blog-modern-post-meta">
                  {post.author} • {formatDate(post.publishedAt)} • {readingTimeMinutes} min read
                </p>
                <h1 className={`${modernSerifFont.className} blog-modern-post-main-title`}>{post.title}</h1>

                {post.categories?.length > 0 && (
                  <div className="blog-modern-chip-row blog-modern-chip-row-top">
                    {post.categories.map((cat) => (
                      <span key={`${post._id}-${cat}`} className="blog-modern-chip">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                <PostShareActions url={canonicalUrl} title={post.title} variant="modern" />
              </div>

              {showTableOfContents && (
                <aside className="blog-modern-toc mt-6 rounded-xl border border-[#e6e6e6] bg-[#fafaf8] p-4 dark:border-[#2a2a2a] dark:bg-[#1b1d1e]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b6b6b] dark:text-[#a0a0a0]">
                    Table of contents
                  </p>
                  <ul className="mt-3 space-y-2">
                    {tableOfContents.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className={`inline-flex text-sm text-[#3f3f3f] transition hover:text-[#191919] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a8917] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf8] dark:text-[#d1d1d1] dark:hover:text-[#f3f3f3] dark:focus-visible:ring-[#35b24a] dark:focus-visible:ring-offset-[#1b1d1e] ${
                            heading.level === 3 ? 'ml-4' : ''
                          }`}
                        >
                          {heading.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}

              {post.mainImage && (
                <div className="blog-modern-post-hero-image blog-image-skeleton">
                  <Image
                    src={urlFor(post.mainImage).width(1600).height(1000).url()}
                    alt={post.title}
                    width={1600}
                    height={1000}
                    priority
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </div>
              )}

              <section className="blog-modern-post-content blog-rich-content">
                <PortableText value={post.body || []} components={portableTextComponents} />
              </section>

              {(newerPost || olderPost) && (
                <nav className="mt-8 grid gap-3 border-t border-[#e6e6e6] pt-5 dark:border-[#2a2a2a] sm:grid-cols-2">
                  {newerPost ? (
                    <Link
                      href={`/blog/${newerPost.slug}`}
                      className="rounded-xl border border-[#d0d0d0] bg-white px-4 py-3 transition hover:border-[#191919] dark:border-[#3a3a3a] dark:bg-transparent dark:hover:border-[#f3f3f3]"
                    >
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#6b6b6b] dark:text-[#a0a0a0]">
                        Newer Post
                      </p>
                      <p className={`mt-1 text-base text-[#191919] dark:text-[#f3f3f3] ${modernSerifFont.className}`}>
                        {newerPost.title}
                      </p>
                    </Link>
                  ) : (
                    <span aria-hidden="true" />
                  )}

                  {olderPost ? (
                    <Link
                      href={`/blog/${olderPost.slug}`}
                      className="rounded-xl border border-[#d0d0d0] bg-white px-4 py-3 transition hover:border-[#191919] dark:border-[#3a3a3a] dark:bg-transparent dark:hover:border-[#f3f3f3]"
                    >
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#6b6b6b] dark:text-[#a0a0a0]">
                        Older Post
                      </p>
                      <p className={`mt-1 text-base text-[#191919] dark:text-[#f3f3f3] ${modernSerifFont.className}`}>
                        {olderPost.title}
                      </p>
                    </Link>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </nav>
              )}
            </article>
          </section>
        </BlogMotionSection>

        {relatedPosts?.length > 0 && (
          <BlogMotionSection delay={0.14} y={20}>
            <section className="blog-modern-related-shell mx-auto max-w-6xl px-6 pb-16 md:px-8">
              <div className="blog-modern-grid-head">
                <h2 className={`${modernSerifFont.className} blog-modern-grid-title`}>Read Next</h2>
                <Link href="/blog" className="blog-modern-view-all-link">
                  View all stories
                </Link>
              </div>

              <div className="blog-modern-feed-list">
                {relatedPosts.map((item) => (
                  <Link key={item._id} href={`/blog/${item.slug}`} className="blog-modern-feed-item group">
                    <div className="blog-modern-feed-copy">
                      <p className="blog-modern-meta">
                        {formatDate(item.publishedAt)} • {item.readingTimeMinutes} min read
                      </p>
                      <h3 className={`${modernSerifFont.className} blog-modern-post-title`}>{item.title}</h3>
                      <p className="blog-modern-post-excerpt">{item.excerpt}...</p>
                    </div>

                    <div className="blog-modern-feed-media">
                      {item.mainImage ? (
                        <Image
                          src={urlFor(item.mainImage).width(800).height(520).url()}
                          alt={item.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 240px"
                        />
                      ) : (
                        <div className="h-full w-full bg-[#ececec] dark:bg-[#222222]" />
                      )}
                    </div>
                  </Link>
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