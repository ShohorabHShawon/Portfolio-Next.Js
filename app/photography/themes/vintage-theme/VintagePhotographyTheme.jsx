'use client';
import ThemeToggle from '@/components/ThemeToggle';
import { useState } from 'react';
import { photos } from '../../components/photoData';
import VintageFooter from './VintageFooter';
import VintageGallery from './VintageGallery';
import VintagePhotoModal from './VintagePhotoModal';

export default function VintagePhotographyTheme() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openDetailsModal = (photo) => {
    const photoIndex = photos.findIndex((item) => item.src === photo.src);
    setCurrentIndex(photoIndex);
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction) => {
    if (photos.length === 0) {
      return;
    }

    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % photos.length
        : (currentIndex - 1 + photos.length) % photos.length;

    setCurrentIndex(nextIndex);
    setSelectedPhoto(photos[nextIndex]);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1e7] text-[#2d2924]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.95),transparent_42%),radial-gradient(circle_at_90%_5%,rgba(208,164,109,0.2),transparent_38%),linear-gradient(180deg,#f8f4ec_0%,#f4ede2_45%,#efe6da_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 bg-[repeating-linear-gradient(45deg,rgba(76,61,43,0.08)_0px,rgba(76,61,43,0.08)_1px,transparent_1px,transparent_6px)]" />

      <div className="relative z-20">
        <nav className="fixed right-0 top-0 z-50 p-5">
          <ThemeToggle />
        </nav>

        <section id="gallery" className="px-3 pb-4 pt-20 md:px-6 md:pt-16">
          <VintageGallery photos={photos} openDetailsModal={openDetailsModal} />
        </section>

        <VintageFooter year={new Date().getFullYear()} />
      </div>

      <VintagePhotoModal
        selectedPhoto={selectedPhoto}
        closeModal={closeModal}
        navigatePhoto={navigatePhoto}
      />
    </main>
  );
}
