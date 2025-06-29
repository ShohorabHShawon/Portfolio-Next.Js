import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 dark:text-white text-gray-800 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Divider */}
          <div className="w-full text-center h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          {/* Divider */}
          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/ShohorabHShawon"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6 text-gray-900 dark:text-gray-100"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/shohorabhshawon/"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6 text-gray-900 dark:text-gray-100"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.behance.net/shohorabhshawon"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6 text-gray-900 dark:text-gray-100"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 2-5.101 2-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
              </svg>
            </a>
          </div>

          {/* Contact Info */}
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">
              <a
                href="mailto:ShohorabHShawon@gmail.com"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
              >
                ShohorabHShawon@gmail.com
              </a>
            </p>
            <p className="text-gray-300 flex items-center justify-center space-x-2">
              <svg
                className="w-4 h-4 text-gray-900 dark:text-gray-100"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-900 dark:text-gray-100">
                Uttara, Dhaka, Bangladesh
              </span>
            </p>
          </div>

          {/* Divider */}
          <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Shohorab H Shawon. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
