'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { X, Maximize2 } from 'lucide-react';

const photos = [
  {
    src: '/images/photo1.png',
    title: 'Sunset Horizon',
    description: 'A calm sunset captured over the mountains.',
  },
  {
    src: '/images/photo2.png',
    title: 'Urban Reflections',
    description: 'City lights reflected on rainy streets.',
  },
  {
    src: '/images/photo.png',
    title: 'Forest Vibes',
    description: 'Nature’s dense beauty in the heart of the forest.',
  },
  {
    src: '/images/photo4.png',
    title: 'Ocean Mood',
    description: 'Waves crashing gently along a quiet beach.',
  },
  {
    src: '/images/photo5.png',
    title: 'Mountain Majesty',
    description: 'Snow-capped peaks under a clear blue sky.',
  },
  {
    src: '/images/photo6.png',
    title: 'Desert Dreams',
    description: 'Golden sand dunes under a starry sky.',
  },
  {
    src: '/images/photo7.png',
    title: 'City Lights',
    description: 'A bustling cityscape illuminated at night.',
  },
  {
    src: '/images/photo8.png',
    title: 'Starry Night',
    description: 'A clear night sky filled with stars.',
  },
  {
    src: '/images/photo9.png',
    title: 'Autumn Leaves',
    description: 'Vibrant fall colors in a serene park.',
  },
  {
    src: '/images/photo10.png',
    title: 'Winter Wonderland',
    description: 'A snowy landscape with a cozy cabin.',
  },
  {
    src: '/images/photo11.png',
    title: 'Spring Blooms',
    description: 'Colorful flowers blooming in the spring.',
  },
  {
    src: '/images/photo2.png',
    title: 'Summer Vibes',
    description: 'A sunny beach day with clear blue waters.',
  },
];

export default function Photography() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openDetailsModal = (photo) => {
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

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Captured By Shohorab H Shawon
      </h1>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="w-full break-inside-avoid cursor-pointer group overflow-hidden rounded-2xl shadow-lg"
            onClick={() => openDetailsModal(photo)}
          >
            <div className="relative w-full">
              <Image
                src={photo.src}
                alt={photo.title}
                width={600}
                height={0}
                layout="responsive"
                className="rounded-2xl transition duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      <Dialog
        open={!!selectedPhoto && !isFullscreen}
        onClose={closeModals}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80" />
          <div className="relative z-10 bg-zinc-900 rounded-lg max-w-3xl w-full shadow-xl p-6 space-y-4">
            <button
              className="absolute top-3 right-3 text-white p-2 hover:bg-zinc-800 rounded-full"
              onClick={closeModals}
            >
              <X className="w-6 h-6" />
            </button>

            {selectedPhoto && (
              <>
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  width={1000}
                  height={0}
                  layout="responsive"
                  className="rounded-xl"
                />
                <div>
                  <h2 className="text-2xl font-semibold">
                    {selectedPhoto.title}
                  </h2>
                  <p className="text-zinc-300 mt-2">
                    {selectedPhoto.description}
                  </p>
                </div>
                <button
                  onClick={openFullscreen}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition"
                >
                  <Maximize2 className="w-4 h-4" />
                  View Fullscreen
                </button>
              </>
            )}
          </div>
        </div>
      </Dialog>

      {/* Fullscreen Modal */}
      <Dialog
        open={!!selectedPhoto && isFullscreen}
        onClose={closeModals}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-90" />
          <div className="relative z-10 max-w-6xl w-full">
            <button
              className="absolute top-3 right-3 text-white p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-80"
              onClick={closeModals}
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={selectedPhoto?.src || ''}
              alt="Fullscreen"
              width={1920}
              height={0}
              layout="responsive"
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
