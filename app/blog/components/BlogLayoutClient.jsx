'use client';

import { ThemeProvider } from 'next-themes';
import BlogNavbar from './BlogNavbar';

export default function BlogLayoutClient({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BlogNavbar />
      {children}
    </ThemeProvider>
  );
}
