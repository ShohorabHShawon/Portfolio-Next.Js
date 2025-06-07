import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from 'next-themes';

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
  description:
    'Portfolio of Shohorab Hossain Shawon, a web developer specializing in Next.js and React.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} antialiased scroll-smooth`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
