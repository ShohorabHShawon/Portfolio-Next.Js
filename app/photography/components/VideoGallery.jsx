'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';

const VideoItem = ({ video, openVideoModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoDimensions, setVideoDimensions] = useState(null);

  const aspectRatio = videoDimensions
    ? videoDimensions.height / videoDimensions.width
    : 9 / 16;

  return (
    <button
      type="button"
      className="mb-4 block align-top break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg w-full text-left"
      onClick={() => openVideoModal(video)}
      aria-label={`Open ${video.title}`}
    >
      <div
        className="relative bg-gray-200 dark:bg-gray-800 overflow-hidden"
        style={{
          paddingBottom: `${aspectRatio * 100}%`,
          height: 0,
        }}
      >
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            src={video.src}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] [transform:translateZ(0)] [backface-visibility:hidden]"
            onLoadedMetadata={(event) => {
              const el = event.currentTarget;
              if (el.videoWidth && el.videoHeight) {
                setVideoDimensions({ width: el.videoWidth, height: el.videoHeight });
              }
            }}
            onLoadedData={() => setIsLoading(false)}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate font-semibold font-poppins text-sm">{video.title}</h3>
              {video.fileName ? (
                <p className="truncate text-xs text-gray-300">{video.fileName}</p>
              ) : null}
            </div>
            <div className="shrink-0 rounded-full bg-black/50 border border-white/20 p-2">
              <Play className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </button>
  );
};

const VideoGallery = ({ videos, openVideoModal }) => {
  if (!videos?.length) {
    return null;
  }

  return (
    <motion.div
      className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 [column-gap:1rem]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
    >
      {videos.map((video) => (
        <VideoItem key={video.src} video={video} openVideoModal={openVideoModal} />
      ))}
    </motion.div>
  );
};

export default VideoGallery;
