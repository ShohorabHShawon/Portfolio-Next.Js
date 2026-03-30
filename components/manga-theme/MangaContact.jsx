'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiLoader, FiMessageSquare } from 'react-icons/fi';

export default function MangaContact() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const apiKey = process.env.NEXT_PUBLIC_MAIL_KEY;
    if (!apiKey) {
      setStatus('error');
      setMessage('Configuration Error: API key is missing.');
      return;
    }

    const form = e.target;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const title = form.elements.title.value;
    const content = form.elements.message.value;

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('sending');
    setMessage('Sending transmission...');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: apiKey,
          name,
          email,
          message: `[${title}] ${content}`,
          from_name: 'Portfolio Site',
          subject: `New Message from ${name}: ${title}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage('Transmission sent successfully!');
        form.reset();
      } else {
        setStatus('error');
        setMessage(result.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Could not submit the form.');
    }
  }

  const AlertMessage = ({ status: s, message: m }) => {
    if (s === 'idle') return null;
    const statusInfo = {
      sending: { Icon: FiLoader, color: 'text-[#2ac6ff]', spin: true },
      success: { Icon: FiCheckCircle, color: 'text-emerald-500' },
      error: { Icon: FiAlertTriangle, color: 'text-red-500' },
    };
    const { Icon, color, spin } = statusInfo[s];

    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="flex items-center gap-2 rounded-md border-2 border-[#131313]/20 bg-white px-3 py-2 text-xs font-bold dark:border-white/25 dark:bg-white/10"
      >
        <Icon className={`${color} ${spin ? 'animate-spin' : ''}`} />
        <span className={color}>{m}</span>
      </motion.div>
    );
  };

  return (
    <section id="contact" className="relative w-full bg-[#f9f3df] py-14 dark:bg-[#0f1218]">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(circle_at_2px_2px,#111_1px,transparent_0)] [background-size:18px_18px] dark:opacity-25 dark:[background-image:radial-gradient(circle_at_2px_2px,rgba(246,242,232,0.5)_1px,transparent_0)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center relative">
          <p className="mb-3 inline-flex rounded-md border-[3px] border-[#111] bg-[#ffe063] px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#111] shadow-[4px_4px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]">
            CHAPTER 06
          </p>
          <h2 className="font-poppins text-4xl font-black uppercase text-[#111] [text-shadow:3px_3px_0px_#ffe063] dark:text-[#f6f2e8] dark:[text-shadow:3px_3px_0px_#39d5ff] lg:text-5xl">
            Contact Terminal
          </h2>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[#222]/80 dark:text-white/70">
            Drop a message panel
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border-[4px] border-[#111] bg-white shadow-[8px_8px_0_0_#111] dark:border-[#f6f2e8] dark:bg-[#171b22] dark:shadow-[8px_8px_0_0_#f6f2e8]">
          <div className="flex items-center gap-2 border-b-[3px] border-[#111] bg-[#111] px-4 py-3 dark:border-[#f6f2e8] dark:bg-[#f6f2e8]">
            <span className="h-3 w-3 rounded-full bg-[#ef4b3f]" />
            <span className="h-3 w-3 rounded-full bg-[#ffe063]" />
            <span className="h-3 w-3 rounded-full bg-[#39d5ff]" />
            <span className="ml-2 text-xs font-black uppercase tracking-wide text-white dark:text-[#131313]">Message.exe</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-4 md:p-6">
            <input
              type="text"
              name="title"
              required
              placeholder="Title"
              className="w-full rounded-md border-[3px] border-[#111] bg-[#fff6e2] px-4 py-3 text-sm font-bold text-[#111] placeholder:text-[#111]/55 focus:outline-none dark:border-[#f6f2e8] dark:bg-white/10 dark:text-white"
            />
            <textarea
              name="message"
              required
              rows="7"
              placeholder="Write your message"
              className="w-full resize-none rounded-md border-[3px] border-[#111] bg-[#fff6e2] px-4 py-3 text-sm font-medium text-[#111] placeholder:text-[#111]/55 focus:outline-none dark:border-[#f6f2e8] dark:bg-white/10 dark:text-white"
            />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="rounded-md border-[3px] border-[#111] bg-white px-4 py-3 text-sm font-bold text-[#111] focus:outline-none dark:border-[#f6f2e8] dark:bg-white/10 dark:text-white"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="rounded-md border-[3px] border-[#111] bg-white px-4 py-3 text-sm font-bold text-[#111] focus:outline-none dark:border-[#f6f2e8] dark:bg-white/10 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <AnimatePresence>
                <AlertMessage status={status} message={message} />
              </AnimatePresence>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-md border-[3px] border-[#111] bg-[#ef4b3f] px-6 py-3 text-xs font-black uppercase tracking-wide text-white shadow-[4px_4px_0_0_#111] transition-transform hover:-translate-y-1 disabled:opacity-70 dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]"
              >
                <FiMessageSquare />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
