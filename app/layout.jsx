import localFont from 'next/font/local';
import './globals.css';
import { NewNavbar } from '@/components/NewNav';
import Footer from '@/components/Footer';

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
  title: 'Shohorab Hossain Shawon',
  description: 'Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} antialiased`}
      >
        <NewNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
