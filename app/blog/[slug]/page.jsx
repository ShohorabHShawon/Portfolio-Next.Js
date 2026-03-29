import { groq, PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

export const revalidate = 120;

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

const portableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 font-[family-name:var(--font-poppins)] text-3xl text-[#f8f2e8]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 font-[family-name:var(--font-poppins)] text-2xl text-[#f8f2e8]">{children}</h3>,
    normal: ({ children }) => <p className="mt-5 leading-8 text-[#d8d0c4]">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-[#f0c674] bg-[#f0c674]/10 px-4 py-3 italic text-[#f5e7cb]">
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
        className="text-[#f0c674] underline decoration-[#f0c674]/40 underline-offset-4"
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
  const post = await client.fetch(POST_QUERY, { slug }, { next: { revalidate: 120 } });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0e0f13] px-6 py-16 text-[#f4efe5] md:px-8 md:py-20">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex rounded-full border border-[#f4efe5]/25 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#e3dbcd] transition hover:border-[#f0c674] hover:text-[#f0c674]"
        >
          Back to blog
        </Link>

        <header className="mt-8">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#f0c674]">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="h-1 w-1 rounded-full bg-[#f0c674]" />
            <span>{post.author}</span>
          </div>

          <h1 className="font-[family-name:var(--font-poppins)] text-4xl leading-tight text-[#f9f4eb] md:text-6xl">
            {post.title}
          </h1>

          {post.categories?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <span
                  key={`${post._id}-${cat}`}
                  className="rounded-full border border-[#2f8f8e]/45 bg-[#2f8f8e]/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#9ed6d4]"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.mainImage && (
          <div className="relative mt-10 h-[320px] w-full overflow-hidden rounded-3xl border border-[#f4efe5]/10 md:h-[460px]">
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

        <section className="prose prose-invert mt-12 max-w-none">
          <PortableText value={post.body || []} components={portableTextComponents} />
        </section>
      </article>
    </main>
  );
}