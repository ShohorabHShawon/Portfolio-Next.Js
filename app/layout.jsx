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
  title:
    'Shohorab H Shawon - Software Engineer, Web Developer, Photographer & Cinematographer',

  description:
    'Shohorab H Shawon is a Software Engineer and Web Developer specializing in Next.js and React, plus a talented Photographer and Cinematographer. Explore projects, portfolio, and creative work.',
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
    'Software Engineer',
    'Web Developer',
    'Photographer',
    'Cinematographer',
    'Next.js Developer',
    'React Developer',
    'Frontend Engineer',
    'Backend Engineer',
    'Full Stack Engineer',
    'Web Development',
    'Software Development',
    'Photography Portfolio',
    'Cinematography',
    'Web Developer Portfolio',
    'JavaScript Developer',
    'TypeScript Developer',
    'Next.js Expert',
    'Nest.js Developer',
    'Node.js Developer',
    'React.js Specialist',
    'Web Applications',
    'Custom Web Solutions',
    'UI/UX Designer',
    'Visual Content Creator',
    'Photo Gallery',
    'Video Production',
    'Creative Services',
    'Tech Portfolio',
    'Developer Portfolio',
    'Professional Services',
    'shohorab.com',
    'shohorab',
    'Shawon',
    'AIUB Graduate',
    'Tech and Creative Professional',
    'Multi-disciplinary Developer',
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
    title: 'Shohorab H Shawon - Software Engineer, Web Developer, Photographer & Cinematographer',
    description:
      'Experienced Software Engineer and Web Developer specializing in Next.js and React. Also a talented Photographer and Cinematographer. Explore my portfolio and creative projects.',
    url: 'https://shohorab.com',
    siteName:
      'Shohorab H Shawon - Software Engineer, Web Developer, Photographer & Cinematographer',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Shohorab H Shawon - Software Engineer, Web Developer, Photographer & Cinematographer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shohorab H Shawon - Software Engineer, Web Developer, Photographer & Cinematographer',
    description:
      'Software Engineer, Web Developer, Photographer & Cinematographer. Specializing in Next.js, React, and creative visual content.',
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
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shohorab H Shawon',
    alternateName: ['Shohorab Hossain Shawon', 'Shohorab Shawon'],
    url: 'https://shohorab.com',
    image: 'https://shohorab.com/profile.jpg',
    description:
      'Software Engineer, Web Developer, Photographer, and Cinematographer',
    jobTitle: [
      'Software Engineer',
      'Web Developer',
      'Photographer',
      'Cinematographer',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    knowsAbout: [
      'Web Development',
      'Software Engineering',
      'Next.js',
      'React',
      'Node.js',
      'JavaScript',
      'TypeScript',
      'Photography',
      'Cinematography',
      'Visual Design',
    ],
    sameAs: [
      'https://github.com/shohorabhshawon',
      'https://www.instagram.com/shohorabs.pov/',
      'https://www.facebook.com/shohorabhshawon/',
      'https://www.linkedin.com/in/shohorabhshawon/',
    ],
    contact: {
      '@type': 'ContactPoint',
      contactType: 'General Inquiry',
      url: 'https://shohorab.com/#contact',
    },
    hasOffered: [
      {
        '@type': 'Service',
        name: 'Web Development Services',
        url: 'https://shohorab.com',
      },
      {
        '@type': 'Service',
        name: 'Photography Services',
        url: 'https://shohorab.com/photography',
      },
      {
        '@type': 'Service',
        name: 'Cinematography Services',
        url: 'https://shohorab.com/photography',
      },
      {
        '@type': 'Service',
        name: 'Software Engineering Services',
        url: 'https://shohorab.com',
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
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
