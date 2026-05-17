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

const GIT_LFS_POINTER_HEADER = 'version https://git-lfs.github.com/spec/v1';

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

    const isLfsPointer = async (filePath) => {
      try {
        const handle = await fs.open(filePath, 'r');

        try {
          const buffer = Buffer.alloc(256);
          const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
          const header = buffer.slice(0, bytesRead).toString('utf8');

          return header.startsWith(GIT_LFS_POINTER_HEADER);
        } finally {
          await handle.close();
        }
      } catch {
        return true;
      }
    };

    const metadataByFileName = new Map(
      videoMetadata.map((video) => [video.fileName.toLowerCase(), video]),
    );

    const playableFiles = [];

    for (const fileName of files) {
      const filePath = path.join(videosDir, fileName);

      if (await isLfsPointer(filePath)) {
        continue;
      }

      const metadata = metadataByFileName.get(fileName.toLowerCase());

      playableFiles.push({
        src: `/videos/${encodeURIComponent(fileName)}`,
        fileName,
        title: metadata?.title ?? humanizeVideoTitle(fileName),
        description: metadata?.description ?? '',
        links: Array.isArray(metadata?.links) ? metadata.links : [],
      });
    }

    return playableFiles;
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
