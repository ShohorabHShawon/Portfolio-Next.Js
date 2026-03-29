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

export default function QuoteOfDayCard({ initialQuote }) {
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
  const isShortQuote = (activeQuote?.text || '').length <= 95;

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
    <div className="blog-quote-card mb-6 rotate-[0.4deg] rounded-[24px] border-4 border-black bg-[#fff7cc] px-5 py-5 shadow-[7px_7px_0_#111111] transition-all duration-300 ease-out dark:border-[#5eead4] dark:bg-[#13233a] dark:shadow-[7px_7px_0_#0a3a46] md:px-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="blog-theme-pill inline-flex rounded-full border-2 border-black bg-[#fde047] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700 dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8]">
          Quote Of The Day
        </p>
        <button
          type="button"
          onClick={handleRefreshQuote}
          disabled={quotes.length <= 1}
          className="blog-theme-action group inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#fde047] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-900 shadow-[2px_2px_0_#111111] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#facc15] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8] dark:shadow-[2px_2px_0_#0a3a46] dark:hover:bg-[#2e5b86]"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white/80 transition-transform duration-300 ease-out group-hover:rotate-180 dark:border-[#5eead4] dark:bg-[#13233a]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-3.3-6.9" />
              <path d="M21 3v6h-6" />
            </svg>
          </span>
          Refresh Quote
        </button>
      </div>

      <div className="mt-4 flex min-h-[62px] items-center md:min-h-[70px]">
        <blockquote className={`blog-quote-text w-full text-lg font-bold leading-8 text-[#1e293b] transition-all duration-200 ease-out dark:text-[#e6f3ff] md:text-xl ${isShortQuote ? 'text-center' : 'text-left'}`}>
          &ldquo;{displayedText}&rdquo;
          <span className={`ml-0.5 inline-block h-[1.1em] w-[2px] align-middle bg-current ${isTyping ? 'animate-pulse' : 'opacity-0'}`} />
        </blockquote>
      </div>
      {activeQuote.author && (
        <p className={`blog-quote-author mt-1 pr-1 text-right text-xs font-bold uppercase tracking-[0.14em] text-slate-700 transition-all duration-300 ease-out dark:text-[#b7d6ea] ${isTyping ? 'translate-y-1 opacity-0' : 'translate-y-0 opacity-100'}`}>
          - {activeQuote.author}
        </p>
      )}
    </div>
  );
}
