import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import LenisProvider from '@/components/lenis';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const Elmundo = localFont({
  src: './fonts/Elmundo.ttf',
  variable: '--font-elmundo',
  weight: '400',
});
const Bestia = localFont({
  src: './fonts/Bestia.otf',
  variable: '--font-bestia',
  weight: '400',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const lexend = localFont({
  src: './fonts/Lexend-VariableFont_wght.ttf',
  variable: '--font-lexend',
  weight: '400',
});

const grailga = localFont({
  src: './fonts/grailga-regular.otf',
  variable: '--font-grailga',
  display: 'swap',
});

export const metadata = {
  title:
    'Shohorab Hossain Shawon - Software Engineer & Full Stack Developer | Next.js & Nest.js Expert',
  // icons: {
  //   icon: '/icon.ico',
  //   apple: '/favicon.png',
  //   shortcut: '/favicon.png',
  //   other: [
  //     {
  //       rel: 'icon',
  //       url: '/favicon.png',
  //       sizes: '16x16',
  //     },
  //     {
  //       rel: 'icon',
  //       url: '/favicon.png',
  //       sizes: '32x32',
  //     },
  //     {
  //       rel: 'icon',
  //       url: '/favicon.png',
  //       sizes: '48x48',
  //     },
  //   ],
  // },
  description:
    'Shohorab Hossain Shawon - Software Engineer & Full Stack Developer specializing in Next.js, Nest.js, and modern technologies. View portfolio, projects, and get in touch for development services.',
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
    'Shohorab Hossain Shawon',
    'Shohorab',
    'Shawon',
    'shohorab.com',
    'shohorab h shawon',
    'shohorab',
    'shohorab hossain',
    'Software Engineer',
    'Portfolio',
    'Full Stack Web Developer',
    'Next.js',
    'Nest.js',
    'Web Developer',
    'React',
    'JavaScript',
    'TypeScript',
    'Web Development',
    'Web Developer',
    'Software Engineer',
    'UI/UX Designer',
    'AIUB Graduate',
    'Web Development Services',
    'Web Applications',
    'Web Design',
    'Web Technologies',
    'Frontend Developer',
    'Backend Developer',
    'Frontend Engineer',
    'Backend Engineer',
    'Web Applications Developer',
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'JavaScript Developer',
    'TypeScript',
    'Web Developer',
    'Node.js',
    'MongoDB',
    'Express.js',
    'Portfolio',
    'Web Development Services',
    'UI/UX Designer',
    'Software Engineer',
    'AIUB Graduate',
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
    title: 'Shohorab Hossain Shawon - Software Engineer & Full Stack Developer',
    description:
      'Professional Software Engineer & Full Stack Developer specializing in Next.js, Nest.js, and modern web technologies.',
    url: 'https://shohorab.com',
    siteName:
      'Shohorab Hossain Shawon - Software Engineer & Full Stack Developer',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Shohorab Hossain Shawon - Software Engineer & Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shohorab Hossain Shawon - Software Engineer & Full Stack Developer',
    description:
      'Professional Software Engineer & Full Stack Developer specializing in Next.js, Nest.js, and modern web technologies.',
    images: ['/profile.jpg'],
    creator: '@shohorab',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} ${grailga.variable} ${Elmundo.variable} ${Bestia.variable} antialiased scroll-smooth`}
      >
        <LenisProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
