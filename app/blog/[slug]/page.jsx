import { groq, PortableText } from 'next-sanity';
import {
  Bangers,
  Comic_Neue,
  Permanent_Marker,
  Source_Serif_4,
  Space_Grotesk,
} from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';
import BlogMotionSection from '../BlogMotionSection';
import BlogThemeShell from '../BlogThemeShell';

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

const modernSansFont = Space_Grotesk({
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
    "excerpt": coalesce(pt::text(body)[0...120], "Read this post for practical ideas.")
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
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
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
    h2: ({ children }) => (
      <h2
        className={`${headingFont.className} blog-theme-heading mt-12 text-[2.2rem] uppercase leading-[0.95] tracking-wide text-[#111111] dark:text-[#eef6ff] md:text-[2.9rem]`}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
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
  const [post, relatedPosts] = await Promise.all([
    client.fetch(POST_QUERY, { slug }, { next: { revalidate } }),
    client.fetch(RELATED_POSTS_QUERY, { slug }, { next: { revalidate } }),
  ]);

  if (!post) {
    notFound();
  }

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
            </header>

            {post.mainImage && (
              <div className="blog-article-hero blog-modern-surface relative mt-10 h-[300px] w-full overflow-hidden rounded-3xl border-4 border-black md:h-[440px] dark:border-[#5eead4]">
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
                  <div className="relative h-36 overflow-hidden rounded-xl">
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
          <section className="blog-modern-post-shell mx-auto max-w-6xl px-6 pb-12 pt-24 md:px-8 md:pt-28">
            <article className="blog-modern-post-article">
              <div className="blog-modern-post-topbar">
                <Link href="/blog" className="blog-modern-back-btn">
                  Back To Blog
                </Link>
                <div className="blog-modern-post-top-meta">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>{post.author}</span>
                </div>
              </div>

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

              {post.mainImage && (
                <div className="blog-modern-post-hero-image">
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

              <div className="blog-modern-post-body-grid">
                <section className="blog-modern-post-content blog-rich-content">
                  <PortableText value={post.body || []} components={portableTextComponents} />
                </section>

                <aside className="blog-modern-post-aside">
                  <div className="blog-modern-aside-card">
                    <p className="blog-modern-aside-label">Written by</p>
                    <p className="blog-modern-aside-value">{post.author}</p>
                  </div>
                  <div className="blog-modern-aside-card">
                    <p className="blog-modern-aside-label">Published</p>
                    <p className="blog-modern-aside-value">{formatDate(post.publishedAt)}</p>
                  </div>
                  <div className="blog-modern-aside-card">
                    <p className="blog-modern-aside-label">Read next</p>
                    <p className="blog-modern-aside-value">Scroll below for related posts.</p>
                  </div>
                </aside>
              </div>
            </article>
          </section>
        </BlogMotionSection>

        {relatedPosts?.length > 0 && (
          <BlogMotionSection delay={0.14} y={20}>
            <section className="blog-modern-related-shell mx-auto max-w-6xl px-6 pb-16 md:px-8">
              <div className="blog-modern-grid-head">
                <h2 className={`${modernSerifFont.className} blog-modern-grid-title`}>Read Next</h2>
                <Link href="/blog" className="blog-modern-view-all-link">
                  View all posts
                </Link>
              </div>

              <div className="blog-modern-grid">
                {relatedPosts.map((item) => (
                  <Link key={item._id} href={`/blog/${item.slug}`} className="blog-modern-post-card group">
                    <div className="blog-modern-post-media">
                      {item.mainImage ? (
                        <Image
                          src={urlFor(item.mainImage).width(800).height(520).url()}
                          alt={item.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="h-full w-full bg-[#dbeafe] dark:bg-[#1e293b]" />
                      )}
                    </div>

                    <p className="blog-modern-meta">{formatDate(item.publishedAt)}</p>
                    <h3 className={`${modernSerifFont.className} blog-modern-post-title`}>{item.title}</h3>
                    <p className="blog-modern-post-excerpt">{item.excerpt}...</p>
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