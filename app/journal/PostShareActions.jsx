'use client';

import { useState } from 'react';

const iconButtonClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 ring-1 ring-inset ring-zinc-200 transition hover:text-zinc-900 hover:ring-zinc-300 dark:text-zinc-400 dark:ring-zinc-800 dark:hover:text-white dark:hover:ring-zinc-600';

const strokeIconProps = {
  'aria-hidden': true,
  viewBox: '0 0 24 24',
  className: 'h-3.5 w-3.5',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export default function PostShareActions({ url, title, className = '' }) {
  const [feedback, setFeedback] = useState('');
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const copied = feedback === 'Link copied';

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setFeedback('Link copied');
    } catch {
      setFeedback('Unable to copy');
    }

    window.setTimeout(() => setFeedback(''), 1800);
  }

  async function sharePost() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User canceled share sheet.
      }
      return;
    }

    copyLink();
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={copyLink}
        className={`${iconButtonClass} ${copied ? 'text-emerald-600 ring-emerald-500/40 dark:text-emerald-400' : ''}`}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        title={feedback || 'Copy link'}
      >
        {copied ? (
          <svg {...strokeIconProps}>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg {...strokeIconProps}>
            <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
            <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
          </svg>
        )}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
        aria-label="Share on X"
        title="Share on X"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
          <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.3L6.4 22H3.3l7.3-8.3L1 2h6.3l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v6.45h-4v-5.72c0-1.36-.03-3.12-1.9-3.12-1.9 0-2.2 1.49-2.2 3.02v5.82h-4v-11Z" />
        </svg>
      </a>
      <button
        type="button"
        onClick={sharePost}
        className={iconButtonClass}
        aria-label="More share options"
        title="More share options"
      >
        <svg {...strokeIconProps}>
          <path d="M12 3v12" />
          <path d="m7 8 5-5 5 5" />
          <path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
        </svg>
      </button>
    </div>
  );
}
