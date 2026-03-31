'use client';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

const sortOptions = [
  { value: 'featured', label: 'Featured order' },
  { value: 'recent', label: 'Recent photos' },
  { value: 'old', label: 'Old photos' },
  { value: 'category', label: 'Category' },
];

export default function PinterestPhotographyTheme() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasAppliedInitialPhotoRef = useRef(false);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [currentIndex, setCurrentIndex] = useState(0);

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

    return photos.filter((photo) => {
      const categoryMatches =
        selectedCategory === 'All' || photo.category === selectedCategory;

      if (!categoryMatches) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return [photo.title, photo.description, photo.category].some((field) =>
        field.toLowerCase().includes(normalizedSearch),
      );
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
