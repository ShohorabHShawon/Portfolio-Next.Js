import { groq } from 'next-sanity';

import { client } from '../sanity/lib/client';

const SITE_URL = 'https://shohorab.com';

const POSTS_FOR_SITEMAP_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    "updatedAt": coalesce(_updatedAt, publishedAt, _createdAt)
  }
`;

export default async function sitemap() {
  const blogClient = client.withConfig({ useCdn: true });
  const posts = await blogClient.fetch(POSTS_FOR_SITEMAP_QUERY, {}, { next: { revalidate: 300 } });

  const staticRoutes = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/photography`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  const postRoutes = (posts || []).map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}
