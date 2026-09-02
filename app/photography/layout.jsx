export const metadata = {
  title:
    'Shohorab H Shawon Visual Storyteller & Aspiring Filmmaker | Professional Photographer',

  description:
    'Shohorab H Shawon - Visual Storyteller & Aspiring Filmmaker. Explore photography portfolio, creative visual storytelling, and filmmaking projects. Search Shohorab Shawon Visual Storyteller & Aspiring Filmmaker.',

  keywords: [
    'Shohorab H Shawon Visual Storyteller',
    'Shohorab Shawon Aspiring Filmmaker',
    'Shohorab Photography',
    'Shawon Photography',
    'Shohorab H Shawon Cinematography',
    'Shohorab Shawon Filmmaker',
    'Photography by Shohorab',
    'Cinematography by Shohorab',
    'Shohorab Hossain Photography',
    'Shohorab Hossain Cinematography',
    'Professional Photography',
    'Professional Filmmaker',
    'Photography Portfolio',
    'Cinematography Portfolio',
    'Photographer Portfolio',
    'Professional Photographer Portfolio',
    'Visual Storyteller & Aspiring Filmmaker',
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
    'shohorab.com',
  ],

  openGraph: {
    title: 'Shohorab H Shawon - Visual Storyteller & Aspiring Filmmaker Portfolio',
    description:
      'Discover professional Visual Storyteller & Aspiring Filmmaker work by Shohorab H Shawon. Visual storytelling through light, shadow, and composition.',
    url: 'https://shohorab.com',
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
    title: 'Shohorab H Shawon - Visual Storyteller & Aspiring Filmmaker',
    description:
      'Professional photography and cinematography portfolio by Shohorab H Shawon. Visual Storyteller & Aspiring Filmmaker.',
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
    canonical: '/',
  },
};

export default function PhotographyLayout({ children }) {
  return <div className="min-h-screen bg-white text-[#181A1B] transition-colors dark:bg-[#181A1B] dark:text-white">{children}</div>;
}
