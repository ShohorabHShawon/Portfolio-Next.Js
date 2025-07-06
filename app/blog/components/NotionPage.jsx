'use client';

import dynamic from 'next/dynamic';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism.css';
import 'katex/dist/katex.min.css';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';

const Code = dynamic(
  () => import('react-notion-x/build/third-party/code').then((m) => m.Code),
  { ssr: false },
);
const Collection = dynamic(
  () =>
    import('react-notion-x/build/third-party/collection').then(
      (m) => m.Collection,
    ),
  { ssr: false },
);

export default function NotionPage({ recordMap }) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      components={{ Code, Collection }}
    />
  );
}
