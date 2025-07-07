'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Bubblegum_Sans } from 'next/font/google';
import Link from 'next/link';
const bubblegum = Bubblegum_Sans({
  subsets: ['latin'],
  weight: ['400'],
});
const photos = [
  {
    src: '/images/photo1.png',
    title: 'Magenta Bougainvillea Blooms Against a Summer Sky',
    description:
      'A beautiful shot of vibrant magenta bougainvillea flowers reaching towards a pale blue sky with soft clouds. The image captures the delicate texture of the bracts and the lush green foliage, with a dreamy, slightly blurred foreground enhancing the depth of field.',
    category: 'Flower',
  },
  {
    src: '/images/photo2.png',
    title: 'Urban Bougainvillea',
    description:
      'Vibrant bougainvillea flowers bloom beside a modern building under a soft sky.',
    category: 'Urban',
  },
  {
    src: '/images/photo3.png',
    title: 'Bougainvillea Lined Street',
    description:
      'Vibrant pink bougainvillea overhangs a quiet street with a figure walking in the distance.',
    category: 'Nature',
  },
  {
    src: '/images/photo4.png',
    title: 'Rickshaw Ride Under Bougainvillea',
    description:
      'A colorful rickshaw travels down a street, framed by overhanging pink bougainvillea and green trees.',
    category: 'Urban',
  },
  {
    src: '/images/photo5.png',
    title: 'Cycling Past Bougainvillea',
    description:
      'A man on a bicycle with a blue crate rides down a street lined with bright pink bougainvillea.',
    category: 'Street',
  },
  {
    src: '/images/photo6.png',
    title: 'Cat Silhouette Against the Full Moon',
    description:
      'A charming silhouette of a cat sits on grass, gazing up at a large, detailed full moon in a dark night sky.',
    category: 'Conceptual',
  },
  {
    src: '/images/photo7.png',
    title: 'Dreams and Weight',
    description: 'The Weight We Carry, the Dreams We Watch.',
    category: 'Street',
  },
  {
    src: '/images/photo8.png',
    title: 'Sunset Hues & Fleeting Joys',
    description:
      "In the warm embrace of the evening light, a vibrant cluster of balloons offers a beacon of delight. Figures, perhaps a family, are gathered, suggesting a shared moment of simple happiness. The scene, with its soft focus and rich colors, evokes a sense of community and the ephemeral beauty of daily life. The attire of the woman in the yellow garment and the man's lungi might suggest a South Asian setting.",
    category: 'Street',
  },
  {
    src: '/images/photo9.png',
    title: 'Gilded Hope, Barred from View',
    description:
      'A solitary yellow trumpet flower, possibly Tecoma stans, defiantly blooms, its bright form a stark contrast to the dark, out-of-focus bars of a fence that partially obscure it. The image speaks to resilience and beauty found in unexpected places, a small sunbeam caught in a shadowed world.',
    category: 'Flower',
  },
  {
    src: '/images/photo10.png',
    title: 'Skyward Fire, Petal & Plume',
    description:
      "Like a burst of floral fireworks, the intricate red and orange bloom, likely a Caesalpinia pulcherrima, reaches for the heavens. Its delicate, extended stamens and fern-like leaves are set against a soft, clouded sky, highlighting nature's vivid artistry.",
    category: 'Flower',
  },
  {
    src: '/images/photo11.png',
    title: "Twilight's Velvet Bloom",
    description:
      'Vibrant magenta flowers, possibly Mirabilis jalapa, emerge from the deep shadows, their delicate, trumpet-like forms glowing against a dark, textured backdrop. The image captures the quiet beauty of night-blooming flora, a splash of color in the encroaching darkness.',
    category: 'Flower',
  },
  {
    src: '/images/photo12.png',
    title: 'Path of Whispering Shadows',
    description:
      'Figures traverse a sun-dappled road, enveloped by an archway of dense trees that cast deep, contrasting shadows. This high-contrast black and white scene, possibly from a place like Irigolkavu as suggested by image data, evokes a sense of journey through a serene, almost mystical, natural tunnel.',
    category: 'Street',
  },
  {
    src: '/images/photo13.png',
    title: 'Stardust & Bokeh Dreams',
    description:
      "A cluster of star-shaped leaves or nascent buds, perhaps of an Epidendrum orchid, catches the light, surrounded by a dreamlike aura of colorful bokeh. The image is a dance of focus and blur, where nature's details merge into a soft, impressionistic tapestry of light and color.",
    category: 'Flower',
  },
  {
    src: '/images/photo14.png',
    title: "Sunset's Golden Spears",
    description:
      'Tall blades of wild grass, possibly "rumput senja" (twilight grass), stand like sentinels, their plumes ignited by the setting sun. Against a dramatic, cloud-streaked sky, with the distant silhouette of power lines, the scene captures the raw beauty of the landscape at the transition from day to night.',
    category: 'Nature',
  },
  {
    src: '/images/photo15.png',
    title: 'Ember in the Windowed Soul',
    description:
      "An extreme close-up reveals the captivating intensity of a cat's eye. The fiery orange-red iris glows, and the vertical pupil holds a tiny, sharp reflection of a window, offering a glimpse into the animal's world and a universe within its gaze.",
    category: 'Cat',
  },
  {
    src: '/images/photo16.png',
    title: 'Nocturne on a Shadowed Walk',
    description:
      'In this stark black and white night scene, possibly from a city like Lucknow, a solitary figure walks along a covered pathway. The interplay of bright streetlights and deep, elongated shadows creates a moody, atmospheric tableau of urban solitude.',
    category: 'Street',
  },
  {
    src: '/images/photo17.png',
    title: 'Last Light on a Grassy Plume',
    description:
      'A feathery plume of wild grass, perhaps Imperata cylindrica or Saccharum spontaneum, is silhouetted against the warm orb of the setting sun. The soft focus and muted tones of the cloudy sky lend a serene, almost melancholic beauty to this end-of-day natural scene.',
    category: 'Nature',
  },
  {
    src: '/images/photo18.png',
    title: 'Verdant Slumber, Feathered Dream',
    description:
      'A small, speckled owlet, likely a Spotted Owlet, finds serene repose upon a branch, its eyes gently closed. Swathed in a lush canopy of vibrant green leaves, this feathered creature seems lost in a quiet, daytime dream, a moment of pure tranquility in the natural world.',
    category: 'Wildlife',
  },
  {
    src: '/images/photo19.png',
    title: 'Citrus Jewel, Effervescent Dance',
    description:
      "A vividly green lime slice, illuminated from behind, reveals its radiant, translucent segments and a delicate crown of sparkling bubbles. Submerged in cool, dark water, it's a macro celebration of zest and refreshment, where light and liquid play.",
    category: 'Conceptual',
  },
  {
    src: '/images/photo20.png',
    title: "Twilight's Embrace, Where Palms Meet Sky",
    description:
      'Silhouetted palm trees and a distant electrical tower stand etched against a sky ablaze with the warm hues of "senja kampung" (village twilight). Wild grasses in the foreground whisper in the fading light, capturing the peaceful yet evolving mood of a South Asian landscape at dusk.',
    category: 'Nature',
  },
  {
    src: '/images/photo21.png',
    title: "Bark Navigator's Green Repast",
    description:
      "An agile Indian palm squirrel, its striped coat a soft contrast to the rough tree bark, descends headfirst for a tender bite. Clinging effortlessly, it savors a fresh green leaf, a fleeting moment of nature's daily rhythm.",
    category: 'Wildlife',
  },
  {
    src: '/images/photo22.png',
    title: 'Chromatic Whispers, Light as Air',
    description:
      'A delicate gathering of soft feathers – fiery red, gentle orange, and cool blue – creates a vibrant tapestry against a luminous, ethereal white backdrop. Their fine barbs and gentle curves evoke a sense of lightness and the subtle artistry of plumage.',
    category: 'Conceptual',
  },
  {
    src: '/images/photo23.png',
    title: "Winter's Lace Against the Light",
    description:
      'Dark, denuded branches stretch like intricate calligraphy across a stark, bright sky. This minimalist composition, rendered in high contrast, highlights the elegant, skeletal forms of trees in their winter slumber or dry season repose.',
    category: 'Nature',
  },
  {
    src: '/images/photo24.png',
    title: 'Weaver of Sunlit Silks',
    description:
      "A formidable Golden Orb-weaver spider, perhaps a Nephila species, commands the center of its meticulously spun, shimmering web. Backlit by the soft green bokeh of the forest, it's a portrait of nature's patient artistry and predatory grace.",
    category: 'Wildlife',
  },
  {
    src: '/images/photo25.png',
    title: 'Ancient Gaze Amidst the Green',
    description:
      'A Bengal or Asian water monitor lizard, its skin a mosaic of earthy tones and intricate scales, lies low within a lush tapestry of vibrant green grass. Its alert eye surveys its surroundings, a timeless reptilian presence grounded in the verdant earth.',
    category: 'Wildlife',
  },
  {
    src: '/images/photo26.png',
    title: "Monochrome Dreams in a Child's Gaze",
    description:
      'In this evocative black and white street portrait, a young boy, likely a balloon seller, peeks out from behind a buoyant cloud of patterned balloons. His direct gaze holds a quiet story, a moment of youthful presence amidst the daily flow, rendered with timeless grace.',
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
  const getRandomImageIndex = (currentIndex, totalLength) => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * totalLength);
    } while (newIndex === currentIndex && totalLength > 1);
    return newIndex;
  };
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

  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Auto-change hero image
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0">
          {photos.map((photo, index) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt="Hero"
              fill
              className={`object-cover transition-opacity duration-1000 ${
                index === heroImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              priority={index === 0}
            />
          ))}
        </div>
        <div className="relative z-20 text-center text-white max-w-7xl px-6">
          <h1
            className={`font-bestia text-3xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 md:mb-10 tracking-wider text-center`}
          >
            Shohorab H Shawon
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
              className="px-5 mx-2 py-2 md:px-8 md:mx-2 md:py-3 rounded-xl border border-white/30 text-black  bg-white hover:bg-transparent hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              Explore Gallery
            </button>
            <Link href="/">
              <button className="px-5 mx-2 py-2 md:px-8 md:mx-2 md:py-3 rounded-xl border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm">
                Portfolio
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div id="gallery" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter - Responsive */}
          <div className="flex justify-center mb-16">
            {/* Desktop Filter */}
            <div className="hidden md:block relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-full p-2 shadow-xl">
              <div className="flex gap-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-white text-black shadow-lg transform scale-105'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {category}
                    {selectedCategory === category && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full -z-10 blur-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 text-white text-sm font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-white/30 min-w-[200px]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 1rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '3rem',
                }}
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-zinc-900 text-white"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Masonry Grid with fade transition */}
          <div
            className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 transition-opacity duration-500"
            key={selectedCategory}
          >
            {filteredPhotos.map((photo, index) => (
              <div
                key={`${selectedCategory}-${photo.src}`}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
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

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-lg border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div className="text-center md:text-left">
              <h3
                className={`${bubblegum.className} text-2xl font-bold text-white mb-4`}
              >
                SHOHORAB H SHAWON
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Visual storyteller capturing moments through the lens.
                Passionate about photography that speaks to the soul and tells
                unique stories.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Portfolio
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById('gallery')
                      .scrollIntoView({ behavior: 'smooth' })
                  }
                  className="block text-gray-400 hover:text-white transition-colors w-full"
                >
                  Gallery
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-right">
              <h4 className="text-white font-semibold mb-4">Follow Me</h4>
              <div className="flex justify-center md:justify-end gap-4">
                <a
                  href="https://www.facebook.com/shohorabhshawon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/imagiography/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Shohorab H Shawon. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Details Modal */}
      <Dialog
        open={!!selectedPhoto && !isFullscreen}
        onClose={closeModals}
        className="fixed z-50 inset-0"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <DialogBackdrop className="fixed inset-0 bg-black/90 backdrop-blur-sm" />
          <DialogPanel className="relative z-10 bg-zinc-900/95 backdrop-blur-lg rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Navigation Buttons */}
            <button
              onClick={() => navigatePhoto('prev')}
              className="absolute left-2 top-[30%] -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/70 rounded-full text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigatePhoto('next')}
              className="absolute right-2 top-[30%] -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/70 rounded-full text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              className="absolute top-4 right-4 z-20 text-white p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all"
              onClick={closeModals}
            >
              <X className="w-6 h-6" />
            </button>

            {selectedPhoto && (
              <div className="flex flex-col h-full overflow-hidden">
                <div className="flex-shrink-0 relative">
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    width={800}
                    height={0}
                    style={{ height: 'auto' }}
                    className="w-full max-h-[50vh] md:max-h-[60vh] object-contain"
                  />
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                  <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm rounded-full mb-4">
                    {selectedPhoto.category}
                  </span>
                  <h2 className="text-2xl font-light text-white mb-4">
                    {selectedPhoto.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {selectedPhoto.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://www.facebook.com/shohorabhshawon/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook Page
                    </a>
                    <button
                      onClick={openFullscreen}
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all"
                    >
                      <Maximize2 className="w-5 h-5" />
                      View Fullscreen
                    </button>
                  </div>
                </div>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>

      {/* Fullscreen Modal */}
      <Dialog
        open={!!selectedPhoto && isFullscreen}
        onClose={closeModals}
        className="fixed z-50 inset-0"
      >
        <div className="flex items-center justify-center min-h-screen">
          <DialogBackdrop className="fixed inset-0 bg-black" />
          <DialogPanel className="relative z-10 w-full h-full flex items-center justify-center p-4">
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
          </DialogPanel>
        </div>
      </Dialog>

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
