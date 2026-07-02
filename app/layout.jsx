import LenisProvider from '@/components/lenis';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import './globals.css';

const poppins = localFont({
  src: './fonts/Poppins-Bold.ttf',
  variable: '--font-poppins',
  weight: '100 900',
})

export const metadata = {
  title: 'Shohorab H Shawon | Photographer,Filmmaker & Software Engineer',

  description:
    'Shohorab H Shawon is a Dhaka-based Filmmaker and Visual Artist crafting cinematography, visual poetry, and creative stories across film and digital media.',
  other: {
    'google-site-verification': 'OgeF8_GazjYsJM9yIDL8e_bmi3k2fHqRFAVBeGTiWkI',
    'application-name': 'Shohorab H Shawon',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Shohorab H Shawon',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#000000',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#000000',
  },
  keywords: [
    'Shohorab H Shawon',
    'Shohorab Hossain Shawon',
    'Filmmaker',
    'Visual Artist',
    'Cinematography',
    'Visual Poetry',
    'Dhaka Filmmaker',
    'Creative Direction',
    'Video Production',
    'Visual Storytelling',
    'Creative Services',
    'Motion Pictures',
    'Independent Cinema',
    'shohorab.com',
    'shohorab',
    'Shawon',
    'AIUB Graduate',
    'Creative Professional',
  ],
  authors: [{ name: 'Shohorab Hossain Shawon', url: 'https://shohorab.com' }],
  creator: 'Shohorab Hossain Shawon',
  publisher: 'Shohorab Hossain Shawon',
  category: 'Technology',
  classification: 'Professional Portfolio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://shohorab.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shohorab H Shawon | Photographer, Filmmaker & Software Engineer',
    description:
      'Dhaka-based filmmaker and visual artist working through filmmaking, visual poetry, and expressive storytelling.',
    url: 'https://shohorab.com',
    siteName:
      'Shohorab H Shawon | Photographer,Filmmaker & Software Engineer',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Shohorab H Shawon | Photographer,Filmmaker & Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shohorab H Shawon | Photographer,Filmmaker & Software Engineer',
    description:
      'Dhaka-based filmmaker and visual artist focused on filmmaking, visual poetry, and creative storytelling.',
    images: ['/profile.jpg'],
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  const socialProfiles = [
    'https://github.com/ShohorabHShawon',
    'https://www.instagram.com/shohorabs.pov/',
    'https://www.facebook.com/shohorabhshawon/',
    'https://www.linkedin.com/in/shohorabhshawon/',
    'https://www.behance.net/shohorabhshawon',
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://shohorab.com/#person',
        name: 'Shohorab H Shawon',
        alternateName: ['Shohorab Hossain Shawon', 'Shohorab Shawon'],
        url: 'https://shohorab.com',
        image: 'https://shohorab.com/profile.jpg',
        description:
          'Dhaka-based Filmmaker and Visual Artist working through filmmaking and visual poetry.',
        jobTitle: [
          'Filmmaker',
          'Visual Artist',
          'Photographer',
          'Visual Storyteller',
          'Creative Director',
          'Software Engineer',
          'Web Developer',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance',
        },
        knowsAbout: [
          'Software Engineer',
          'Photographer',
          'Cinematography',
          'Visual Design',
          'Visual Storytelling',
          'filmmaker',
        ],
        sameAs: socialProfiles,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'General Inquiry',
          url: 'https://shohorab.com/#contact',
        },
        makesOffer: [
          {
            '@type': 'Service',
            name: 'Web Development Services',
            url: 'https://shohorab.com',
          },
          {
            '@type': 'Service',
            name: 'Photography Services',
            url: 'https://shohorab.com',
          },
          {
            '@type': 'Service',
            name: 'Filmmaking Services',
            url: 'https://shohorab.com',
          },
          {
            '@type': 'Service',
            name: 'Software Engineering Services',
            url: 'https://shohorab.com',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://shohorab.com/#website',
        url: 'https://shohorab.com',
        name: 'Shohorab H Shawon Portfolio',
        description:
          'Portfolio of Shohorab H Shawon featuring filmmaking, visual poetry, and creative visual work.',
        inLanguage: 'en',
        publisher: {
          '@id': 'https://shohorab.com/#person',
        },
        sameAs: socialProfiles,
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body
        className={`${poppins.variable} antialiased scroll-smooth`}
        suppressHydrationWarning
      >
        <LenisProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
