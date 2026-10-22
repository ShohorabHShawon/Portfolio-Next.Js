'use client';
import SiteNavbar from '@/components/SiteNavbar';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CategoryFilter from '../../components/CategoryFilter';
import HeroSection from '../../components/HeroSection';
import PhotoGallery from '../../components/PhotoGallery';
import PhotographyFooter from '../../components/PhotographyFooter';
import { categories, photos } from '../../components/photoData';

const PhotoViewer = dynamic(
  () => import('../../components/PhotoViewer'),
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

export default function DarkroomPhotographyTheme() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasAppliedInitialPhotoRef = useRef(false);
  const galleryRef = useRef(null);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
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

      // Older shared links point at the original files (e.g. /images/photo12.png).
      const photoKey = (src) => String(src).split('/').pop().replace(/\.[^.]+$/, '');
      const requestedKey = photoKey(decodeURIComponent(photoParam));
      const matchedPhoto = photos.find(
        (photo) => photoKey(photo.src) === requestedKey,
      );

      if (matchedPhoto) {
        setSelectedPhoto(matchedPhoto);
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
  }, [displayedPhotos]);

  const closeModals = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
  }, []);

  // Changing the filter should bring the top of the gallery back into view
  // instead of leaving the reader stranded below a much shorter grid.
  const scrollToGalleryTop = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery || gallery.getBoundingClientRect().top >= 0) return;

    if (window.lenis) {
      window.lenis.scrollTo(gallery, { offset: -72 });
    } else {
      gallery.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSelectCategory = useCallback((category) => {
    setSelectedCategory(category);
    scrollToGalleryTop();
  }, [scrollToGalleryTop]);

  const handleSortChange = useCallback((value) => {
    setSortBy(value);
    scrollToGalleryTop();
  }, [scrollToGalleryTop]);

  const handleResetAndScroll = useCallback(() => {
    handleResetFilters();
    scrollToGalleryTop();
  }, [handleResetFilters, scrollToGalleryTop]);

  const categoryCounts = useMemo(() => {
    const counts = { All: photos.length };
    photos.forEach((photo) => {
      counts[photo.category] = (counts[photo.category] || 0) + 1;
    });
    return counts;
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
    <div className="min-h-screen bg-[#0d0b0a] font-[Arial,Helvetica,sans-serif] text-[#f2efe9] selection:bg-[#d6a85f] selection:text-[#1a1512]">
      <SiteNavbar />
      <HeroSection photos={photos} categoryCount={categories.length - 1} onOpenPhoto={openDetailsModal} />

      <section id="gallery" ref={galleryRef} className="bg-[#0d0b0a] px-5 pb-20 pt-16 md:px-10 md:pt-24">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end">
            <div>
              <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d6a85f]">
                <span className="inline-block h-px w-10 bg-current opacity-60" />
                The archive / {String(photos.length).padStart(3, '0')}
              </p>
              <h2 className="[font-family:var(--font-darkroom),Georgia,serif] text-[clamp(2.8rem,7vw,6rem)] leading-[0.9] tracking-[-0.03em]">
                The <span className="italic text-[#d6a85f]">contact</span> sheet
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/40">
              Pick a roll, mark a frame, and step into the light.
            </p>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.28, ease: 'easeOut' }}>
            <CategoryFilter
              categories={categories}
              categoryCounts={categoryCounts}
              selectedCategory={selectedCategory}
              setSelectedCategory={handleSelectCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={handleSortChange}
              sortOptions={sortOptions}
              resultCount={displayedPhotos.length}
              onReset={handleResetAndScroll}
            />
            <PhotoGallery
              filteredPhotos={displayedPhotos}
              openDetailsModal={openDetailsModal}
              onClearFilters={handleResetAndScroll}
            />
          </motion.div>
        </div>
      </section>

      <PhotographyFooter year={new Date().getFullYear()} />

      <PhotoViewer
        selectedPhoto={selectedPhoto}
        photos={displayedPhotos}
        currentIndex={currentIndex}
        closeModals={closeModals}
        navigatePhoto={navigatePhoto}
        onShare={sharePhoto}
      />

    </div>
  );
}
