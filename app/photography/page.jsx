'use client';
import { Suspense } from 'react';
import PinterestPhotographyTheme from './themes/pinterest-theme/PinterestPhotographyTheme';

function PhotographyContent() {
  return <PinterestPhotographyTheme />;
}

export default function Photography() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#181A1B]" />}>
      <PhotographyContent />
    </Suspense>
  );
}
