'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiLoader, FiSend } from 'react-icons/fi';

export default function StudioContact() {
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
    setMessage('Sending message...');

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
        setMessage('Message sent successfully.');
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

  const AlertMessage = ({ currentStatus, currentMessage }) => {
    if (currentStatus === 'idle') return null;
    const statusInfo = {
      sending: { Icon: FiLoader, color: 'text-[#1f4f77]', spin: true },
      success: { Icon: FiCheckCircle, color: 'text-emerald-600' },
      error: { Icon: FiAlertTriangle, color: 'text-red-600' },
    };
    const { Icon, color, spin } = statusInfo[currentStatus];

    return (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className="rounded-xl border border-[#1f2937]/10 bg-[#f8fafc] px-3 py-2 text-xs dark:border-[#94a3b8]/20 dark:bg-[#1f2a37]"
      >
        <div className="flex items-center gap-2">
          <Icon className={`${color} ${spin ? 'animate-spin' : ''}`} />
          <span className={color}>{currentMessage}</span>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative bg-[#f8f5ee] px-4 py-14 dark:bg-[#0b1118] md:px-8 lg:px-12">

      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-2xl font-bold uppercase tracking-[0.08em] text-[#334155] dark:text-[#cbd5e1] sm:text-3xl">Contact</p>
          <h2 className="mt-2 font-poppins text-xl font-semibold text-[#0f172a] dark:text-[#f5f4ef] sm:text-2xl">
            Let&apos;s Build Something Memorable
          </h2>
        </div>

        <div className="rounded-2xl border border-[#1f2937]/10 bg-white p-5 shadow-sm dark:border-[#94a3b8]/25 dark:bg-[#121b26] md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              required
              placeholder="Project Title"
              className="w-full rounded-xl border border-[#1f2937]/10 bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2937] outline-none focus:border-[#334155] dark:border-[#94a3b8]/20 dark:bg-[#0f1722] dark:text-[#e5e7eb]"
            />
            <textarea
              name="message"
              required
              rows="7"
              placeholder="Tell me about your project"
              className="w-full resize-none rounded-xl border border-[#1f2937]/10 bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2937] outline-none focus:border-[#334155] dark:border-[#94a3b8]/20 dark:bg-[#0f1722] dark:text-[#e5e7eb]"
            />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="rounded-xl border border-[#1f2937]/10 bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2937] outline-none focus:border-[#334155] dark:border-[#94a3b8]/20 dark:bg-[#0f1722] dark:text-[#e5e7eb]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="rounded-xl border border-[#1f2937]/10 bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2937] outline-none focus:border-[#334155] dark:border-[#94a3b8]/20 dark:bg-[#0f1722] dark:text-[#e5e7eb]"
              />
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <AnimatePresence>
                <AlertMessage currentStatus={status} currentMessage={message} />
              </AnimatePresence>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f2233] px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#f5f4ef] transition hover:bg-[#0b1a28] disabled:opacity-70"
              >
                <FiSend /> {status === 'sending' ? 'Sending' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
