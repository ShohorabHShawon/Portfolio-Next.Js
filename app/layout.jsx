import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import LenisProvider from '@/components/lenis';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
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

export const metadata = {
  title:
    'Shohorab Hossain Shawon - Full Stack Web Developer | Next.js & React Expert',
  icons: {
    icon: '/icon.ico',
    apple: '/favicon.png',
    shortcut: '/favicon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon.png',
        sizes: '16x16',
      },
      {
        rel: 'icon',
        url: '/favicon.png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        url: '/favicon.png',
        sizes: '48x48',
      },
    ],
  },
  description:
    'Shohorab Hossain Shawon - Professional Full Stack Web Developer specializing in Next.js, React, JavaScript, and modern web technologies. View my portfolio, projects, and contact me for web development services.',
  keywords: [
    'Shohorab Hossain Shawon',
    'Shohorab H Shawon',
    'Shohorab',
    'Shawon',
    'Full Stack Developer',
    'Web Developer',
    'Next.js Developer',
    'React Developer',
    'JavaScript Developer',
    'Frontend Developer',
    'Front-end Developer',
    'Back-end Developer',
    'Full Stack Developer',
    'Photographer',
    'Portfolio Website',
    'Ui/UX Designer',
    'Portfolio',
    'Web Development Services',
    'Web Design',
    'Web Applications',
    'Software Engineer',
    'Software Development',
    'AIUB',
    'American International University-Bangladesh',
  ],
  authors: [{ name: 'Shohorab Hossain Shawon' }],
  creator: 'Shohorab Hossain Shawon',
  publisher: 'Shohorab Hossain Shawon',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://shohorabhshawon.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shohorab Hossain Shawon - Full Stack Web Developer',
    description:
      'Professional Full Stack Web Developer specializing in Next.js, React, and modern web technologies.',
    url: 'https://shohorabhshawon.com',
    siteName: 'Shohorab Hossain Shawon Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shohorab Hossain Shawon - Full Stack Web Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shohorab Hossain Shawon - Full Stack Web Developer',
    description:
      'Professional Full Stack Web Developer specializing in Next.js, React, and modern web technologies.',
    images: ['/og-image.jpg'],
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} antialiased scroll-smooth`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
