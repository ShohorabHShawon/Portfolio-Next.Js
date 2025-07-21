'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiLoader,
  FiMessageSquare,
} from 'react-icons/fi';

export function Contact() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  // This function is the heart of the form's logic.
  async function handleSubmit(e) {
    e.preventDefault();

    // First, we check if the API key is available. This is a common point of failure.
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
    setMessage('Submitting issue...');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: apiKey,
          name: name,
          email: email,
          message: `[${title}] ${content}`,
          from_name: 'Your Portfolio Site',
          subject: `New Message from ${name}: ${title}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage('Issue submitted successfully! Thank you.');
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

  // A clean component for showing status messages.
  const AlertMessage = ({ status, message }) => {
    if (status === 'idle') return null;
    const statusInfo = {
      sending: { Icon: FiLoader, color: 'text-blue-500', spin: true },
      success: { Icon: FiCheckCircle, color: 'text-green-500' },
      error: { Icon: FiAlertTriangle, color: 'text-red-500' },
    };
    const { Icon, color, spin } = statusInfo[status];

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-sm flex items-center gap-2 p-3 rounded-md bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-600"
      >
        <Icon className={`${color} ${spin ? 'animate-spin' : ''}`} />
        <span className={color}>{message}</span>
      </motion.div>
    );
  };

  return (
    <section id="contact" className="w-full py-14 bg-white dark:bg-[#181A1B]">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 dark:text-slate-100">
            CONTACT
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
            Have a project, an idea, or just want to chat? Open an
            &ldquo;issue&rdquo; below and let&rsquo;s get in touch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-100 dark:bg-gray-700/50 shadow-lg"
        >
          <div className="px-4 py-3 dark:border-slate-700 rounded-t-xl flex items-center gap-2 bg-gray-800 dark:bg-slate-600">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="relative text-center w-full font-mono text-white pr-14">
              <h1>$Contact</h1>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="p-4 bg-gray-300 dark:bg-slate-700/50">
              <input
                type="text"
                name="title"
                required
                placeholder="Title: e.g., Project Idea or Subject here..."
                className="w-full bg-transparent text-lg font-semibold text-gray-600 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none"
              />
            </div>
            <div className="p-4">
              <textarea
                name="message"
                required
                rows="8"
                placeholder="Leave your text here..."
                className="w-full bg-transparent text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none resize-none"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6 p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-200 dark:bg-gray-600/50 rounded-b-xl">
              <div className="flex-1 space-y-4">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name..."
                  className="w-full px-4 py-2 font-semibold bg-white text-gray-700 dark:bg-[#181A1B] dark:text-slate-100 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email..."
                  className="w-full px-4 py-2 bg-white text-gray-700 dark:bg-[#181A1B] dark:text-slate-100 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex-1 flex flex-col justify-end items-stretch md:items-end gap-4">
                <AnimatePresence>
                  <AlertMessage status={status} message={message} />
                </AnimatePresence>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  <FiMessageSquare />
                  {status === 'sending' ? 'Submitting...' : 'Submit New Issue'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
