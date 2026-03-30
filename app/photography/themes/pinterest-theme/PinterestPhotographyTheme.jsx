'use client';
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';
import CategoryFilter from '../../components/CategoryFilter';
import HeroSection from '../../components/HeroSection';
import PhotoGallery from '../../components/PhotoGallery';
import PhotographyFooter from '../../components/PhotographyFooter';
import PhotographyNavbar from '../../components/PhotographyNavbar';
import { categories, photos } from '../../components/photoData';

const PhotoDetailsModal = dynamic(
  () => import('../../components/PhotoDetailsModal'),
  { ssr: false },
);
const PhotoFullscreenModal = dynamic(
  () => import('../../components/PhotoFullscreenModal'),
  { ssr: false },
);

const deterministicHash = (value) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const PINTEREST_PHOTO_ORDER_SEED = 'pinterest-photo-order-v1';

export default function PinterestPhotographyTheme() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') {
      return photos;
    }
    return photos.filter((photo) => photo.category === selectedCategory);
  }, [selectedCategory]);

  const displayedPhotos = useMemo(() => {
    return [...filteredPhotos].sort((a, b) => {
      const aHash = deterministicHash(`${PINTEREST_PHOTO_ORDER_SEED}-${a.src}`);
      const bHash = deterministicHash(`${PINTEREST_PHOTO_ORDER_SEED}-${b.src}`);
      return aHash - bHash;
    });
  }, [filteredPhotos]);

  const openDetailsModal = useCallback((photo) => {
    const index = displayedPhotos.findIndex((p) => p.src === photo.src);
    const safeIndex = index >= 0 ? index : 0;
    setCurrentIndex(safeIndex);
    setSelectedPhoto(photo);
    setIsFullscreen(false);
  }, [displayedPhotos]);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const exitFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const closeModals = useCallback(() => {
    setSelectedPhoto(null);
    setIsFullscreen(false);
  }, []);

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
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <PhotoGallery
            filteredPhotos={displayedPhotos}
            selectedCategory={selectedCategory}
            openDetailsModal={openDetailsModal}
          />
        </div>
      </div>

      <PhotographyFooter year={new Date().getFullYear()} />

      <PhotoDetailsModal
        selectedPhoto={selectedPhoto}
        isFullscreen={isFullscreen}
        closeModals={closeModals}
        navigatePhoto={navigatePhoto}
        openFullscreen={openFullscreen}
      />

      <PhotoFullscreenModal
        selectedPhoto={selectedPhoto}
        isFullscreen={isFullscreen}
        closeModals={closeModals}
        navigatePhoto={navigatePhoto}
        exitFullscreen={exitFullscreen}
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
