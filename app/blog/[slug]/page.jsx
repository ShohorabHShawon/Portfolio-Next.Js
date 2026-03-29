import { groq, PortableText } from 'next-sanity';
import {
    Bangers,
    Comic_Neue,
    Permanent_Marker,
} from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ThemeToggle from '@/components/ThemeToggle';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

export const revalidate = 120;

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
        <figure className="my-10 overflow-hidden rounded-2xl border-4 border-black bg-white p-2 shadow-[6px_6px_0_#111111] dark:border-slate-100 dark:bg-[#1f2230] dark:shadow-[6px_6px_0_#e2e8f0]">
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
            <figcaption className="px-2 pb-1 pt-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2
        className={`${headingFont.className} mt-14 text-[2.35rem] uppercase leading-[0.95] tracking-wide text-[#111111] dark:text-[#f8fafc] md:text-[3rem]`}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={`${accentFont.className} mt-11 text-[1.5rem] leading-tight text-[#0f172a] dark:text-[#fde68a] md:text-[1.75rem]`}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className={`${bodyFont.className} mt-10 text-[1.08rem] font-bold uppercase tracking-[0.12em] text-[#1f2937] dark:text-[#e2e8f0] md:text-[1.2rem]`}
      >
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className={`${bodyFont.className} mt-6 text-[1.12rem] leading-[1.9] text-[#1f2937] dark:text-[#e2e8f0] md:text-[1.24rem]`}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={`${accentFont.className} mt-11 rounded-2xl border-4 border-black bg-[#fde047] px-5 py-4 text-[1.45rem] leading-[1.35] text-[#111111] shadow-[4px_4px_0_#111111] dark:border-slate-100 dark:bg-[#334155] dark:text-[#f8fafc] dark:shadow-[4px_4px_0_#e2e8f0]`}
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
        className="font-bold text-[#0f172a] underline decoration-[#ef4444] decoration-2 underline-offset-4 transition-colors hover:text-[#ef4444] dark:text-[#fde68a] dark:decoration-[#fde68a] dark:hover:text-white"
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

export async function generateStaticParams() {
  const slugs = await client.fetch(SLUGS_QUERY);
  return slugs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: `Read ${post.title} by ${post.author}.`,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blogClient = client.withConfig({ useCdn: false });
  const [post, relatedPosts] = await Promise.all([
    blogClient.fetch(POST_QUERY, { slug }, { next: { revalidate: 120 } }),
    blogClient.fetch(RELATED_POSTS_QUERY, { slug }, { next: { revalidate: 120 } }),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main
      className={`${bodyFont.className} relative min-h-screen overflow-hidden bg-[#fff8e1] px-5 py-14 text-[#111111] transition-colors dark:bg-[#181A1B] dark:text-slate-100 md:px-8 md:py-20`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#111111_0.8px,transparent_0.8px)] opacity-[0.14] [background-size:16px_16px] dark:bg-[radial-gradient(#f8fafc_0.8px,transparent_0.8px)] dark:opacity-[0.12]" />
        <div className="absolute -left-24 top-20 h-48 w-48 rounded-full border-4 border-black bg-[#fb7185] dark:border-slate-100 dark:bg-[#0f172a]" />
        <div className="absolute -right-20 bottom-16 h-40 w-40 rounded-full border-4 border-black bg-[#60a5fa] dark:border-slate-100 dark:bg-[#1e293b]" />
      </div>

      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <article className="relative mx-auto max-w-3xl rounded-[30px] border-4 border-black bg-white px-6 py-8 shadow-[10px_10px_0_#111111] md:px-10 md:py-12 dark:border-slate-100 dark:bg-[#1f2230] dark:shadow-[10px_10px_0_#e2e8f0]">
        <span className="absolute -top-5 left-8 inline-flex rounded-full border-2 border-black bg-[#ef4444] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white dark:border-slate-100 dark:bg-[#facc15] dark:text-slate-900">
          Issue
        </span>
        <Link
          href="/blog"
          className="inline-flex rounded-full border-2 border-black bg-[#fff7cc] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700 transition hover:-translate-y-0.5 hover:bg-[#fde68a] dark:border-slate-100 dark:bg-[#111827] dark:text-slate-200 dark:hover:bg-[#0f172a]"
        >
          Back to blog
        </Link>

        <header className="mt-8">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-700 dark:text-slate-300">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#fde68a]" />
            <span>{post.author}</span>
          </div>

          <h1 className={`${headingFont.className} text-[3rem] uppercase leading-[0.9] tracking-wide text-slate-900 dark:text-slate-100 md:text-[4.8rem]`}>
            {post.title}
          </h1>

          {post.categories?.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <span
                  key={`${post._id}-${cat}`}
                  className="rounded-full border-2 border-black bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:border-slate-100 dark:bg-[#111827] dark:text-slate-200"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.mainImage && (
          <div className="relative mt-10 h-[300px] w-full overflow-hidden rounded-3xl border-4 border-black md:h-[440px] dark:border-slate-100">
            <span className="absolute left-3 top-3 z-10 rounded-full border-2 border-black bg-[#fde047] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#111111] dark:border-slate-100 dark:bg-[#1e293b] dark:text-slate-100">
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

        <section className="mt-12 max-w-none border-t-4 border-black pt-4 dark:border-slate-100">
          <PortableText value={post.body || []} components={portableTextComponents} />
        </section>
      </article>

      {relatedPosts?.length > 0 && (
        <section className="mx-auto mt-10 max-w-3xl pb-8">
          <div className="mb-5 flex items-end justify-between">
            <h2 className={`${headingFont.className} text-[2.7rem] uppercase leading-none tracking-wide text-slate-900 dark:text-slate-100 md:text-[3.2rem]`}>Read Next</h2>
            <Link
              href="/blog"
              className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700 transition hover:text-[#ef4444] dark:text-slate-300 dark:hover:text-[#fde68a]"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {relatedPosts.map((item) => (
              <Link
                key={item._id}
                href={`/blog/${item.slug}`}
                className="group overflow-hidden rounded-2xl border-4 border-black bg-white p-3 shadow-[6px_6px_0_#111111] transition hover:-translate-y-1 hover:bg-[#fff7cc] dark:border-slate-100 dark:bg-[#1f2230] dark:shadow-[6px_6px_0_#e2e8f0] dark:hover:bg-[#263245]"
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
                    <div className="h-full w-full bg-gradient-to-br from-[#fecaca] via-[#fef08a] to-[#bfdbfe] dark:from-slate-700 dark:via-slate-600 dark:to-slate-500" />
                  )}
                </div>

                <p className="mt-3 inline-flex rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700 dark:border-slate-100 dark:bg-[#111827] dark:text-slate-200">
                  {formatDate(item.publishedAt)}
                </p>
                <h3 className={`${accentFont.className} mt-3 text-2xl leading-[1] text-slate-900 dark:text-[#fde68a]`}>
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {item.excerpt}...
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}