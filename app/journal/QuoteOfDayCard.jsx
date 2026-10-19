'use client';

import { useEffect, useMemo, useState } from 'react';

import { BLOG_QUOTES } from './quotes';

const QUOTE_STORAGE_KEY = 'blog_quote_selection_v1';

function getUtcDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function readStoredQuoteSelection() {
  try {
    const raw = window.localStorage.getItem(QUOTE_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;

    return {
      dayKey: typeof parsed.dayKey === 'string' ? parsed.dayKey : null,
      quoteIndex: Number.isInteger(parsed.quoteIndex) ? parsed.quoteIndex : null,
    };
  } catch {
    return null;
  }
}

function writeStoredQuoteSelection(dayKey, quoteIndex) {
  try {
    window.localStorage.setItem(
      QUOTE_STORAGE_KEY,
      JSON.stringify({ dayKey, quoteIndex })
    );
  } catch {
    // Ignore storage errors (private mode or quota limits).
  }
}

function shuffleIndices(indices) {
  const next = [...indices];

  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return next;
}

function getQuoteKey(quote) {
  return `${quote?.text || ''}|${quote?.author || ''}`;
}

export default function QuoteOfDayCard({
  initialQuote,
  quoteFontClassName = '',
}) {
  const quotes = useMemo(
    () => (Array.isArray(BLOG_QUOTES) ? BLOG_QUOTES.filter((quote) => quote?.text) : []),
    []
  );

  const initialIndex = useMemo(() => {
    if (!initialQuote || quotes.length === 0) return 0;

    const initialKey = getQuoteKey(initialQuote);
    const found = quotes.findIndex((quote) => getQuoteKey(quote) === initialKey);
    return found >= 0 ? found : 0;
  }, [initialQuote, quotes]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [remainingIndices, setRemainingIndices] = useState(() => {
    const pool = quotes
      .map((_, index) => index)
      .filter((index) => index !== initialIndex);
    return shuffleIndices(pool);
  });
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const activeQuote = quotes[currentIndex] || quotes[0];

  useEffect(() => {
    if (quotes.length === 0) return;

    const todayKey = getUtcDayKey();
    const stored = readStoredQuoteSelection();
    const hasValidStoredIndex =
      stored?.dayKey === todayKey &&
      Number.isInteger(stored.quoteIndex) &&
      stored.quoteIndex >= 0 &&
      stored.quoteIndex < quotes.length;

    const selectedIndex = hasValidStoredIndex ? stored.quoteIndex : initialIndex;
    const pool = quotes
      .map((_, index) => index)
      .filter((index) => index !== selectedIndex);

    setCurrentIndex(selectedIndex);
    setRemainingIndices(shuffleIndices(pool));
    writeStoredQuoteSelection(todayKey, selectedIndex);
  }, [quotes, initialIndex]);

  useEffect(() => {
    if (quotes.length === 0 || currentIndex < 0 || currentIndex >= quotes.length) return;
    writeStoredQuoteSelection(getUtcDayKey(), currentIndex);
  }, [currentIndex, quotes.length]);

  useEffect(() => {
    const fullText = activeQuote?.text || '';
    let charIndex = 0;

    setDisplayedText('');
    setIsTyping(true);

    if (!fullText) {
      setIsTyping(false);
      return undefined;
    }

    const typingTimer = setInterval(() => {
      charIndex += 1;
      setDisplayedText(fullText.slice(0, charIndex));

      if (charIndex >= fullText.length) {
        clearInterval(typingTimer);
        setIsTyping(false);
      }
    }, 18);

    return () => clearInterval(typingTimer);
  }, [activeQuote]);

  function handleRefreshQuote() {
    if (quotes.length <= 1) return;

    if (remainingIndices.length > 0) {
      const [nextIndex, ...rest] = remainingIndices;
      setCurrentIndex(nextIndex);
      setRemainingIndices(rest);
      return;
    }

    const replenished = shuffleIndices(
      quotes
        .map((_, index) => index)
        .filter((index) => index !== currentIndex)
    );

    const [nextIndex, ...rest] = replenished;
    setCurrentIndex(nextIndex);
    setRemainingIndices(rest);
  }

  if (quotes.length === 0) return null;

  return (
    <figure className="blog-quote-card relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-[0_1px_2px_rgba(24,24,27,0.04)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
      <span
        aria-hidden="true"
        className={`${quoteFontClassName} pointer-events-none absolute -right-2 -top-10 select-none text-[10rem] leading-none text-emerald-500/10 dark:text-emerald-400/10`}
      >
        &rdquo;
      </span>

      <div className="relative flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Quote of the day
        </p>
        <button
          type="button"
          onClick={handleRefreshQuote}
          disabled={quotes.length <= 1}
          aria-label="Show another quote"
          className="group inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 ring-1 ring-inset ring-zinc-200 transition hover:text-zinc-900 hover:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-400 dark:ring-zinc-700 dark:hover:text-white dark:hover:ring-zinc-500"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-3.3-6.9" />
            <path d="M21 3v6h-6" />
          </svg>
        </button>
      </div>

      <blockquote
        className={`${quoteFontClassName} blog-quote-text relative mt-5 min-h-[84px] text-lg italic leading-relaxed text-zinc-800 dark:text-zinc-100 md:text-xl`}
      >
        &ldquo;{displayedText}&rdquo;
        <span
          className={`ml-0.5 inline-block h-[1.05em] w-[2px] align-middle bg-emerald-500 ${isTyping ? 'animate-pulse' : 'opacity-0'}`}
        />
      </blockquote>

      {activeQuote.author && (
        <figcaption
          className={`blog-quote-author relative mt-4 flex items-center gap-2 text-sm text-zinc-500 transition-all duration-300 ease-out dark:text-zinc-400 ${
            isTyping ? 'translate-y-1 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <span aria-hidden="true" className="h-px w-6 bg-zinc-300 dark:bg-zinc-600" />
          {activeQuote.author}
        </figcaption>
      )}
    </figure>
  );
}
