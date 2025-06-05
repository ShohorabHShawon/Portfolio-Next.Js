'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import {
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Download,
} from 'lucide-react';

const photos = [
  {
    src: '/images/photo1.png',
    title: 'Sunset Horizon',
    description: 'A calm sunset captured over the mountains.',
    category: 'Flower',
  },
  {
    src: '/images/photo2.png',
    title: 'Urban Reflections',
    description: 'City lights reflected on rainy streets.',
    category: 'Urban',
  },
  {
    src: '/images/photo3.png',
    title: 'Forest Path',
    description: 'A serene path through a lush green forest.',
    category: 'Flower',
  },
  {
    src: '/images/photo4.png',
    title: 'Ocean Mood',
    description: 'Waves crashing gently along a quiet beach.',
    category: 'Urban',
  },
  {
    src: '/images/photo5.png',
    title: 'Mountain Majesty',
    description: 'Snow-capped peaks under a clear blue sky.',
    category: 'Urban',
  },
  {
    src: '/images/photo6.png',
    title: 'Desert Dreams',
    description: 'Golden sand dunes under a starry sky.',
    category: 'Conceptual',
  },
  {
    src: '/images/photo7.png',
    title: 'City Lights',
    description: 'A bustling cityscape illuminated at night.',
    category: 'Street',
  },
  {
    src: '/images/photo8.png',
    title: 'Starry Night',
    description: 'A clear night sky filled with stars.',
    category: 'Street',
  },
  {
    src: '/images/photo9.png',
    title: 'Autumn Leaves',
    description: 'Vibrant fall colors in a serene park.',
    category: 'Flower',
  },
  {
    src: '/images/photo10.png',
    title: 'Winter Wonderland',
    description: 'A snowy landscape with a cozy cabin.',
    category: 'Flower',
  },
  {
    src: '/images/photo11.png',
    title: 'Spring Blooms',
    description: 'Colorful flowers blooming in the spring.',
    category: 'Flower',
  },
  {
    src: '/images/photo12.png',
    title: 'Summer Vibes',
    description: 'A sunny beach day with clear blue waters.',
    category: 'Street',
  },
  {
    src: '/images/photo13.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Flower',
  },
  {
    src: '/images/photo14.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Nature',
  },
  {
    src: '/images/photo15.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Cat',
  },
  {
    src: '/images/photo16.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Street',
  },
  {
    src: '/images/photo17.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Nature',
  },
  {
    src: '/images/photo18.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Wildlife',
  },
  {
    src: '/images/photo19.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Conceptual',
  },
  {
    src: '/images/photo20.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Nature',
  },
  {
    src: '/images/photo21.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Wildlife',
  },
  {
    src: '/images/photo22.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Conceptual',
  },
  {
    src: '/images/photo23.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Nature',
  },
  {
    src: '/images/photo24.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Wildlife',
  },
  {
    src: '/images/photo25.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Wildlife',
  },
  {
    src: '/images/photo26.png',
    title: 'Urban Jungle',
    description: 'A vibrant city street filled with life.',
    category: 'Street',
  },
];

const categories = [
  'All',
  'Cat',
  'Conceptual',
  'Flower',
  'Nature',
  'Street',
  'Urban',
  'Wildlife',
];

export default function Photography() {
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/images/photo12.png"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center text-white max-w-7xl px-6">
          <h1 className=" font-bold text-4xl md:text-6xl lg:text-8xl mb-6 tracking-wider text-center">
            SHOHORAB H SHAWON
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide opacity-90">
            Visual Storyteller & Photographer
          </p>
          <div className="mt-8">
            <button
              onClick={() =>
                document
                  .getElementById('gallery')
                  .scrollIntoView({ behavior: 'smooth' })
              }
              className="px-8 py-3 rounded-xl border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              Explore Gallery
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div id="gallery" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={index}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg"
                onClick={() => openDetailsModal(photo)}
              >
                <div className="relative">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    width={400}
                    height={0}
                    style={{ height: 'auto' }}
                    className="w-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{photo.title}</h3>
                      <p className="text-sm text-gray-300">{photo.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <Dialog
        open={!!selectedPhoto && !isFullscreen}
        onClose={closeModals}
        className="fixed z-50 inset-0"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black/90 backdrop-blur-sm" />
          <div className="relative z-10 bg-zinc-900/95 backdrop-blur-lg rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden">
            {/* Navigation Buttons */}
            <button
              onClick={() => navigatePhoto('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigatePhoto('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-20 text-white p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all"
              onClick={closeModals}
            >
              <X className="w-6 h-6" />
            </button>

            {selectedPhoto && (
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/3">
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    width={800}
                    height={0}
                    style={{ height: 'auto' }}
                    className="w-full"
                  />
                </div>
                <div className="lg:w-1/3 p-8 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm rounded-full mb-4">
                      {selectedPhoto.category}
                    </span>
                    <h2 className="text-3xl font-light text-white mb-4">
                      {selectedPhoto.title}
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-8">
                      {selectedPhoto.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={openFullscreen}
                      className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all"
                    >
                      <Maximize2 className="w-5 h-5" />
                      View Fullscreen
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all">
                      <Download className="w-5 h-5" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Dialog>

      {/* Fullscreen Modal */}
      <Dialog
        open={!!selectedPhoto && isFullscreen}
        onClose={closeModals}
        className="fixed z-50 inset-0"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black" />
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
            <button
              className="absolute top-6 right-6 z-20 text-white p-3 bg-black/50 hover:bg-black/70 rounded-full"
              onClick={closeModals}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation in fullscreen */}
            <button
              onClick={() => navigatePhoto('prev')}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigatePhoto('next')}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <Image
              src={selectedPhoto?.src || ''}
              alt="Fullscreen"
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
