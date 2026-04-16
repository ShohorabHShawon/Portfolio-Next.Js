'use client';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CategoryFilter from '../../components/CategoryFilter';
import HeroSection from '../../components/HeroSection';
import PhotoGallery from '../../components/PhotoGallery';
import PhotographyFooter from '../../components/PhotographyFooter';
import PhotographyNavbar from '../../components/PhotographyNavbar';
import VideoGallery from '../../components/VideoGallery';
import { categories, photos } from '../../components/photoData';

const PhotoDetailsModal = dynamic(
  () => import('../../components/PhotoDetailsModal'),
  { ssr: false },
);
const PhotoFullscreenModal = dynamic(
  () => import('../../components/PhotoFullscreenModal'),
  { ssr: false },
);
const VideoModal = dynamic(() => import('../../components/VideoModal'), { ssr: false });

const deterministicHash = (value) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const PINTEREST_PHOTO_ORDER_SEED = 'pinterest-photo-order-v1';

const sortOptions = [
  { value: 'featured', label: 'Featured order' },
  { value: 'recent', label: 'Recent photos' },
  { value: 'old', label: 'Old photos' },
  { value: 'category', label: 'Category' },
];

export default function PinterestPhotographyTheme({ videos = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasAppliedInitialPhotoRef = useRef(false);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setCurrentVideoIndex] = useState(0);
  const [activeMedia, setActiveMedia] = useState('photos');

  const sharePhoto = useCallback(async () => {
    if (typeof window === 'undefined') {
      return;
    }

    const shareUrl = window.location.href;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        return;
      }
    } catch {
      // Fall through to the prompt fallback.
    }

    window.prompt('Copy this photo link', shareUrl);
  }, []);

  const filteredPhotos = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const tokens = normalizedSearch
      .split(/\s+/)
      .map((token) => token.replace(/^#+/, '').replace(/[^a-z0-9]+/gi, '').trim())
      .filter(Boolean);

    const categoryLookup = new Map(
      categories
        .filter((category) => category !== 'All')
        .map((category) => [category.toLowerCase(), category]),
    );

    const rawCategoryToken = tokens.length === 1 ? tokens[0] : null;
    const categoryFromSearch = rawCategoryToken
      ? categoryLookup.get(rawCategoryToken) ||
        (rawCategoryToken.endsWith('s')
          ? categoryLookup.get(rawCategoryToken.slice(0, -1))
          : null)
      : null;

    const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const matchesToken = (field, token) => {
      const value = String(field ?? '').toLowerCase();
      if (!value) return false;

      if (token.length <= 4) {
        // Live search: allow partial matches at the start of a word (e.g. "mo" -> "moon").
        const re = new RegExp(`\\b${escapeRegExp(token)}`, 'i');
        return re.test(value);
      }

      return value.includes(token);
    };

    return photos.filter((photo) => {
      const categoryMatches =
        selectedCategory === 'All' || photo.category === selectedCategory;

      if (!categoryMatches) {
        return false;
      }

      if (!tokens.length) {
        return true;
      }

      if (categoryFromSearch) {
        return photo.category === categoryFromSearch;
      }

      const fields = [photo.title, photo.description, photo.category];
      return tokens.every((token) => fields.some((field) => matchesToken(field, token)));
    });
  }, [searchQuery, selectedCategory]);

  const displayedPhotos = useMemo(() => {
    const nextPhotos = [...filteredPhotos];

    switch (sortBy) {
      case 'recent':
        return nextPhotos.sort((a, b) => photos.indexOf(b) - photos.indexOf(a));
      case 'old':
        return nextPhotos.sort((a, b) => photos.indexOf(a) - photos.indexOf(b));
      case 'category':
        return nextPhotos.sort(
          (a, b) =>
            a.category.localeCompare(b.category) || a.title.localeCompare(b.title),
        );
      default: {
        // Featured order: arrange from middle outward
        if (nextPhotos.length <= 1) return nextPhotos;
        
        const middleIndex = Math.floor(nextPhotos.length / 2);
        const arranged = [nextPhotos[middleIndex]];
        
        for (let i = 1; i <= middleIndex; i++) {
          if (middleIndex - i >= 0) arranged.push(nextPhotos[middleIndex - i]);
          if (middleIndex + i < nextPhotos.length) arranged.push(nextPhotos[middleIndex + i]);
        }
        
        return arranged;
      }
    }
  }, [filteredPhotos, sortBy]);

  useEffect(() => {
    const photoParam = searchParams.get('photo');

    if (!hasAppliedInitialPhotoRef.current) {
      hasAppliedInitialPhotoRef.current = true;

      if (!photoParam) {
        return;
      }

      const matchedPhoto = photos.find(
        (photo) => photo.src === decodeURIComponent(photoParam),
      );

      if (matchedPhoto) {
        setSelectedPhoto(matchedPhoto);
        setIsFullscreen(false);
        const matchingIndex = displayedPhotos.findIndex(
          (photo) => photo.src === matchedPhoto.src,
        );
        setCurrentIndex(matchingIndex >= 0 ? matchingIndex : 0);
      }

      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());

    if (selectedPhoto) {
      nextParams.set('photo', selectedPhoto.src);
    } else {
      nextParams.delete('photo');
    }

    const nextUrl = nextParams.toString()
      ? `${pathname}?${nextParams.toString()}`
      : pathname;
    const currentUrl = `${pathname}${window.location.search}`;

    if (currentUrl !== nextUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [displayedPhotos, pathname, router, searchParams, selectedPhoto]);

  useEffect(() => {
    if (!selectedPhoto) {
      return;
    }

    const matchingIndex = displayedPhotos.findIndex(
      (photo) => photo.src === selectedPhoto.src,
    );

    if (matchingIndex >= 0 && matchingIndex !== currentIndex) {
      setCurrentIndex(matchingIndex);
    }
  }, [currentIndex, displayedPhotos, selectedPhoto]);

  const openDetailsModal = useCallback((photo) => {
    const index = displayedPhotos.findIndex((p) => p.src === photo.src);
    const safeIndex = index >= 0 ? index : 0;
    setCurrentIndex(safeIndex);
    setSelectedPhoto(photo);
    setSelectedVideo(null);
    setIsFullscreen(false);
  }, [displayedPhotos]);

  const openVideoModal = useCallback((video) => {
    const index = videos.findIndex((v) => v.src === video.src);
    const safeIndex = index >= 0 ? index : 0;

    setCurrentVideoIndex(safeIndex);
    setSelectedVideo(videos[safeIndex] ?? video);
    setSelectedPhoto(null);
    setIsFullscreen(false);
  }, [videos]);

  const navigateVideo = useCallback((direction) => {
    if (!videos.length) {
      return;
    }

    setCurrentVideoIndex((prevIndex) => {
      const newIndex =
        direction === 'next'
          ? (prevIndex + 1) % videos.length
          : (prevIndex - 1 + videos.length) % videos.length;

      setSelectedVideo(videos[newIndex]);
      return newIndex;
    });
  }, [videos]);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const exitFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const closeModals = useCallback(() => {
    setSelectedPhoto(null);
    setSelectedVideo(null);
    setIsFullscreen(false);
  }, []);

  useEffect(() => {
    if (activeMedia === 'videos' && !videos.length) {
      setActiveMedia('photos');
    }
  }, [activeMedia, videos.length]);

  useEffect(() => {
    closeModals();
  }, [activeMedia, closeModals]);

  const navigatePhoto = useCallback((direction) => {
    if (displayedPhotos.length === 0) {
      return;
    }

    setCurrentIndex((prevIndex) => {
      const newIndex =
        direction === 'next'
          ? (prevIndex + 1) % displayedPhotos.length
          : (prevIndex - 1 + displayedPhotos.length) % displayedPhotos.length;

      setSelectedPhoto(displayedPhotos[newIndex]);
      return newIndex;
    });
  }, [displayedPhotos]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#181A1B]">
      <PhotographyNavbar />
      <HeroSection photos={photos} />

      <div id="gallery" className="py-10 px-6 bg-white dark:bg-[#181A1B]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-10 flex items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex rounded-full border border-[#181A1B]/10 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-[#121314]/80"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <motion.button
                type="button"
                onClick={() => setActiveMedia('photos')}
                aria-pressed={activeMedia === 'photos'}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  activeMedia === 'photos'
                    ? 'bg-[#181A1B] text-white dark:bg-white dark:text-black'
                    : 'text-[#181A1B]/70 hover:text-[#181A1B] dark:text-white/70 dark:hover:text-white'
                }`}
              >
                Photo Gallery
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setActiveMedia('videos')}
                aria-pressed={activeMedia === 'videos'}
                disabled={!videos.length}
                whileHover={videos.length ? { scale: 1.03 } : undefined}
                whileTap={videos.length ? { scale: 0.97 } : undefined}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  !videos.length
                    ? 'cursor-not-allowed text-[#181A1B]/30 dark:text-white/25'
                    : activeMedia === 'videos'
                      ? 'bg-[#181A1B] text-white dark:bg-white dark:text-black'
                      : 'text-[#181A1B]/70 hover:text-[#181A1B] dark:text-white/70 dark:hover:text-white'
                }`}
              >
                Videos
              </motion.button>
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeMedia === 'photos' ? (
              <motion.div
                key="photos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  resultCount={displayedPhotos.length}
                  totalCount={photos.length}
                  sortOptions={sortOptions}
                />
                <PhotoGallery
                  filteredPhotos={displayedPhotos}
                  selectedCategory={selectedCategory}
                  openDetailsModal={openDetailsModal}
                />
              </motion.div>
            ) : (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <div className="mb-8 flex items-end justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-light text-[#181A1B]/90 dark:text-white">
                      Videos
                    </h2>
                    <p className="mt-1 text-sm text-[#181A1B]/65 dark:text-white/55">
                      Motion moments and short films.
                    </p>
                  </div>
                  <p className="text-xs uppercase tracking-wide text-[#181A1B]/50 dark:text-white/45">
                    {videos.length} videos
                  </p>
                </div>

                <VideoGallery videos={videos} openVideoModal={openVideoModal} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <PhotographyFooter year={new Date().getFullYear()} />

      <PhotoDetailsModal
        selectedPhoto={selectedPhoto}
        isFullscreen={isFullscreen}
        closeModals={closeModals}
        navigatePhoto={navigatePhoto}
        openFullscreen={openFullscreen}
        onShare={sharePhoto}
      />

      <PhotoFullscreenModal
        selectedPhoto={selectedPhoto}
        isFullscreen={isFullscreen}
        closeModals={closeModals}
        navigatePhoto={navigatePhoto}
        exitFullscreen={exitFullscreen}
        onShare={sharePhoto}
      />

      <VideoModal
        selectedVideo={selectedVideo}
        closeModals={closeModals}
        navigateVideo={navigateVideo}
      />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-thin {
          scrollbar-width: thin;
        }

        .scrollbar-thumb-white\/20::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }

        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
      `}</style>
    </div>
  );
}
