import 'prismjs/themes/prism-tomorrow.css'; // for dark code blocks
import 'prismjs/themes/prism.css'; // for light code blocks
import 'react-notion-x/src/styles.css';
import BlogLayoutClient from './components/BlogLayoutClient';

export const metadata = {
  title:
    'Shohorab H Shawon Blog - Web Development, Software Engineering & Creative Insights',

  description:
    'Read articles and insights from Shohorab H Shawon about web development, software engineering, Next.js, React, and creative technologies. Technical blog by software engineer and developer.',

  keywords: [
    'Shohorab H Shawon Blog',
    'Shohorab Shawon Articles',
    'Shohorab Blog',
    'Web Development Blog',
    'Software Engineering Blog',
    'Next.js Blog',
    'React Blog',
    'Developer Blog',
    'Tech Blog Shohorab',
    'Web Development Articles',
    'Software Engineering Articles',
    'Tech Articles',
    'Programming Blog',
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'JavaScript Articles',
    'TypeScript Articles',
    'Node.js Blog',
    'Web Technology',
    'Development Insights',
    'Technical Writing',
    'Developer Resources',
    'Code Tutorials',
    'Web Development Tips',
    'Software Development Tips',
    'Programming Tutorials',
    'Tech Insights',
    'Creative Technology',
    'shohorab.com/blog',
  ],

  openGraph: {
    title: 'Shohorab H Shawon - Blog & Articles',
    description:
      'Technical blog and articles by Shohorab H Shawon. Web development, software engineering, and creative insights.',
    url: 'https://shohorab.com/blog',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Shohorab H Shawon - Blog & Articles',
    description:
      'Technical blog by Shohorab H Shawon. Web development, software engineering articles and insights.',
    creator: '@shohorab',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: '/blog',
  },
};

export default function BlogsLayout({ children }) {
  return (
    <main>
      <BlogLayoutClient>{children}</BlogLayoutClient>
    </main>
  );
}
