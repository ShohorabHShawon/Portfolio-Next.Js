import { promises as fs } from 'fs';
import path from 'path';
import { Suspense } from 'react';
import { videos as videoMetadata } from './components/videoData';
import PinterestPhotographyTheme from './themes/pinterest-theme/PinterestPhotographyTheme';

const SUPPORTED_VIDEO_EXTENSIONS = new Set([
  '.mp4',
  '.mov',
  '.webm',
  '.m4v',
]);

const humanizeVideoTitle = (fileName) => {
  const base = fileName.replace(/\.[^.]+$/, '');

  const cleaned = base
    .replace(/[_-]+/g, ' ')
    .replace(/\.+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned || base;
};

async function getPublicVideos() {
  const videosDir = path.join(process.cwd(), 'public', 'videos');

  try {
    const entries = await fs.readdir(videosDir, { withFileTypes: true });

    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => SUPPORTED_VIDEO_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b));

    const metadataByFileName = new Map(
      videoMetadata.map((video) => [video.fileName.toLowerCase(), video]),
    );

    return files.map((fileName) => {
      const metadata = metadataByFileName.get(fileName.toLowerCase());

      return {
        src: `/videos/${encodeURIComponent(fileName)}`,
        fileName,
        title: metadata?.title ?? humanizeVideoTitle(fileName),
        description: metadata?.description ?? '',
        links: Array.isArray(metadata?.links) ? metadata.links : [],
      };
    });
  } catch {
    return [];
  }
}

export default async function Photography() {
  const videos = await getPublicVideos();

  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#181A1B]" />}>
      <PinterestPhotographyTheme videos={videos} />
    </Suspense>
  );
}
