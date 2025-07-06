import { ThemeProvider } from 'next-themes';
import BlogNavbar from './components/BlogNavbar';

export default function BlogsLayout({ children }) {
  return (
    <main>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BlogNavbar />
        {children}
      </ThemeProvider>
    </main>
  );
}
