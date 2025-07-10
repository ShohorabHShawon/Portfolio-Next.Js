/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '**' },
      { protocol: 'https', hostname: 'secure.notion-static.com', pathname: '**' },
      { protocol: 'https', hostname: 'i.imgur.com', pathname: '**' },
      { protocol: 'https', hostname: 'images.unsplash.org', pathname: '**' },
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '**' },
      { protocol: 'https', hostname: 'notion.so', pathname: '**' },
      { protocol: 'https', hostname: 'pbs.twimg.com', pathname: '**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '**' },
      { protocol: 'https', hostname: 'cdn.pixabay.com', pathname: '**' },
      { protocol: 'https', hostname: 'source.unsplash.com', pathname: '**' },
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '**' },
      { protocol: 'https', hostname: 'dummyimage.com', pathname: '**' },
      { protocol: 'https', hostname: 'placekitten.com', pathname: '**' },
      { protocol: 'https', hostname: 'loremflickr.com', pathname: '**' },
      { protocol: 'https', hostname: 'fakeimg.pl', pathname: '**' },
      { protocol: 'https', hostname: 'placeholder.com', pathname: '**' },
      { protocol: 'https', hostname: 'placehold.it', pathname: '**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '**' },
      { protocol: 'https', hostname: 'wallpapercave.com', pathname: '**' },
    ],
  },
};

export default nextConfig;
