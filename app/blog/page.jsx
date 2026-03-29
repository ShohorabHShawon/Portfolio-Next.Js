import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';

export const revalidate = 120;

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
    <main className="relative min-h-screen overflow-hidden bg-[#0e0f13] text-[#f4efe5]">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#dd7a33]/40 blur-3xl" />
        <div className="absolute top-1/3 -left-10 h-64 w-64 rounded-full bg-[#2f8f8e]/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#f0c674]/20 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pb-10 pt-20 md:px-8 md:pb-14 md:pt-24">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#f0c674]">Journal</p>
        <h1 className="max-w-4xl font-[family-name:var(--font-poppins)] text-4xl font-semibold leading-tight md:text-6xl">
          Stories, experiments, and dev notes from my creative engineering desk.
        </h1>
        <p className="mt-6 max-w-2xl text-sm text-[#d8d0c4] md:text-base">
          This blog blends software engineering with visual storytelling. Every post is crafted from practical work, lessons learned, and behind-the-scenes process.
        </p>

        <div className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-wider text-[#e6dfd2]">
          <span className="rounded-full border border-[#f0c674]/50 bg-[#f0c674]/10 px-4 py-2">Field notes</span>
          <span className="rounded-full border border-[#2f8f8e]/60 bg-[#2f8f8e]/10 px-4 py-2">Product mindset</span>
          <span className="rounded-full border border-[#dd7a33]/60 bg-[#dd7a33]/10 px-4 py-2">Design & code</span>
        </div>
      </section>

      {featured ? (
        <section className="relative mx-auto max-w-6xl px-6 pb-12 md:px-8 md:pb-16">
          {featured.slug && !featured.isDraft ? (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border border-[#f4efe5]/15 bg-gradient-to-br from-[#181b23] via-[#12141a] to-[#0d1016] p-4 transition duration-500 hover:border-[#f0c674]/40"
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
                    <div className="h-full w-full bg-gradient-to-br from-[#f0c674]/35 to-[#2f8f8e]/35" />
                  )}
                </div>

                <div className="flex flex-col justify-between rounded-2xl border border-[#f4efe5]/10 bg-[#11141b]/80 p-6 backdrop-blur">
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[#f0c674]">Featured article</p>
                    <h2 className="font-[family-name:var(--font-poppins)] text-3xl leading-tight text-[#f9f4eb] md:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-[#d7d0c5]">{featured.excerpt}...</p>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-[#c9c2b8]">
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span className="h-1 w-1 rounded-full bg-[#f0c674]" />
                    <span>{featured.author}</span>
                    <span className="h-1 w-1 rounded-full bg-[#f0c674]" />
                    <span className="text-[#f0c674]">Read story</span>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="group block overflow-hidden rounded-3xl border border-[#f4efe5]/15 bg-gradient-to-br from-[#181b23] via-[#12141a] to-[#0d1016] p-4">
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
                    <div className="h-full w-full bg-gradient-to-br from-[#f0c674]/35 to-[#2f8f8e]/35" />
                  )}
                </div>

                <div className="flex flex-col justify-between rounded-2xl border border-[#f4efe5]/10 bg-[#11141b]/80 p-6 backdrop-blur">
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[#f0c674]">Featured draft</p>
                    <h2 className="font-[family-name:var(--font-poppins)] text-3xl leading-tight text-[#f9f4eb] md:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-[#d7d0c5]">{featured.excerpt}...</p>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-[#c9c2b8]">
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span className="h-1 w-1 rounded-full bg-[#f0c674]" />
                    <span>{featured.author}</span>
                    <span className="h-1 w-1 rounded-full bg-[#f0c674]" />
                    <span className="text-[#f0c674]">Add slug in Studio to open this post</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="relative mx-auto max-w-6xl px-6 pb-16 md:px-8">
          <div className="rounded-3xl border border-[#f4efe5]/15 bg-[#11141b]/70 p-8 text-center">
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl">Blog is warming up</h2>
            <p className="mt-3 text-sm text-[#d7d0c5]">Create your first post in Sanity Studio and it will appear here automatically.</p>
          </div>
        </section>
      )}

      {restPosts.length > 0 && (
        <section className="relative mx-auto max-w-6xl px-6 pb-20 md:px-8">
          <div className="mb-7 flex items-end justify-between">
            <h3 className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl">Latest posts</h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[#aaa496]">Curated updates</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {restPosts.map((post, index) => (
              post.slug && !post.isDraft ? (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post._id}
                  className="group rounded-2xl border border-[#f4efe5]/10 bg-[#12151d]/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#2f8f8e]/80"
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
                      <div className="h-full w-full bg-gradient-to-br from-[#2f8f8e]/35 to-[#dd7a33]/25" />
                    )}
                  </div>

                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#f0c674]">{formatDate(post.publishedAt)}</p>
                  <h4 className="mt-3 font-[family-name:var(--font-poppins)] text-xl leading-snug text-[#f8f2e8]">{post.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-[#cac2b6]">{post.excerpt}...</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(post.categories || []).slice(0, 2).map((cat) => (
                      <span
                        key={`${post._id}-${cat}`}
                        className="rounded-full border border-[#f4efe5]/20 bg-[#f4efe5]/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#e5ddcf]"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </Link>
              ) : (
                <div
                  key={post._id}
                  className="rounded-2xl border border-[#f4efe5]/10 bg-[#12151d]/70 p-4"
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
                      <div className="h-full w-full bg-gradient-to-br from-[#2f8f8e]/35 to-[#dd7a33]/25" />
                    )}
                  </div>

                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#f0c674]">{formatDate(post.publishedAt)}</p>
                  <h4 className="mt-3 font-[family-name:var(--font-poppins)] text-xl leading-snug text-[#f8f2e8]">{post.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-[#cac2b6]">{post.excerpt}...</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#f0c674]">Add a slug in Studio to open this post</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(post.categories || []).slice(0, 2).map((cat) => (
                      <span
                        key={`${post._id}-${cat}`}
                        className="rounded-full border border-[#f4efe5]/20 bg-[#f4efe5]/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#e5ddcf]"
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