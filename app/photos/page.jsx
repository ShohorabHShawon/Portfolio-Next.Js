import { pageMetadata } from '@/lib/site';
import { Instrument_Serif } from 'next/font/google';
import { Suspense } from 'react';
import DarkroomPhotographyTheme from '../photography/themes/darkroom-theme/DarkroomPhotographyTheme';

// Display serif for the darkroom headlines.
const darkroomSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-darkroom',
  display: 'swap',
});

export const metadata = pageMetadata({
  title: 'Photography',
  description:
    'Photography by Shohorab H Shawon (Shohorab Hossain Shawon), a Dhaka-based photographer and visual storyteller: street, nature, night and cat photographs from Bangladesh.',
  path: '/photos',
});

export default function PhotosPage() {
  return (
    <div className={darkroomSerif.variable}>
      {/* The gallery renders in the browser (it reads the URL), so the page's main heading is
          sent from the server here. Visually hidden: the hero's "Still frames." is the visible title. */}
      <h1 className="sr-only">Photography by Shohorab H Shawon (Shohorab Hossain Shawon)</h1>
      <Suspense fallback={<div className="min-h-screen bg-[#0d0b0a]" />}>
        <DarkroomPhotographyTheme />
      </Suspense>
    </div>
  );
}
