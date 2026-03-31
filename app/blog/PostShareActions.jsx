'use client';

import { useState } from 'react';

export default function PostShareActions({ url, title, variant = 'modern' }) {
  const [feedback, setFeedback] = useState('');
  const isManga = variant === 'manga';

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

    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  }

  const buttonClass = isManga
    ? 'blog-share-btn inline-flex min-h-[42px] items-center justify-center rounded-full border-2 border-black bg-[#fff7cc] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-800 transition hover:-translate-y-0.5 hover:bg-[#fde68a] dark:border-[#5eead4] dark:bg-[#13233a] dark:text-[#d8ebf8] dark:hover:bg-[#1b3652]'
    : 'blog-share-btn inline-flex min-h-[42px] items-center justify-center rounded-full border border-[#d0d0d0] bg-[#f5f5f3] px-4 py-2 text-xs font-medium text-[#3f3f3f] transition hover:border-[#191919] hover:text-[#191919] hover:bg-[#ececea] dark:border-[#3a3a3a] dark:bg-[#2a2a2a] dark:text-[#d1d1d1] dark:hover:border-[#f3f3f3] dark:hover:text-[#f3f3f3] dark:hover:bg-[#3a3a3a]';

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <button type="button" onClick={copyLink} className={buttonClass}>
        Copy Link
      </button>
      <button type="button" onClick={sharePost} className={buttonClass}>
        Share
      </button>
      {feedback && (
        <p className={`text-xs ${isManga ? 'font-bold text-slate-700 dark:text-[#b7d6ea]' : 'text-[#6b6b6b] dark:text-[#a0a0a0]'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
}
