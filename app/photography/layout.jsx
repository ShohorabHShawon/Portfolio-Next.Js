export const metadata = {
  title:
    'Shohorab H Shawon Photography & Cinematography | Professional Photographer',

  description:
    'Shohorab H Shawon - Professional Photographer and Cinematographer. Explore photography portfolio, creative visual storytelling, and cinematography projects. Search Shohorab Shawon photographs and visual content.',

  keywords: [
    'Shohorab H Shawon Photography',
    'Shohorab Shawon Photographer',
    'Shohorab Photography',
    'Shawon Photography',
    'Shohorab H Shawon Cinematography',
    'Shohorab Shawon Cinematographer',
    'Photography by Shohorab',
    'Cinematography by Shohorab',
    'Shohorab Hossain Photography',
    'Shohorab Hossain Cinematography',
    'Professional Photography',
    'Professional Cinematographer',
    'Photography Portfolio',
    'Cinematography Portfolio',
    'Photographer Portfolio',
    'Professional Photographer Portfolio',
    'Creative Photography',
    'Visual Storytelling',
    'Photo Gallery',
    'Professional Photo Gallery',
    'Cinematography Services',
    'Photography Services',
    'Visual Content Creator',
    'Professional Visual Services',
    'Light and Shadow Photography',
    'Composition Photography',
    'Photography Inspiration',
    'Creative Direction',
    'Video Production',
    'Video Content Creation',
    'Motion Content',
    'Digital Photography',
    'Professional Photography Services',
    'Custom Photography',
    'Shohorab',
    'Shawon',
    'shohorab.com/photography',
  ],

  openGraph: {
    title: 'Shohorab H Shawon - Photography & Cinematography Portfolio',
    description:
      'Discover professional photography and cinematography by Shohorab H Shawon. Visual storytelling through light, shadow, and composition.',
    url: 'https://shohorab.com/photography',
    type: 'website',
    images: [
      {
        url: '/images/photography-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Shohorab H Shawon Photography Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Shohorab H Shawon - Photographer & Cinematographer',
    description:
      'Professional photography and cinematography portfolio by Shohorab H Shawon. Visual storytelling and creative content.',
    images: ['/images/photography-hero.jpg'],
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

  alternates: {
    canonical: '/photography',
  },
};

export default function PhotographyLayout({ children }) {
  return children;
}
