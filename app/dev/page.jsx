export const metadata = {
  title: 'Shohorab H Shawon - Software Engineer, Web Developer & Dev Portfolio',
  description:
    'Shohorab H Shawon is a Software Engineer and Web Developer with a secondary creative practice in photography and filmmaking.',
  keywords: [
    'Shohorab H Shawon',
    'Shohorab Hossain Shawon',
    'Software Engineer',
    'Web Developer',
    'Frontend Engineer',
    'Full Stack Engineer',
    'Next.js Developer',
    'React Developer',
    'Photography Portfolio',
    'Filmmaker',
    'Photographer',
    'shohorab.com/dev',
  ],
  alternates: {
    canonical: '/dev',
  },
  openGraph: {
    title: 'Shohorab H Shawon - Software Engineer & Web Developer',
    description:
      'Developer portfolio for Shohorab H Shawon, with selected software, web, and UI projects alongside creative work.',
    url: 'https://shohorab.com/dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shohorab H Shawon - Software Engineer & Web Developer',
    description:
      'Developer portfolio for Shohorab H Shawon, with software, web, and UI projects.',
    creator: '@shohorab',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import DevPortfolioClient from './DevPortfolioClient';

export default function DevPage() {
  return <DevPortfolioClient />;
}