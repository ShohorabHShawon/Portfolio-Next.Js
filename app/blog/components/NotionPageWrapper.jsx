'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code),
);
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection,
  ),
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
);
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  { ssr: false },
);

export default function NotionPageWrapper({ recordMap }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // ✅ Don't render anything until mounted
  }

  return (
    <div
      className={`notion-wrapper ${
        theme === 'dark' ? 'dark' : ''
      } antialiased text-black dark:text-white bg-white dark:bg-[#181A1B] p-4 rounded-lg`}
    >
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={theme === 'dark'}
        components={{ Code, Collection, Equation, Modal }}
      />
    </div>
  );
}
