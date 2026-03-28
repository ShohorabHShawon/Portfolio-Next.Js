'use client';
import Link from 'next/link';

const PhotographyFooter = ({ year }) => {
  return (
    <footer className="bg-[#181A1B] border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Brand/Name */}
          <div>
            <h3 className="text-2xl font-light text-white mb-2">
              Shohorab H Shawon
            </h3>
            <p className="text-gray-400 text-sm">Photographer & Visual Creator</p>
          </div>

          {/* Bio */}
          <p className="max-w-2xl text-gray-300 text-base leading-relaxed">
            Capturing moments that tell stories. Exploring the aesthetics of light, shadow, and composition through photography and visual design.
          </p>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Portfolio
            </Link>
            <span className="hidden sm:block text-gray-600">•</span>
            <button
              onClick={() =>
                document
                  .getElementById('gallery')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Gallery
            </button>
            <span className="hidden sm:block text-gray-600">•</span>
            <a
              href="https://www.instagram.com/shohorabs.pov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Instagram
            </a>
            <span className="hidden sm:block text-gray-600">•</span>
            <a
              href="https://www.facebook.com/shohorabhshawon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Facebook
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8 w-full">
            <p className="text-gray-500 text-xs uppercase tracking-wide">
              © {year} Shohorab H Shawon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PhotographyFooter;
