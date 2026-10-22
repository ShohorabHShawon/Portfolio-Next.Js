import { groq } from 'next-sanity';

import { SITE_URL } from '@/lib/site';
import { photos } from './photography/components/photoData';
import { client } from '../sanity/lib/client';

const POSTS_FOR_SITEMAP_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    "updatedAt": coalesce(_updatedAt, publishedAt, _createdAt)
  }
`;

const absolute = (path) => `${SITE_URL}${path}`;

export default async function sitemap() {
  const blogClient = client.withConfig({ useCdn: true });
  const posts = await blogClient.fetch(POSTS_FOR_SITEMAP_QUERY, {}, { next: { revalidate: 300 } });
  const now = new Date();

  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      // Portrait + hero still, so image search can connect the name to the face and work.
      images: [absolute('/profile.jpg'), absolute('/shohorab1.JPG'), absolute('/cover-web.jpg')],
    },
    {
      url: absolute('/photos'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      // Every gallery photo (web copies), for Google Images.
      images: photos.map((photo) => absolute(photo.src)),
    },
    {
      url: absolute('/journal'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: absolute('/clients'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: absolute('/dev'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const postRoutes = (posts || []).map((post) => ({
    url: absolute(`/journal/${post.slug}`),
    lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
