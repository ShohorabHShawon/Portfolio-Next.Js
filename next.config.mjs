/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'secure.notion-static.com',
      'i.imgur.com',
      'images.unsplash.org',
      'cdn.sanity.io',
      'notion.so',
      'pbs.twimg.com',
      'res.cloudinary.com',
      'images.pexels.com',
      'cdn.pixabay.com',
      'source.unsplash.com',
      'via.placeholder.com',
      'dummyimage.com',
      'placekitten.com',
      'loremflickr.com',
      'fakeimg.pl',
      'placeholder.com',
      'placehold.it',
      'picsum.photos',
    ],
  },
};

export default nextConfig;
