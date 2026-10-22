import LenisProvider from '@/components/lenis';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  FULL_NAME,
  OG_IMAGE,
  PERSON_NAME,
  SITE_URL,
  siteJsonLd,
} from '@/lib/site';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import './globals.css';

const poppins = localFont({
  src: './fonts/Poppins-Bold.ttf',
  variable: '--font-poppins',
  weight: '100 900',
})

// Site-wide defaults. Each page sets its own title, description and canonical
// URL (via pageMetadata in lib/site.js), so nothing page-specific lives here.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${PERSON_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: PERSON_NAME,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  verification: {
    google: 'OgeF8_GazjYsJM9yIDL8e_bmi3k2fHqRFAVBeGTiWkI',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    title: PERSON_NAME,
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: PERSON_NAME,
    locale: 'en_US',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
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
  themeColor: '#1a1512',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
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
