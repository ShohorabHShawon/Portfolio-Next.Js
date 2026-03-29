import { groq } from 'next-sanity';
import { Bangers, Comic_Neue } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import ThemeToggle from '@/components/ThemeToggle';
import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';

export const revalidate = 120;

const comicTitleFont = Bangers({
  subsets: ['latin'],
  weight: '400',
});

const comicBodyFont = Comic_Neue({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const BLOG_POSTS_QUERY = groq`
  *[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    "title": coalesce(title, "Untitled post"),
    "slug": slug.current,
    "isDraft": _id in path("drafts.**"),
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
  // Read fresh content so newly created posts appear quickly.
  const blogClient = client.withConfig({ useCdn: false });
  const posts = await blogClient.fetch(BLOG_POSTS_QUERY, {}, { next: { revalidate: 120 } });
  const featured = posts?.[0];
  const restPosts = posts?.slice(1) || [];

  return (
    <main className={`${comicBodyFont.className} relative min-h-screen overflow-hidden bg-[#fff9e8] text-[#111111] transition-colors dark:bg-[#15161d] dark:text-slate-100`}>
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(#0f172a_0.7px,transparent_0.7px)] [background-size:16px_16px] dark:bg-[radial-gradient(#f8fafc_0.6px,transparent_0.6px)]" />
      </div>

      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pb-10 pt-20 md:px-8 md:pt-24">
        <div className="rotate-[-1deg] rounded-[30px] border-4 border-black bg-[#ffdb4d] px-6 py-8 shadow-[8px_8px_0_#111111] dark:border-slate-100 dark:bg-[#202331] dark:shadow-[8px_8px_0_#e2e8f0] md:px-10 md:py-10">
          <p className="inline-flex rounded-full border-2 border-black bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] dark:border-slate-100 dark:bg-[#111827]">
            Manga Journal
          </p>
          <h1 className={`${comicTitleFont.className} mt-5 max-w-4xl text-5xl uppercase leading-[0.95] tracking-wide md:text-7xl`}>
            Panels Of Code, Stories Of Shipping
          </h1>
          <p className="mt-5 max-w-2xl text-base font-semibold text-[#1e293b] dark:text-slate-200 md:text-lg">
            Adventures from software missions, product battles, and creative experiments.
          </p>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border-2 border-black bg-white px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-800 transition hover:-translate-y-0.5 hover:bg-[#fff7cc] dark:border-slate-100 dark:bg-[#0f172a] dark:text-slate-100 dark:hover:bg-[#1e293b]"
            >
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
              className="group block overflow-hidden rounded-[28px] border-4 border-black bg-white p-4 shadow-[7px_7px_0_#111111] transition hover:-translate-y-1 dark:border-slate-100 dark:bg-[#1f2230] dark:shadow-[7px_7px_0_#e2e8f0]"
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
                    <div className="h-full w-full bg-gradient-to-br from-[#fecdd3] via-[#fde68a] to-[#bfdbfe] dark:from-slate-700 dark:via-slate-600 dark:to-slate-500" />
                  )}
                </div>

                <div className="flex flex-col justify-between rounded-2xl border-4 border-black bg-[#fff7cc] p-6 dark:border-slate-100 dark:bg-[#111827]">
                  <div>
                    <p className="mb-4 inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] dark:border-slate-100 dark:bg-[#0f172a]">
                      Main Episode
                    </p>
                    <h2 className={`${comicTitleFont.className} text-4xl uppercase leading-[0.95] tracking-wide text-slate-900 dark:text-slate-100 md:text-5xl`}>
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">{featured.excerpt}...</p>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#facc15]" />
                    <span>{featured.author}</span>
                    <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#facc15]" />
                    <span>Read story</span>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="group block overflow-hidden rounded-[28px] border-4 border-black bg-white p-4 shadow-[7px_7px_0_#111111] dark:border-slate-100 dark:bg-[#1f2230] dark:shadow-[7px_7px_0_#e2e8f0]">
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
                    <div className="h-full w-full bg-gradient-to-br from-[#fecdd3] via-[#fde68a] to-[#bfdbfe] dark:from-slate-700 dark:via-slate-600 dark:to-slate-500" />
                  )}
                </div>

                <div className="flex flex-col justify-between rounded-2xl border-4 border-black bg-[#fff7cc] p-6 dark:border-slate-100 dark:bg-[#111827]">
                  <div>
                    <p className="mb-4 inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] dark:border-slate-100 dark:bg-[#0f172a]">
                      Draft Episode
                    </p>
                    <h2 className={`${comicTitleFont.className} text-4xl uppercase leading-[0.95] tracking-wide text-slate-900 dark:text-slate-100 md:text-5xl`}>
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">{featured.excerpt}...</p>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#facc15]" />
                    <span>{featured.author}</span>
                    <span className="h-2 w-2 rounded-full bg-[#ef4444] dark:bg-[#facc15]" />
                    <span>Add slug in Studio to open this post</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-6 pb-16 md:px-8">
          <div className="rounded-[28px] border-4 border-black bg-[#fde68a] p-8 text-center shadow-[7px_7px_0_#111111] dark:border-slate-100 dark:bg-[#1f2230] dark:shadow-[7px_7px_0_#e2e8f0]">
            <h2 className={`${comicTitleFont.className} text-4xl uppercase`}>Next Episode Loading</h2>
            <p className="mt-3 text-base font-semibold text-slate-700 dark:text-slate-300">Create your first post in Sanity Studio and it will appear here automatically.</p>
          </div>
        </section>
      )}

      {restPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20 md:px-8">
          <div className="mb-7 flex items-end justify-between">
            <h3 className={`${comicTitleFont.className} text-4xl uppercase md:text-5xl`}>More Episodes</h3>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">Recent drops</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {restPosts.map((post, index) => (
              post.slug && !post.isDraft ? (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post._id}
                  className="group rounded-[24px] border-4 border-black bg-white p-4 shadow-[6px_6px_0_#111111] transition duration-300 hover:-translate-y-1 dark:border-slate-100 dark:bg-[#1f2230] dark:shadow-[6px_6px_0_#e2e8f0]"
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
                      <div className="h-full w-full bg-gradient-to-br from-[#fecaca] via-[#fef08a] to-[#bfdbfe] dark:from-slate-700 dark:via-slate-600 dark:to-slate-500" />
                    )}
                  </div>

                  <p className="inline-flex rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] dark:border-slate-100 dark:bg-[#111827]">{formatDate(post.publishedAt)}</p>
                  <h4 className={`${comicTitleFont.className} mt-3 text-3xl uppercase leading-[0.95] text-slate-900 dark:text-slate-100`}>{post.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{post.excerpt}...</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(post.categories || []).slice(0, 2).map((cat) => (
                      <span
                        key={`${post._id}-${cat}`}
                        className="rounded-full border-2 border-black bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:border-slate-100 dark:bg-[#0f172a] dark:text-slate-200"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </Link>
              ) : (
                <div
                  key={post._id}
                  className="rounded-[24px] border-4 border-black bg-white p-4 shadow-[6px_6px_0_#111111] dark:border-slate-100 dark:bg-[#1f2230] dark:shadow-[6px_6px_0_#e2e8f0]"
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
                      <div className="h-full w-full bg-gradient-to-br from-[#fecaca] via-[#fef08a] to-[#bfdbfe] dark:from-slate-700 dark:via-slate-600 dark:to-slate-500" />
                    )}
                  </div>

                  <p className="inline-flex rounded-full border-2 border-black bg-[#ffedd5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] dark:border-slate-100 dark:bg-[#111827]">{formatDate(post.publishedAt)}</p>
                  <h4 className={`${comicTitleFont.className} mt-3 text-3xl uppercase leading-[0.95] text-slate-900 dark:text-slate-100`}>{post.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{post.excerpt}...</p>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-300">Add a slug in Studio to open this post</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(post.categories || []).slice(0, 2).map((cat) => (
                      <span
                        key={`${post._id}-${cat}`}
                        className="rounded-full border-2 border-black bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:border-slate-100 dark:bg-[#0f172a] dark:text-slate-200"
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