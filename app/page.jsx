import { promises as fs } from 'fs';
import path from 'path';
import { Suspense } from 'react';
import { videos as videoMetadata } from './photography/components/videoData';
import PinterestPhotographyTheme from './photography/themes/pinterest-theme/PinterestPhotographyTheme';

export const metadata = {
  title: 'Shohorab H Shawon | Filmmaker & Visual Artist',
  description:
    'Shohorab H Shawon is a Dhaka-based Filmmaker and Visual Artist creating cinematography, visual poetry, and expressive moving-image work.',
  keywords: [
    'Shohorab H Shawon Photography',
    'Shohorab Shawon Photographer',
    'Shohorab Shawon Filmmaker',
    'Filmmaker Portfolio',
    'Cinematography Portfolio',
    'Visual Poetry',
    'Visual Storytelling',
    'Creative Direction',
    'Dhaka Filmmaker',
    'Video Production',
    'Visual Artist',
    'shohorab.com',
    'shohorab',
    'Shawon',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shohorab H Shawon | Filmmaker & Visual Artist',
    description:
      'Discover cinematography, visual poetry, and expressive filmmaking by Dhaka-based artist Shohorab H Shawon.',
    url: 'https://shohorab.com',
    type: 'website',
    images: [
      {
        url: '/images/photography-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Shohorab H Shawon Filmmaker and Visual Artist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shohorab H Shawon | Filmmaker & Visual Artist',
    description:
      'Cinematography, visual poetry, and filmmaking by Dhaka-based artist Shohorab H Shawon.',
    images: ['/images/photography-hero.jpg'],
    creator: '@shohorab',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const SUPPORTED_VIDEO_EXTENSIONS = new Set([
  '.mp4',
  '.mov',
  '.webm',
  '.m4v',
]);

const GIT_LFS_POINTER_HEADER = 'version https://git-lfs.github.com/spec/v1';

const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtu.be',
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

const getYouTubeVideoId = (url) => {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    const parsed = new URL(url);

    if (!YOUTUBE_HOSTS.has(parsed.hostname.toLowerCase())) {
      return null;
    }

    if (parsed.hostname.toLowerCase().includes('youtu.be')) {
      const id = parsed.pathname.replace(/^\/+/, '').split('/')[0];
      return id || null;
    }

    const watchId = parsed.searchParams.get('v');
    if (watchId) {
      return watchId;
    }

    const pathSegments = parsed.pathname.split('/').filter(Boolean);
    const embedIndex = pathSegments.findIndex((segment) => segment === 'embed');

    if (embedIndex >= 0 && pathSegments[embedIndex + 1]) {
      return pathSegments[embedIndex + 1];
    }

    return null;
  } catch {
    return null;
  }
};

const buildVideoLinks = (youtubeUrl, customLinks) => {
  const normalizedCustomLinks = Array.isArray(customLinks) ? customLinks : [];
  const nextLinks = [];
  const seen = new Set();

  const pushUnique = (link) => {
    if (!link || typeof link.url !== 'string') return;

    const trimmedUrl = link.url.trim();
    if (!trimmedUrl) return;

    const key = trimmedUrl.toLowerCase();
    if (seen.has(key)) return;

    seen.add(key);
    nextLinks.push({
      label: typeof link.label === 'string' && link.label.trim() ? link.label.trim() : 'Link',
      url: trimmedUrl,
    });
  };

  if (typeof youtubeUrl === 'string' && youtubeUrl.trim()) {
    pushUnique({
      label: 'Watch on YouTube',
      url: youtubeUrl.trim(),
    });
  }

  normalizedCustomLinks.forEach(pushUnique);

  return nextLinks;
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
      videoMetadata
        .filter((video) => typeof video.fileName === 'string' && video.fileName.trim())
        .map((video) => [video.fileName.toLowerCase(), video]),
    );

    const metadataEmbeddedVideos = videoMetadata
      .filter((video) => typeof video.youtubeUrl === 'string' && video.youtubeUrl.trim())
      .map((video) => {
        const videoId = getYouTubeVideoId(video.youtubeUrl);

        if (!videoId) {
          return null;
        }

        const trimmedUrl = video.youtubeUrl.trim();

        return {
          id: video.id || `youtube-${videoId}`,
          type: 'youtube',
          src: `https://www.youtube.com/embed/${videoId}`,
          thumbnailSrc: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          fileName: video.fileName || 'YouTube',
          title: video.title || 'YouTube Video',
          description: video.description || '',
          links: buildVideoLinks(trimmedUrl, video.links),
        };
      })
      .filter(Boolean);

    const playableFiles = [];

    for (const fileName of files) {
      const filePath = path.join(videosDir, fileName);

      if (await isLfsPointer(filePath)) {
        continue;
      }

      const metadata = metadataByFileName.get(fileName.toLowerCase());

      playableFiles.push({
        id: `local-${fileName}`,
        type: 'local',
        src: `/videos/${encodeURIComponent(fileName)}`,
        fileName,
        title: metadata?.title ?? humanizeVideoTitle(fileName),
        description: metadata?.description ?? '',
        links: Array.isArray(metadata?.links) ? metadata.links : [],
      });
    }

    return [...metadataEmbeddedVideos, ...playableFiles];
  } catch {
    const metadataEmbeddedVideos = videoMetadata
      .filter((video) => typeof video.youtubeUrl === 'string' && video.youtubeUrl.trim())
      .map((video) => {
        const videoId = getYouTubeVideoId(video.youtubeUrl);

        if (!videoId) {
          return null;
        }

        const trimmedUrl = video.youtubeUrl.trim();

        return {
          id: video.id || `youtube-${videoId}`,
          type: 'youtube',
          src: `https://www.youtube.com/embed/${videoId}`,
          thumbnailSrc: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          fileName: video.fileName || 'YouTube',
          title: video.title || 'YouTube Video',
          description: video.description || '',
          links: buildVideoLinks(trimmedUrl, video.links),
        };
      })
      .filter(Boolean);

    return metadataEmbeddedVideos;
  }
}

export default async function Home() {
  const videos = await getPublicVideos();

  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#181A1B]" />}>
      <PinterestPhotographyTheme videos={videos} />
    </Suspense>
  );
}
