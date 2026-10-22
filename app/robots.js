import { SITE_URL } from '@/lib/site';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The CMS editor is not content.
      disallow: ['/studio', '/journal/studio'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
