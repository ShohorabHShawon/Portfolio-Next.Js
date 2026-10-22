import { DEFAULT_DESCRIPTION, PERSON_NAME } from '@/lib/site';

export default function manifest() {
  return {
    name: PERSON_NAME,
    short_name: 'Shohorab',
    description: DEFAULT_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1512',
    theme_color: '#1a1512',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
