'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
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

export default function PinterestPhotographyTheme() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(
        photos.filter((photo) => photo.category === selectedCategory),
      );
    }
  }, [selectedCategory]);

  const openDetailsModal = (photo) => {
    const index = filteredPhotos.findIndex((p) => p.src === photo.src);
    setCurrentIndex(index);
    setSelectedPhoto(photo);
    setIsFullscreen(false);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
  };

  const closeModals = () => {
    setSelectedPhoto(null);
    setIsFullscreen(false);
  };

  const navigatePhoto = (direction) => {
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % filteredPhotos.length
        : (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;

    setCurrentIndex(newIndex);
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

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
            filteredPhotos={filteredPhotos}
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
