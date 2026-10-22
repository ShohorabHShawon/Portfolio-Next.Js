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

export const metadata = {
  title: 'Photos | Shohorab H Shawon',
  description: 'Photography and visual storytelling by Shohorab H Shawon.',
};

export default function PhotosPage() {
  return (
    <div className={darkroomSerif.variable}>
      <Suspense fallback={<div className="min-h-screen bg-[#0d0b0a]" />}>
        <DarkroomPhotographyTheme />
      </Suspense>
    </div>
  );
}
