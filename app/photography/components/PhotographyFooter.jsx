'use client';
import Link from 'next/link';

const PhotographyFooter = ({ year }) => {
  const scrollToGallery = () => {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    if (window.lenis) {
      window.lenis.scrollTo(gallery, { offset: -12 });
      return;
    }

    gallery.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#d6a85f]/25 bg-[#1a1512] px-6 py-12 text-[#f2efe9]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Brand/Name */}
          <div>
            <h3 className="mb-2 text-2xl font-light text-white">
              Shohorab H Shawon
            </h3>
            <p className="text-sm text-[#d6a85f]/80">Photographer & Visual Creator</p>
          </div>

          {/* Bio */}
          <p className="max-w-2xl text-base leading-relaxed text-white/60">
            Capturing moments that tell stories. Exploring the aesthetics of light, shadow, and composition through photography and visual design.
          </p>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/"
              className="text-sm font-medium text-white/60 transition-colors hover:text-[#d6a85f]"
            >
              Portfolio
            </Link>
            <span className="hidden text-[#d6a85f]/60 sm:block">•</span>
            <button
              onClick={scrollToGallery}
              className="text-sm font-medium text-white/60 transition-colors hover:text-[#d6a85f]"
            >
              Gallery
            </button>
            <span className="hidden text-[#d6a85f]/60 sm:block">•</span>
            <a
              href="https://www.instagram.com/shohorabs.pov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/60 transition-colors hover:text-[#d6a85f]"
            >
              Instagram
            </a>
            <span className="hidden text-[#d6a85f]/60 sm:block">•</span>
            <a
              href="https://www.facebook.com/shohorabhshawon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/60 transition-colors hover:text-[#d6a85f]"
            >
              Facebook
            </a>
          </div>

          {/* Copyright */}
          <div className="w-full border-t border-white/10 pt-8">
            <p className="text-xs uppercase tracking-wide text-white/35">
              © {year} Shohorab H Shawon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PhotographyFooter;
