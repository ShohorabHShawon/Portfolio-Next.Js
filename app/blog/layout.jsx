import BlogLayoutClient from './components/BlogLayoutClient';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css'; // for dark code blocks
import 'prismjs/themes/prism.css'; // for light code blocks
import 'prismjs/themes/prism-tomorrow.css'; // ⬅️ This supports dark mode well
import 'react-notion-x/src/styles.css'; // for Notion styles

export default function BlogsLayout({ children }) {
  return (
    <main>
      <BlogLayoutClient>{children}</BlogLayoutClient>
    </main>
  );
}
