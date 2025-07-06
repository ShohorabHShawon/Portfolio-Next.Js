'use client';

import { NotionRenderer } from 'react-notion-x';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function NotionPageWrapper({ recordMap }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="notion-wrapper bg-white dark:bg-[#181A1B] text-black dark:text-white p-4 rounded-lg">
        <NotionRenderer
          recordMap={recordMap}
          fullPage={false}
          darkMode={false}
        />
      </div>
    );
  }

  return (
    <div
      className={`notion-wrapper ${
        theme === 'dark' ? 'dark' : ''
      } bg-white dark:bg-[#181A1B] text-black dark:text-white p-4 rounded-lg`}
    >
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={theme === 'dark'}
      />
    </div>
  );
}
