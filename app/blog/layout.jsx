import { ThemeProvider } from 'next-themes';

export default function BlogsLayout({ children }) {
  return (
    <main>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </main>
  );
}
