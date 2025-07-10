'use client';
import React from 'react';
import Image from 'next/image';

const PhotoGallery = ({ filteredPhotos, selectedCategory, openDetailsModal }) => {
  return (
    <div
      className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 transition-opacity duration-500"
      key={selectedCategory}
    >
      {filteredPhotos.map((photo, index) => (
        <div
          key={photo.src}
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
  );
};

export default PhotoGallery;
