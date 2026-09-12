import { Suspense } from 'react';
import PinterestPhotographyTheme from '../photography/themes/pinterest-theme/PinterestPhotographyTheme';

export const metadata = {
  title: 'Photos | Shohorab H Shawon',
  description: 'Photography and visual storytelling by Shohorab H Shawon.',
};

export default function PhotosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a1512]" />}>
      <PinterestPhotographyTheme />
    </Suspense>
  );
}