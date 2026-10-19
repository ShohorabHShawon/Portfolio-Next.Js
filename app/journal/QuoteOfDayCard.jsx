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
    <figure className="blog-quote-card relative border border-journal-line bg-journal-surface p-6 sm:p-7">
      <span aria-hidden="true" className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-journal-accent" />
      <span aria-hidden="true" className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-journal-accent" />

      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-journal-accent">Quote of the day</p>
        <button
          type="button"
          onClick={handleRefreshQuote}
          disabled={quotes.length <= 1}
          aria-label="Show another quote"
          className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-journal-muted transition hover:text-journal-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-3.3-6.9" />
            <path d="M21 3v6h-6" />
          </svg>
          Next
        </button>
      </div>

      <blockquote
        className={`${quoteFontClassName} blog-quote-text mt-5 min-h-[84px] text-lg italic leading-relaxed text-journal-ink md:text-xl`}
      >
        &ldquo;{displayedText}&rdquo;
        <span
          className={`ml-0.5 inline-block h-[1.05em] w-[2px] align-middle bg-journal-accent ${isTyping ? 'animate-pulse' : 'opacity-0'}`}
        />
      </blockquote>

      {activeQuote.author && (
        <figcaption
          className={`blog-quote-author mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted transition-all duration-300 ease-out ${
            isTyping ? 'translate-y-1 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <span aria-hidden="true" className="h-px w-6 bg-journal-line" />
          {activeQuote.author}
        </figcaption>
      )}
    </figure>
  );
}
